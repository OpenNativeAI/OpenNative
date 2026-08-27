# 🚀 OpenNative

**本地 AI 的完美神器** — 一款支持多种 AI 引擎、内置克重（可扩展）代码框架的桌面级 AI Native 工具。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-下载安装)

[🇺🇸 English](#-english) · [🇨🇳 简体中文](#-简体中文) · [🇯🇵 日本語](#-日本語) · [🇰🇷 한국어](#-한국어) · [🇪🇸 Español](#-español) · [🇫🇷 Français](#-français) · [🇩🇪 Deutsch](#-deutsch)

---

## ✨ 核心亮点

| 功能 | 说明 |
|---|---|
| 🤖 **多 AI 引擎支持** | 内置 llama.cpp 引擎，可扩展对接更多本地 / 云端引擎 |
| 🔌 **克重 Code 框架** | 模块化插件架构，按需加载、灵活扩展 |
| 💬 **本地 AI 完美体验** | 流式输出、Markdown 渲染、多会话管理、参数可视化调节 |
| 🔒 **完全本地化** | 数据不离开你的电脑，隐私可控 |
| 🌍 **跨平台** | macOS / Windows / Linux 全平台支持 |
| ⚡ **原生体验** | 基于 Electron + React 19，启动快、体验流畅 |

---

## 🇨🇳 简体中文

### 这是什么？

**OpenNative** 是一款定位「本地 AI Native」的桌面应用，致力于让任何人都能在自己的电脑上**零门槛运行大语言模型**。我们相信未来的 AI 工具应该是：

- 🚀 **开箱即用** — 无需复杂配置，无需下载庞大的二进制包
- 🔌 **可插拔** — 内置 llama.cpp，支持后续扩展更多引擎
- 🎨 **所见即所得** — 流式对话、Markdown 渲染、参数面板一应俱全
- 🛠 **可定制** — 开放的插件体系，让社区共建 AI 工具生态

### 快速开始

#### 环境要求

- **Node.js** >= 20
- **pnpm** >= 9（推荐）或 npm / yarn
- **macOS** 12+ / **Windows** 10+ / **Linux**（主流发行版）

#### 安装

```bash
# 克隆仓库
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 安装依赖
pnpm install
```

#### 开发模式

```bash
pnpm dev
```

#### 打包构建

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

### 使用指南

1. 启动应用后，点击左侧导航的 **Engine** 标签
2. 点击 **「选择模型」** 选中本地的 `.gguf` 模型文件
3. 在右侧设置面板中调整温度、Top-P、上下文长度等参数
4. 在底部输入框开始对话，享受流式输出与 Markdown 渲染

### 目录结构

```
OpenNative/
├── src/
│   ├── main/              # Electron 主进程
│   │   ├── services/      # AI 引擎服务（llama.cpp 等）
│   │   └── ipc/           # IPC 通信层
│   ├── preload/           # 预加载脚本
│   └── renderer/          # 渲染进程（React）
│       ├── components/    # 通用组件
│       ├── layouts/       # 布局组件
│       ├── pages/         # 页面
│       │   ├── Home/      # 工作台首页
│       │   └── Engine/    # AI 对话引擎
│       └── utils/         # 工具函数
├── resources/             # 静态资源
└── electron.vite.config.ts
```

### 插件开发

OpenNative 采用模块化设计，欢迎提交 PR 接入更多 AI 引擎：

- **OpenAI / Claude API**：可作为云端引擎接入
- **Ollama**：本地服务接入
- **vLLM / TGI**：高性能推理服务接入

参考 `src/main/services/llamaCppService.ts` 的实现。

---

## 🇺🇸 English

### What is this?

**OpenNative** is a desktop application positioned as a "Local AI Native" tool, designed to let anyone **run large language models on their own computer with zero friction**. We believe the future of AI tools should be:

- 🚀 **Out-of-the-box** — No complex configuration, no huge binary downloads
- 🔌 **Pluggable** — Built-in llama.cpp, extensible to more engines
- 🎨 **WYSIWYG** — Streaming chat, Markdown rendering, parameter panel
- 🛠 **Customizable** — Open plugin system for community-driven ecosystem

### Quick Start

#### Requirements

- **Node.js** >= 20
- **pnpm** >= 9 (recommended) or npm / yarn
- **macOS** 12+ / **Windows** 10+ / **Linux** (主流发行版)

#### Install

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
```

#### Development

```bash
pnpm dev
```

#### Build

```bash
pnpm build:mac      # macOS
pnpm build:win      # Windows
pnpm build:linux    # Linux
```

### Architecture

OpenNative follows a clean three-layer architecture:

- **Main process** (`src/main/`): Node.js side, handles AI engine lifecycle
- **Preload** (`src/preload/`): Secure bridge between main and renderer
- **Renderer** (`src/renderer/`): React 19 UI with TypeScript

### Roadmap

- [ ] Multi-engine support (OpenAI, Claude, Ollama, vLLM)
- [ ] RAG (Retrieval-Augmented Generation) integration
- [ ] Plugin marketplace
- [ ] Cross-device sync (optional, end-to-end encrypted)

---

## 🇯🇵 日本語

### これは何ですか？

**OpenNative** は「ローカル AI ネイティブ」をコンセプトにしたデスクトップアプリで、誰でも自分のコンピューターで**摩擦ゼロで大言語モデルを実行できる**ようにすることを目指しています。

- 🚀 **すぐに使える** — 複雑な設定不要、大容量バイナリのダウンロード不要
- 🔌 **プラガブル** — llama.cpp 標準搭載、より多くのエンジンに拡張可能
- 🎨 **WYSIWYG** — ストリーミングチャット、Markdown レンダリング、パラメータパネル
- 🛠 **カスタマイズ可能** — コミュニティ主導のエコシステムのためのオープンなプラグインシステム

### クイックスタート

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
pnpm dev
```

### 必要環境

- **Node.js** >= 20
- **pnpm** >= 9
- **macOS** 12+ / **Windows** 10+ / **Linux**

---

## 🇰🇷 한국어

### 이것은 무엇인가요?

**OpenNative**는 "로컬 AI 네이티브"를 콘셉트로 한 데스크톱 애플리케이션으로, 누구나 자신의 컴퓨터에서 **마찰 없이 대규모 언어 모델을 실행**할 수 있도록 하는 것을 목표로 합니다.

- 🚀 **즉시 사용 가능** — 복잡한 설정 불필요, 대용량 바이너리 다운로드 불필요
- 🔌 **플러그 가능** — llama.cpp 기본 내장, 더 많은 엔진으로 확장 가능
- 🎨 **WYSIWYG** — 스트리밍 채팅, Markdown 렌더링, 매개변수 패널
- 🛠 **커스터마이즈 가능** — 커뮤니티主導 생태계를 위한 오픈 플러그인 시스템

### 빠른 시작

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
pnpm dev
```

### 요구 사항

- **Node.js** >= 20
- **pnpm** >= 9
- **macOS** 12+ / **Windows** 10+ / **Linux**

---

## 🇪🇸 Español

### ¿Qué es esto?

**OpenNative** es una aplicación de escritorio posicionada como "IA Nativa Local", diseñada para permitir que cualquiera **ejecute modelos de lenguaje grandes en su propia computadora sin fricción**.

- 🚀 **Listo para usar** — Sin configuración compleja, sin descargas de binarios enormes
- 🔌 **Conectable** — llama.cpp integrado, extensible a más motores
- 🎨 **WYSIWYG** — Chat en streaming, renderizado Markdown, panel de parámetros
- 🛠 **Personalizable** — Sistema de plugins abierto para un ecosistema comunitario

### Inicio Rápido

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
pnpm dev
```

### Requisitos

- **Node.js** >= 20
- **pnpm** >= 9
- **macOS** 12+ / **Windows** 10+ / **Linux**

---

## 🇫🇷 Français

### Qu'est-ce que c'est ?

**OpenNative** est une application de bureau positionnée comme « IA Native Locale », conçue pour permettre à quiconque d'**exécuter des grands modèles de langage sur son propre ordinateur sans friction**.

- 🚀 **Prêt à l'emploi** — Pas de configuration complexe, pas de téléchargements de binaires énormes
- 🔌 **Extensible** — llama.cpp intégré, extensible à plus de moteurs
- 🎨 **WYSIWYG** — Chat en streaming, rendu Markdown, panneau de paramètres
- 🛠 **Personnalisable** — Système de plugins ouvert pour un écosystème communautaire

### Démarrage Rapide

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
pnpm dev
```

### Prérequis

- **Node.js** >= 20
- **pnpm** >= 9
- **macOS** 12+ / **Windows** 10+ / **Linux**

---

## 🇩🇪 Deutsch

### Was ist das?

**OpenNative** ist eine Desktop-Anwendung, die als „Local AI Native" positioniert ist und es jedem ermöglicht, **große Sprachmodelle auf dem eigenen Computer reibungslos auszuführen**.

- 🚀 **Sofort einsatzbereit** — Keine komplexe Konfiguration, keine riesigen Binärdateien
- 🔌 **Erweiterbar** — llama.cpp eingebaut, auf weitere Engines erweiterbar
- 🎨 **WYSIWYG** — Streaming-Chat, Markdown-Rendering, Parameter-Panel
- 🛠 **Anpassbar** — Offenes Plugin-System für ein Community-Ökosystem

### Schnellstart

```bash
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative
pnpm install
pnpm dev
```

### Voraussetzungen

- **Node.js** >= 20
- **pnpm** >= 9
- **macOS** 12+ / **Windows** 10+ / **Linux**

---

## 🤝 贡献 / Contributing

欢迎提交 PR 和 Issue！请遵循以下规范：

- 代码风格遵循 `.prettierrc.yaml` 和 `eslint.config.mjs`
- 提交前运行 `pnpm typecheck` 和 `pnpm lint`
- 重要改动请先开 Issue 讨论

PRs and Issues are welcome! Please follow:

- Code style per `.prettierrc.yaml` and `eslint.config.mjs`
- Run `pnpm typecheck` and `pnpm lint` before committing
- Open an Issue first for significant changes

## 📄 License

[MIT](LICENSE) © OpenNative

## 🔗 Links

- 🌐 官网 / Website: [opennative.ai](https://opennative.ai)
- 💬 社区 / Community: [GitHub Discussions](https://github.com/OpenNativeAI/OpenNative/discussions)
- 🐛 问题反馈 / Bug Report: [GitHub Issues](https://github.com/OpenNativeAI/OpenNative/issues)
- 📧 联系 / Contact: 1178677990@qq.com

---

<p align="center">
  Made with ❤️ by the OpenNative Team
</p>
