<div align="center">

# 🚀 OpenNative

**Votre Puissance IA Locale — Boîte à Outils IA Native de Bureau**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-installation)

**🤖 Moteur Multi-IA · 🔌 Framework de Code Extensible · 🔒 Entièrement Local · 🌍 Multiplateforme**

</div>

> 📖 **Lire dans votre langue :** [🇨🇳 简体中文](README.zh.md) · [🇺🇸 English](README.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 **Français**](README.fr.md)

---

## ✨ Pourquoi OpenNative ?

| Fonctionnalité | Description |
|----------------|-------------|
| 🤖 **Moteur Multi-IA** | llama.cpp intégré, extensible vers OpenAI / Claude / Ollama / vLLM |
| 🔌 **Framework de Code Extensible** | Architecture modulaire de plugins |
| 💬 **Expérience de Chat Professionnelle** | Sortie en streaming, rendu Markdown, multi-session |
| 🔒 **Entièrement Local** | Les données ne quittent jamais votre machine |
| 🌍 **Multiplateforme** | Support natif pour macOS / Windows / Linux |
| ⚡ **Performance Native** | Accélération matérielle Metal / CUDA / Vulkan |

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** >= 20
- **pnpm** >= 9 (recommandé) ou npm / yarn
- **OS** : macOS 12+ / Windows 10+ / Linux (distributions principales)

### Commencez en 3 Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. Installer les dépendances
pnpm install

# 3. Lancer le mode développement
pnpm dev
```

Une fois lancé, cliquez sur l'onglet **Engine** dans la barre latérale.

---

## 📦 Installation

### Mode Développement

```bash
pnpm dev
```

### Compiler

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

---

## 🎯 Guide d'Utilisation

1. **Sélectionner le Modèle** : Cliquez sur le bouton "Sélectionner le Modèle" dans la page Engine
2. **Ajuster les Paramètres** : Ajustez la température, Top-P, taille du contexte dans le panneau de droite
3. **Commencer à Chatter** : Tapez dans la zone de saisie, profitez du streaming et du Markdown
4. **Multi-Session** : Créez plusieurs conversations indépendantes

---

## 🛠 Stack Technique

- **Runtime** : Electron 39
- **UI** : React 19 + TypeScript 5
- **Outil de Build** : electron-vite
- **Moteur IA** : node-llama-cpp

---

## 🤝 Contribuer

Les PRs et Issues sont les bienvenus !

1. Forkez le dépôt
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'feat: Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

<div align="center">

Made with ❤️ by the OpenNative Team

[GitHub](https://github.com/OpenNativeAI/OpenNative) · [Contact](mailto:1178677990@qq.com)

</div>
