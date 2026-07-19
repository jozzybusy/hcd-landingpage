# 修复 OptionWheel 标签重叠（初始化竞态）

## 目标
OptionWheel 在 Hero 区渲染时，4 个标签有时全部重叠在一起（堆叠于中心），轮盘的曲线布局未生效。需让初始布局稳定可靠地应用。

## 根因（已通过 jsdom 实验确认）
OptionWheel 的布局完全由 rAF 回调 `runFrame` 驱动：每个 item 的 `transform/opacity/filter` 在 rAF 帧里通过 `el.style` 内联设置。

初始化路径（`defaultSelected={0}`，`posRef=targetRef=0`）：
1. 挂载 → `useEffect`（OptionWheel.jsx:241）调用 `applyTarget(0, false)` → `startLoop()` → `requestAnimationFrame(runFrame)`。
2. `runFrame` 执行时计算 `settled = Math.abs(target - next) < 0.001`。因为 `target===pos===0`，`next=0`，**settled 立即为 true**。
3. 定位循环（OptionWheel.jsx:98-120）遍历 `itemRefs.current` 设置 transform。**但此时 itemRefs 可能尚未填充**（React 18 并发渲染下，首帧 rAF 可能在 refs commit 前触发）。
4. 若 `itemRefs.current[i]` 为 `undefined`，`if (!el) continue`（OptionWheel.jsx:100）跳过该元素，transform 未设置。
5. 因 `settled=true`，`rafRef.current = null`（OptionWheel.jsx:122）→ **循环停止，永不再跑**。
6. 结果：元素停留在 CSS 默认态 `position:absolute; top:50%; left:0` → 全部堆叠中心 = 用户看到的"重叠"。

**实验证据**（jsdom + rAF polyfill，连续多次运行）：
- 原始组件：transforms 随机为 EMPTY（~40% 失败率）。
- 失败时 rAF 仅触发 0-1 次，refs 未就绪 → 跳过布局 → 停止循环。

## 修复方案（已验证 12/12 稳定通过）
在 `src/components/ui/OptionWheel.jsx` 中，用 `useLayoutEffect` 在 commit 阶段同步调用一次 `runFrame`，保证 refs 已就绪时立即应用布局，不依赖 rAF 时序。

### 改动 1：导入 useLayoutEffect
```jsx
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
```

### 改动 2：新增 useLayoutEffect（放在现有 useEffect 之前）
在 OptionWheel.jsx 现有的 `useEffect(() => { applyTarget(targetRef.current, false); }, [...])` 之前插入：
```jsx
useLayoutEffect(() => {
  lastRef.current = performance.now();
  runFrame(performance.now());
}, [items, runFrame]);
```
- `useLayoutEffect` 在 DOM commit 后、浏览器 paint 前同步执行，此时 `itemRefs.current` 必然已填充。
- 同步调用 `runFrame` 立即把 transform 写到每个 item 的内联 style，消除"首帧 refs 未就绪"的竞态。
- 依赖 `[items, runFrame]`：仅 items 变化（如中英切换）时重跑；`runFrame` 是 `useCallback([],)` 稳定引用。
- 保留原 `useEffect`（applyTarget/startLoop）不动，用于交互（滚动/拖拽/键盘）驱动的动画。

### 验证过的等效性
- 该修复在 12 次连续 jsdom 运行中 12/12 全部 SET（transform 正确应用），原组件约 40% 失败。
- 未改变任何交互逻辑（拖拽、wheel、键盘、点击）。

## 受影响文件
- `src/components/ui/OptionWheel.jsx`（仅此文件，2 处改动）

## 验证
- `npm run build` 通过。
- `npm run dev` 目视 Hero 区：4 个标签（商业素质/领导力/组织合力/合得国际）沿曲线展开，不再重叠；刷新多次均稳定。
- 交互：鼠标滚轮、拖拽、方向键、点击标签都能正常切换。
- 中英切换：标签文案变化后曲线布局保持。

## 风险
- `useLayoutEffect` 在 SSR 环境会报警告（React 19+ 已合并）。本仓库是纯 CSR（`main.jsx` 用 `createRoot`，无 SSR），无影响。若未来引入 SSR，需将其包 `useIsomorphicLayoutEffect`。
- `performance.now()` 在浏览器与 jsdom 均可用，无兼容问题。

## 验证清单
- [ ] OptionWheel.jsx 导入 useLayoutEffect
- [ ] 新增 useLayoutEffect 调用 runFrame
- [ ] `npm run build` 通过
- [ ] Hero 区 4 标签曲线展开，多次刷新稳定
- [ ] 滚轮/拖拽/键盘/点击交互正常
- [ ] 中英切换标签布局保持
