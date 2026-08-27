<div align="center">

# 🚀 OpenNative

**Your Local AI Powerhouse — A Desktop AI Native Toolkit**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-installation)

**🤖 Multi-AI Engine · 🔌 Extensible Code Framework · 🔒 Fully Local · 🌍 Cross-Platform**

[⭐ Star](https://github.com/OpenNativeAI/OpenNative) · [🐛 Issues](https://github.com/OpenNativeAI/OpenNative/issues) · [💬 Discussions](https://github.com/OpenNativeAI/OpenNative/discussions)

</div>

> 🌐 **Languages:** [🇨🇳 简体中文](README.md) · [🇺🇸 English](README.en.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇩🇪 Deutsch](README.de.md)

---

## ✨ Why OpenNative?

| Feature | Description |
|---------|-------------|
| 🤖 **Multi-AI Engine Support** | Built-in llama.cpp, extensible to OpenAI / Claude / Ollama / vLLM |
| 🔌 **Extensible Code Framework** | Modular plugin architecture, load on demand |
| 💬 **Professional Chat Experience** | Streaming output, Markdown rendering, multi-session, parameter panel |
| 🔒 **Fully Local** | Data never leaves your machine, privacy-first |
| 🌍 **Cross-Platform** | Native support for macOS / Windows / Linux |
| ⚡ **Native Performance** | Metal / CUDA / Vulkan hardware acceleration |

---

## 🚀 Quick Start

### Requirements

- **Node.js** >= 20
- **pnpm** >= 9 (recommended) or npm / yarn
- **OS**: macOS 12+ / Windows 10+ / Linux (major distros)

### Get Started in 3 Steps

```bash
# 1. Clone the repository
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. Install dependencies
pnpm install

# 3. Start dev mode
pnpm dev
```

Once launched, click the **Engine** tab in the sidebar to get started.

---

## 📦 Installation

### Development Mode

```bash
pnpm dev
```

### Build

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

### Unpacked Build (for local testing)

```bash
pnpm build:unpack
```

---

## 🎯 User Guide

1. **Select Model**: Click the "Select Model" button in the Engine page, pick a local `.gguf` model file (Qwen, Llama, Mistral, Phi, Gemma, etc.)
2. **Tune Parameters**: Adjust temperature, Top-P, context size, GPU layers in the right settings panel
3. **Start Chatting**: Type in the input box, enjoy streaming output and Markdown rendering
4. **Multi-Session**: Create multiple independent conversations, each with its own context history

### Recommended Models

| Model | Parameters | RAM Required | Best For |
|-------|------------|--------------|----------|
| Qwen 2.5 | 0.5B - 72B | 1GB - 48GB | Multilingual, Chinese |
| Llama 3.1 | 8B - 405B | 6GB - 250GB | English, reasoning |
| Mistral | 7B - 22B | 5GB - 15GB | Lightweight, fast |
| Phi-3 | 3.8B - 14B | 3GB - 10GB | Microsoft, lightweight |
| Gemma 2 | 2B - 27B | 2GB - 18GB | Google family |

Download models from [HuggingFace](https://huggingface.co/) or [ModelScope](https://www.modelscope.cn/).

---

## 🏗 Project Structure

```
OpenNative/
├── src/
│   ├── main/                  # Electron main process
│   │   ├── services/          # AI engine services
│   │   │   └── llamaCppService.ts
│   │   ├── ipc/               # IPC communication
│   │   └── index.ts           # Main process entry
│   ├── preload/               # Preload scripts
│   └── renderer/              # Renderer process
│       ├── components/        # Shared components
│       ├── layouts/           # Layout components
│       ├── pages/             # Pages
│       │   ├── Home/          # Workbench
│       │   └── Engine/        # AI engine
│       ├── utils/             # Utilities
│       └── store/             # Zustand state
├── resources/                 # Static assets
├── electron.vite.config.ts
└── electron-builder.yml
```

---

## 🔌 Engine Extension

OpenNative uses a modular design where engines are injected as services. See the existing implementation:

```typescript
// src/main/services/llamaCppService.ts
export class LlamaCppEngine {
  async loadModel(path: string): Promise<void> { ... }
  async chat(messages: ChatMessage[]): Promise<string> { ... }
  async unload(): Promise<void> { ... }
}
```

### Planned Engines

- [x] **llama.cpp** (built-in)
- [ ] **OpenAI / Azure OpenAI**
- [ ] **Anthropic Claude**
- [ ] **Ollama** (local server)
- [ ] **vLLM / TGI** (production inference)
- [ ] **Google Gemini**

PRs welcome for new engines!

---

## 🛠 Tech Stack

- **Runtime**: Electron 39
- **UI Framework**: React 19 + TypeScript 5
- **Build Tool**: electron-vite
- **State Management**: Zustand
- **Routing**: React Router 7
- **AI Engine**: node-llama-cpp
- **Markdown**: marked + DOMPurify
- **Code Quality**: ESLint + Prettier

---

## 🤝 Contributing

All forms of contribution are welcome!

### Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Run `pnpm typecheck` and `pnpm lint` before committing
- Follow `.prettierrc.yaml` configuration
- Open an Issue first for significant changes

---

## 📄 License

This project is licensed under the [MIT](LICENSE) License.

---

<div align="center">

**⭐ If this project helps you, please give us a Star!**

Made with ❤️ by the OpenNative Team

[Website](https://opennative.ai) · [GitHub](https://github.com/OpenNativeAI/OpenNative) · [Contact](mailto:1178677990@qq.com)

</div>
