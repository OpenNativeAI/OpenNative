<div align="center">

# 🚀 OpenNative

**Tu Potencia Local de IA — Kit de Herramientas de IA Nativa de Escritorio**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-instalación)

**🤖 Motor Multi-IA · 🔌 Framework de Código Extensible · 🔒 Completamente Local · 🌍 Multiplataforma**

</div>

> 📖 **Lee en tu idioma:** [🇨🇳 简体中文](README.zh.md) · [🇺🇸 English](README.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 **Español**](README.es.md) · [🇫🇷 Français](README.fr.md)

---

## ✨ ¿Por qué OpenNative?

| Característica | Descripción |
|----------------|-------------|
| 🤖 **Motor Multi-IA** | llama.cpp integrado, extensible a OpenAI / Claude / Ollama / vLLM |
| 🔌 **Framework de Código Extensible** | Arquitectura modular de plugins |
| 💬 **Experiencia de Chat Profesional** | Salida en streaming, renderizado Markdown, multi-sesión |
| 🔒 **Completamente Local** | Los datos nunca salen de tu máquina |
| 🌍 **Multiplataforma** | Soporte nativo para macOS / Windows / Linux |
| ⚡ **Rendimiento Nativo** | Aceleración de hardware Metal / CUDA / Vulkan |

---

## 🚀 Inicio Rápido

### Requisitos

- **Node.js** >= 20
- **pnpm** >= 9 (recomendado) o npm / yarn
- **SO**: macOS 12+ / Windows 10+ / Linux (principales distribuciones)

### Comienza en 3 Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. Instalar dependencias
pnpm install

# 3. Iniciar modo desarrollo
pnpm dev
```

Una vez iniciado, haz clic en la pestaña **Engine** en la barra lateral.

---

## 📦 Instalación

### Modo Desarrollo

```bash
pnpm dev
```

### Compilar

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

---

## 🎯 Guía de Uso

1. **Seleccionar Modelo**: Haz clic en el botón "Seleccionar Modelo" en la página Engine
2. **Ajustar Parámetros**: Ajusta temperatura, Top-P, tamaño de contexto en el panel derecho
3. **Iniciar Chat**: Escribe en el cuadro de entrada, disfruta del streaming y Markdown
4. **Multi-Sesión**: Crea múltiples conversaciones independientes

---

## 🛠 Stack Tecnológico

- **Runtime**: Electron 39
- **UI**: React 19 + TypeScript 5
- **Build Tool**: electron-vite
- **Motor IA**: node-llama-cpp

---

## 🤝 Contribuir

¡PRs e Issues son bienvenidos!

1. Haz fork del repositorio
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Confirma tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Empuja a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

---

<div align="center">

Made with ❤️ by the OpenNative Team

[GitHub](https://github.com/OpenNativeAI/OpenNative) · [Contacto](mailto:1178677990@qq.com)

</div>
