# 修复 Claude Code 启动失败

## 目标
让 `claude` 命令在本机重新可用，错误现象：
```
bash: /Users/zhangbiao/.npm-global/bin/claude: Permission denied
```

## 根因（已验证）
1. `bin/claude.exe` 权限为 `644`（不可执行），导致 `Permission denied`。
2. 更严重：该文件不是真正的二进制，是 **postinstall 失败时写入的 10 行错误占位脚本**。运行 install.cjs 显示：
   `Native package "@anthropic-ai/claude-code-darwin-x64" not found.`
   → 平台原生依赖（Intel Mac 对应 `claude-code-darwin-x64`）未下载。
3. 根本原因：本机 Node `v20.14.0`，而 Claude Code 2.1.x 要求 `node >=22.0.0`。
   即使修好文件权限，原生二进制也跑不起来。必须先升级 Node。

## 已确认的环境约束
- 架构：`x86_64`（Intel）→ 需要 `@anthropic-ai/claude-code-darwin-x64`
- Node 位置：`/usr/local/bin/node`，属主 `root:wheel`（无版本管理器）
- 已安装版本管理器：无（nvm/fnm/volta/n 均无）
- Homebrew：未安装
- Shell：`/bin/bash`，配置文件 `~/.bash_profile`
- npm prefix：`~/.npm-global`（用户拥有，无需 sudo 装 claude）
- **网络**：`github.com` 不可达（SSL 超时）；`gitee.com`/`nodejs.org`/`npmmirror.com` 均可达
- 最新 v22 LTS：`v22.23.1`；claude-code 最新：`2.1.211`

## 决策
- **Node 升级方式**：安装 nvm（用户已选“推荐”方案），装到 `~/.nvm`，无需 sudo，不破坏 `/usr/local/bin/node`。
- **nvm 安装源**：因 GitHub 不可达，改用 **gitee 镜像**安装脚本。
- **Node 下载源**：nvm 默认从 nodejs.org 拉，已验证可达，无需改 mirror。若实际拉取慢，回退见“风险”。
- **npm registry**：当前是官方 `registry.npmjs.org`（已验证可达），**保持不变**；若 claude-code 安装慢，按“风险”项切换 npmmirror。

## 执行步骤

### Step 1 — 安装 nvm（用 gitee 镜像，绕过 GitHub 屏蔽）
```bash
# 使用 gitee 镜像，并设置 NVM 源为 nodejs.org（可达）
git clone https://gitee.com/mirrors/nvm.git ~/.nvm
cd ~/.nvm && git checkout v0.40.1   # nvm 稳定版本 tag；若无此 tag 用 `git describe --tags` 选最新
```
（若 gitee 仓库无 v0.40.1 tag，执行 `git -C ~/.nvm tag | tail -5` 选最新稳定 tag 检出。）

### Step 2 — 写入 shell 配置（bash）
在 `~/.bash_profile` 末尾追加 nvm 初始化块（当前文件仅 6 行，已有 npm-global PATH，不冲突）：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```
注意：必须保证 nvm 初始化在 `~/.npm-global/bin` 的 PATH 之后加载，否则 nvm 切换的 node 不会优先生效。
实际上 nvm.sh 会把其 node bin 目录 prepend 到 PATH，因此加载顺序：先加 npm-global，再加载 nvm，最终 nvm node 在前。

### Step 3 — 重新加载 shell 并安装 Node 22
```bash
source ~/.bash_profile
nvm --version            # 确认 nvm 可用
nvm install 22           # 装 v22 LTS（>=22.0.0）
nvm use 22
nvm alias default 22
node -v                  # 应为 v22.x（如 v22.23.1）
npm -v
```

### Step 4 — 清理损坏的 claude-code 并重装
```bash
npm uninstall -g @anthropic-ai/claude-code
# 不用 --ignore-scripts、不用 --omit=optional，确保原生二进制下载
npm install -g @anthropic-ai/claude-code@latest
```
确认 postinstall 成功：安装日志中应出现下载 `claude-code-darwin-x64` 的记录，且不再打印
`Native package ... not found`。

### Step 5 — 验证修复
```bash
which claude             # ~/.npm-global/bin/claude
ls -l "$(which claude)"   # symlink 指向的 claude.exe 应为 755
file "$(readlink -f "$(which claude)")"  # 应为 Mach-O 64-bit executable，而非 ASCII text
claude --version          # 打印真实版本号 2.1.211，不再 Permission denied
```
关键校验：`claude.exe` 现在应是 **Mach-O 二进制**（之前是 10 行 ASCII 错误脚本）。

### Step 6 — 残留清理（可选）
旧版残留目录可删：
```bash
rm -rf /Users/zhangbiao/.npm-global/lib/node_modules/@anthropic-ai/.claude-code-NtwsL60F
```

## 风险与回退
- **nvm clone 慢/失败**：gitee 已验证可达；若仍失败，回退为直接从 nodejs.org 下载 `.pkg` 安装器（需 sudo），或用 `mirrors.huaweicloud.com/nodejs/` 作为手动下载源。
- **Node 下载慢**：nvm 默认用 nodejs.org（已验证可达）。若慢，设置：
  ```bash
  export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
  ```
  再 `nvm install 22`。
- **claude-code 安装慢**：临时切镜像
  ```bash
  npm install -g @anthropic-ai/claude-code@latest --registry=https://registry.npmmirror.com
  ```
  （npmmirror 已验证可达；注意 npmmirror 是官方 registry 镜像，含该包。）
- **nvm 加载后 node 不生效**：确认 `~/.bash_profile` 中 nvm.sh 在 npm-global PATH 行之后；新开终端窗口验证 `which node` 指向 `~/.nvm/versions/node/v22.x/bin/node`。
- **不破坏现有环境**：nvm 装在 `~/.nvm`，原 `/usr/local/bin/node`（v20）保留不动；其他依赖 v20 的工具不受影响。若某工具依赖系统 node，仍可用绝对路径 `/usr/local/bin/node`。

## 范围外
- 不迁移或修改 `/usr/local/bin/node`（避免影响其他工具与系统权限）。
- 不安装 Homebrew。
- 不改动项目内任何源码（本次纯属本机工具链修复）。
- 不为 claude code 配置认证/API key（修复后由用户自行登录）。

## 验证清单（实现完成后逐项确认）
- [ ] `node -v` → v22.x
- [ ] `nvm --version` 正常
- [ ] `npm ls -g @anthropic-ai/claude-code` 显示 2.1.211
- [ ] `~/.npm-global/lib/node_modules/@anthropic-ai/` 下存在 `claude-code-darwin-x64` 目录
- [ ] `file "$(readlink -f "$(which claude)")"` → Mach-O executable
- [ ] `claude --version` 输出真实版本，无 Permission denied，无 native binary 报错
