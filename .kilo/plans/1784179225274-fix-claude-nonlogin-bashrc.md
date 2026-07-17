# 教学形式：标题改为三模式 + 新增「混合式教学」卡片

## 目标
将教学形式（Teaching）板块：
1. 标题由 `线上 ✖️ 线下 / 双模式赋能` 改为 `线上 ✖️ 线下 ✖️ 混合 / 多模式赋能`（中英文同步）。
2. 在现有两张卡片（线上、线下）下方新增第三张卡片：主题「混合式教学」。

## 现状（已核实）
- `src/components/sections/Teaching.jsx`：2 张卡片（`.online` purple、`.offline` teal），硬编码在 JSX 中。
- `src/components/sections/Teaching.module.css`：
  - `.grid` 为 `grid-template-columns: 1fr 1fr`，断点 `@media (max-width:900px)` 降为单列。
  - `.card` min-height 320px（移动端 260px），文字白色。
- i18n：
  - `zh.jsx` teaching 段落（92-111 行）：`title` JSX、`online`、`offline`。
  - `en.jsx` teaching 段落（94-113 行）：同结构。
- 现有 Lottie 动画组件里适合"混合"主题的候选：`ConversationLottie`（交流）、`TeamSynergyLottie`（团队协同）、`SaasMeetingLottie`（已用于线下）、`ChampionLottie`。
- 颜色 token：`--purple` `--teal` 已用；可用第三色 `--pink` `#FF5FA0`（与标题 accent `--green-yellow` 对比好，且与线上 purple、线下 teal 形成三元区分）。

## 决策
- **标题文案**：`线上 ✖️ 线下 ✖️ 混合` + `<br/>` + `<span style=green-yellow>多模式赋能</span>`。英文：`Online ✖️ Offline ✖️ Blended` + `<br/>` + `<span>Multimode Empowerment</span>`。
- **网格布局**：桌面改为 3 列（`1fr 1fr 1fr`），保留 900px 断点降为单列。第三张卡片高度/内边距沿用 `.card`。
- **第三卡背景色**：`--pink`，保持与另两张相同的深色卡 + 白字体系（复用现有 `.card`/`.tag` 样式）。
- **第三卡 Lottie**：用 `ConversationLottie`（在线上/线下交流融合的意象，贴合"混合"）。
- **第三卡内容**（新增 i18n key `blended`）：
  - zh.title: `混合式教学`
  - zh.desc: `线上赋能 + 线下深潜的融合方案，课前线上预习与测评，课中线下实战演练，课后线上复盘与数据追踪，全周期学习闭环。`
  - zh.tags: `['线上预习', '线下实战', '数据复盘']`
  - en.title: `Blended Learning`
  - en.desc: `A fusion of online enablement and offline deep-dive: pre-course online prep and assessment, in-class offline hands-on practice, post-course online review and data tracking — a full-cycle learning loop.`
  - en.tags: `['Online Prep', 'Offline Practice', 'Data Review']`
- **卡内装饰形状**：沿用 `.cardShape` 模式，给第三卡加 2 个形状（一个半透白、一个半透黑），与现有两张一致。

## 执行步骤

### Step 1 — i18n 标题与新卡片文案
- `src/i18n/dictionaries/zh.jsx` teaching.title 改为：
  ```jsx
  title: (
    <>
      线上 ✖️ 线下 ✖️ 混合<br />
      <span style={{ color: 'var(--green-yellow)' }}>多模式赋能</span>
    </>
  )
  ```
  并在 `offline` 之后、`teaching` 结束 `}` 之前新增 `blended` 对象（文案见上「决策」）。
- `src/i18n/dictionaries/en.jsx` 同步：title 改为 `Online ✖️ Offline ✖️ Blended<br/>...Multimode Empowerment`，新增 `blended`。

### Step 2 — Teaching.jsx 新增第三卡片
- import `ConversationLottie`。
- 在 `.offline` 卡 div 之后新增 `blended` 卡：`className={`${styles.card} ${styles.blended}`}`，结构同另两张（cardShape x2、cardIcon 含 Lottie、h3、p、tags）。
- tags 使用 `s.blended.tags`，复用 `styles.tag`（不加 tagDark，保持白底浅透）。

### Step 3 — Teaching.module.css 布局与第三卡色
- `.grid` 改为 `grid-template-columns: repeat(3, 1fr)`。
- 新增 `.blended { background: var(--pink); }`。
- 断点 `@media (max-width: 900px)` 已是单列，保持；3 列在窄屏自动堆叠，无需额外断点（900px 处 3 列仍可用，与原设计一致）。
- 可选：第三卡的 cardShape 内联在 JSX 中（与现有卡一致，inline style）。

## 验证
- `npm run build` 通过。
- `npm run dev` 目视：三卡等宽并排，第三卡 pink 底白字，标题显示「线上 ✖️ 线下 ✖️ 混合 / 多模式赋能」。
- 切换英文，标题与第三卡文案为英文。
- 900px 以下三卡堆叠单列。
- 教学形式所在首页背景仍为 gray（上一轮已改），三张深色卡在 gray 底上对比正常。

## 范围外
- 不改动其他板块。
- 不新增 Lottie 资源（复用现有 ConversationLottie）。
- 不调整 SectionHeader / Reveal 通用组件。

## 验证清单
- [ ] zh/en teaching.title 文案正确
- [ ] zh/en teaching.blended 对象存在且字段齐全
- [ ] Teaching.jsx import ConversationLottie，第三卡片渲染
- [ ] Teaching.module.css `.grid` 3 列、`.blended` pink 底
- [ ] `npm run build` 通过
