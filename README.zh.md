<div align="center">

# 🚀 OpenNative

**本地 AI 的完美神器 — 你的桌面端 AI Native 工具箱**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-下载安装)
[![Stars](https://img.shields.io/github/stars/OpenNativeAI/OpenNative?style=social)](https://github.com/OpenNativeAI/OpenNative)

**🤖 多 AI 引擎 · 🔌 可扩展 Code 框架 · 🔒 完全本地化 · 🌍 跨平台**

[⭐ Star](https://github.com/OpenNativeAI/OpenNative) · [🐛 Issues](https://github.com/OpenNativeAI/OpenNative/issues) · [💬 Discussions](https://github.com/OpenNativeAI/OpenNative/discussions)

</div>

> 📖 **用你的语言阅读:** [🇨🇳 **简体中文**](README.zh.md) · [🇺🇸 English](README.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md)

---

## ✨ 为什么选择 OpenNative？

| 特性 | 说明 |
|------|------|
| 🤖 **多 AI 引擎支持** | 内置 llama.cpp，可扩展接入 OpenAI / Claude / Ollama / vLLM |
| 🔌 **克重 Code 框架** | 模块化插件架构，按需加载、灵活扩展 |
| 💬 **专业对话体验** | 流式输出、Markdown 渲染、多会话管理、参数可视化 |
| 🔒 **完全本地化** | 数据不出本机，隐私可控，适合敏感场景 |
| 🌍 **跨平台** | macOS / Windows / Linux 全平台原生支持 |
| ⚡ **原生性能** | Metal / CUDA / Vulkan 硬件加速，推理飞快 |

---

## 📑 目录

- [🚀 快速开始](#-快速开始)
- [📦 安装说明](#-安装说明)
- [🎯 使用指南](#-使用指南)
- [🏗 目录结构](#-目录结构)
- [🔌 引擎扩展](#-引擎扩展)
- [🤝 贡献指南](#-贡献指南)
- [📄 开源协议](#-开源协议)
- [🌐 Languages](#-languages)

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 20
- **pnpm** >= 9（推荐）或 npm / yarn
- **操作系统**：macOS 12+ / Windows 10+ / Linux（主流发行版）

### 三步上手

```bash
# 1. 克隆仓库
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. 安装依赖
pnpm install

# 3. 启动开发模式
pnpm dev
```

应用启动后，访问左侧导航的 **Engine** 标签即可开始使用。

---

## 📦 安装说明

### 开发模式

```bash
pnpm dev
```

### 打包构建

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

### 仅打包不压缩（用于本地测试）

```bash
pnpm build:unpack
```

---

## 🎯 使用指南

1. **选择模型**：点击 Engine 页面右上角的「选择模型」按钮，选中本地的 `.gguf` 模型文件（Qwen、Llama、Mistral、Phi、Gemma 等任意 gguf 都支持）
2. **调整参数**：在右侧设置面板中调节温度、Top-P、上下文长度、GPU 层数等参数
3. **开始对话**：在底部输入框输入你的问题，享受流式输出与 Markdown 渲染
4. **多会话管理**：支持创建多个独立对话，每个对话保留独立的上下文历史

### 推荐模型

| 模型 | 参数量 | 内存需求 | 适用场景 |
|------|--------|----------|----------|
| Qwen 2.5 | 0.5B - 72B | 1GB - 48GB | 通用对话、中文优秀 |
| Llama 3.1 | 8B - 405B | 6GB - 250GB | 英文为主、推理强 |
| Mistral | 7B - 22B | 5GB - 15GB | 轻量快速 |
| Phi-3 | 3.8B - 14B | 3GB - 10GB | 微软系、轻量 |
| Gemma 2 | 2B - 27B | 2GB - 18GB | Google 系 |

模型可从 [HuggingFace](https://huggingface.co/) 或 [ModelScope](https://www.modelscope.cn/) 下载。

---

## 🏗 目录结构

```
OpenNative/
├── src/
│   ├── main/                  # Electron 主进程
│   │   ├── services/          # AI 引擎服务
│   │   │   └── llamaCppService.ts   # llama.cpp 引擎实现
│   │   ├── ipc/               # IPC 通信层
│   │   └── index.ts           # 主进程入口
│   ├── preload/               # 预加载脚本（安全桥接）
│   └── renderer/              # 渲染进程
│       ├── components/        # 通用组件
│       │   └── Sidebar/       # 侧边栏
│       ├── layouts/           # 布局组件
│       ├── pages/             # 页面
│       │   ├── Home/          # 工作台首页
│       │   └── Engine/        # AI 对话引擎
│       ├── utils/             # 工具函数
│       │   └── markdown.ts    # Markdown 渲染
│       └── store/             # Zustand 状态管理
├── resources/                 # 静态资源
├── electron.vite.config.ts    # Vite 配置
└── electron-builder.yml       # 打包配置
```

---

## 🔌 引擎扩展

OpenNative 采用模块化设计，引擎以服务形式注入。参考现有实现：

```typescript
// src/main/services/llamaCppService.ts
export class LlamaCppEngine {
  async loadModel(path: string): Promise<void> { ... }
  async chat(messages: ChatMessage[]): Promise<string> { ... }
  async unload(): Promise<void> { ... }
}
```

### 待支持的引擎

- [x] **llama.cpp**（内置）
- [ ] **OpenAI / Azure OpenAI**
- [ ] **Anthropic Claude**
- [ ] **Ollama**（本地服务）
- [ ] **vLLM / TGI**（生产级推理）
- [ ] **Google Gemini**

欢迎提交 PR 接入更多引擎！

---

## 🛠 技术栈

- **运行时**：Electron 39
- **UI 框架**：React 19 + TypeScript 5
- **构建工具**：electron-vite
- **状态管理**：Zustand
- **路由**：React Router 7
- **AI 引擎**：node-llama-cpp
- **Markdown**：marked + DOMPurify
- **代码规范**：ESLint + Prettier

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码规范

- 提交前运行 `pnpm typecheck` 和 `pnpm lint`
- 遵循 `.prettierrc.yaml` 配置
- 重要改动请先开 Issue 讨论

---

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源。

---

## 🌐 Languages

Choose your preferred language for README:

| Language | Link |
|----------|------|
| 🇨🇳 简体中文 | [README.md](README.md) |
| 🇺🇸 English | [README.en.md](README.en.md) |
| 🇯🇵 日本語 | [README.ja.md](README.ja.md) |
| 🇰🇷 한국어 | [README.ko.md](README.ko.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |
| 🇫🇷 Français | [README.fr.md](README.fr.md) |
| 🇩🇪 Deutsch | [README.de.md](README.de.md) |

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

Made with ❤️ by the OpenNative Team

[官网](https://opennative.ai) · [GitHub](https://github.com/OpenNativeAI/OpenNative) · [联系](mailto:1178677990@qq.com)

</div>
