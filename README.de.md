<div align="center">

# 🚀 OpenNative

**Deine Lokale KI-Kraft — Desktop-KI-Native-Toolkit**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-installation)

**🤖 Multi-KI-Engine · 🔌 Erweiterbares Code-Framework · 🔒 Vollständig Lokal · 🌍 Plattformübergreifend**

</div>

> 📖 **In deiner Sprache lesen:** [🇨🇳 简体中文](README.zh.md) · [🇺🇸 English](README.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇩🇪 **Deutsch**](README.de.md)

---

## ✨ Warum OpenNative?

| Funktion | Beschreibung |
|----------|--------------|
| 🤖 **Multi-KI-Engine** | llama.cpp eingebaut, erweiterbar zu OpenAI / Claude / Ollama / vLLM |
| 🔌 **Erweiterbares Code-Framework** | Modulare Plugin-Architektur |
| 💬 **Professionelles Chat-Erlebnis** | Streaming-Ausgabe, Markdown-Rendering, Multi-Session |
| 🔒 **Vollständig Lokal** | Daten verlassen niemals deine Maschine |
| 🌍 **Plattformübergreifend** | Native Unterstützung für macOS / Windows / Linux |
| ⚡ **Native Leistung** | Metal / CUDA / Vulkan Hardware-Beschleunigung |

---

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** >= 20
- **pnpm** >= 9 (empfohlen) oder npm / yarn
- **OS**: macOS 12+ / Windows 10+ / Linux (wichtige Distributionen)

### In 3 Schritten Loslegen

```bash
# 1. Repository klonen
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. Abhängigkeiten installieren
pnpm install

# 3. Entwicklungsmodus starten
pnpm dev
```

Nach dem Start klicke auf den **Engine**-Tab in der Seitenleiste.

---

## 📦 Installation

### Entwicklungsmodus

```bash
pnpm dev
```

### Bauen

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

---

## 🎯 Benutzeranleitung

1. **Modell Auswählen**: Klicke auf die Schaltfläche "Modell Auswählen" auf der Engine-Seite
2. **Parameter Anpassen**: Passe Temperatur, Top-P, Kontextgröße im rechten Panel an
3. **Chat Starten**: Tippe in das Eingabefeld, genieße Streaming und Markdown
4. **Multi-Session**: Erstelle mehrere unabhängige Konversationen

---

## 🛠 Tech-Stack

- **Runtime**: Electron 39
- **UI**: React 19 + TypeScript 5
- **Build-Tool**: electron-vite
- **KI-Engine**: node-llama-cpp

---

## 🤝 Beitragen

PRs und Issues sind willkommen!

1. Forke das Repository
2. Erstelle deinen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'feat: Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

## 📄 Lizenz

Dieses Projekt ist unter der [MIT](LICENSE)-Lizenz lizenziert.

---

<div align="center">

Made with ❤️ by the OpenNative Team

[GitHub](https://github.com/OpenNativeAI/OpenNative) · [Kontakt](mailto:1178677990@qq.com)

</div>
