# OpenNative 前端（Renderer）说明

Electron 渲染进程基于 **React 19 + TypeScript + Vite** 构建，路由使用 `react-router-dom`（HashRouter），状态管理使用 `zustand`。

## 目录结构

```
src/renderer/src/
├── api/                  # IPC 通信封装层（与主进程交互的唯一入口）
│   └── index.ts
├── assets/
│   └── styles/           # 全局样式分类管理
│       ├── theme.css     # 主题设计变量（design tokens，支持亮/暗主题）
│       ├── base.css      # reset、基础元素样式
│       └── main.css      # 应用布局、通用页面样式
├── components/           # 通用组件（跨页面复用的共享组件）
├── hooks/                # 自定义 hooks（useVersions 等）
│   └── index.ts
├── layouts/              # 布局组件（包裹页面，提供导航/页脚等公共框架）
│   └── MainLayout.tsx    # 头部导航 + 内容区 + 底部信息栏
├── pages/                # 路由级页面（每个页面一个目录，可内聚私有组件）
│   ├── Home/index.tsx
│   └── About/index.tsx
├── router/               # 路由配置（HashRouter，适配 Electron file:// 协议）
│   └── index.tsx
├── store/                # 全局状态管理（zustand）
│   └── index.ts
├── types/                # 全局类型定义
│   └── index.ts
├── utils/                # 工具函数
│   └── index.ts
├── App.tsx               # 纯路由壳
├── env.d.ts
└── main.tsx              # 入口文件（挂载 React 应用）
```

## 目录职责与使用约定

| 目录 | 职责 | 使用约定 |
|---|---|---|
| `api/` | 渲染进程与主进程通信的唯一入口 | 所有 IPC 调用都封装在这里，禁止在组件中裸用 `window.electron` / `window.api` |
| `assets/styles/` | 全局样式 | `theme.css` 放主题变量（亮/暗）；`base.css` 放 reset 与基础元素样式；`main.css` 放布局与通用样式；页面局部样式建议使用 CSS Modules 或与页面同目录 |
| `components/` | 通用组件 | 跨页面复用的组件放这里，按组件名拆分子目录；页面私有组件直接放在该页面的目录下 |
| `hooks/` | 自定义 hooks | 复用的逻辑（副作用、状态派生）抽取到这里 |
| `layouts/` | 布局组件 | 一个页面骨架对应一个布局，通过 `<Outlet />` 渲染子路由 |
| `pages/` | 路由级页面 | 一个路由一个页面目录，命名 `pages/页面名/index.tsx` |
| `router/` | 路由配置 | 新增页面时在此注册路由；Electron 生产环境走 `file://`，必须使用 HashRouter |
| `store/` | 全局状态 | 跨页面共享的全局状态放这里，页面内部状态用 `useState` 即可 |
| `types/` | 全局类型 | 跨模块共享的 TS 类型定义集中于此 |
| `utils/` | 工具函数 | 纯函数、无副作用的通用工具 |

## 主题切换

`theme.css` 中通过 `<html data-theme="dark|light">` 切换主题（`index.html` 默认 `dark`）。

运行时切换：

```ts
document.documentElement.dataset.theme = 'light' // 或 'dark'
```

组件中使用主题变量：

```css
.title {
  color: var(--color-primary);
  background: var(--color-bg-soft);
}
```

## 常用操作

### 新增一个页面

1. 在 `pages/` 下创建目录，如 `pages/Settings/index.tsx`
2. 在 `router/index.tsx` 中引入并注册路由：

```tsx
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```

3. 需要在导航中展示时，在 `layouts/MainLayout.tsx` 中添加 `<NavLink>`

### 新增一个主进程能力（IPC）

1. 在 `src/main/index.ts` 中用 `ipcMain.handle` / `ipcMain.on` 注册事件
2. 在 `src/preload/index.ts` 的 `api` 对象中添加方法，并在 `src/preload/index.d.ts` 的 `AppApi` 中补充类型
3. 在 `api/index.ts` 中封装导出，页面中调用封装后的方法

## 技术栈版本

- React 19（`react` / `react-dom`）
- react-router-dom 7（HashRouter）
- zustand 5
- TypeScript 5
- Vite 7 / electron-vite 5

## 常用命令

```bash
pnpm dev            # 启动开发（HMR）
pnpm typecheck      # 类型检查
pnpm lint           # ESLint 检查
pnpm build          # 类型检查 + 构建
```
