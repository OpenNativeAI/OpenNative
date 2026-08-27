<div align="center">

# 🚀 OpenNative

**ローカル AI の最強ツール — デスクトップ AI ネイティブ ツールキット**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-インストール)

**🤖 マルチ AI エンジン · 🔌 拡張可能なコードフレームワーク · 🔒 完全ローカル · 🌍 クロスプラットフォーム**

</div>

> 📖 **言語を選択:** [🇨🇳 简体中文](README.zh.md) · [🇺🇸 English](README.md) · [🇯🇵 **日本語**](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md)

---

## ✨ OpenNative が選ばれる理由

| 機能 | 説明 |
|------|------|
| 🤖 **マルチ AI エンジン** | llama.cpp を内蔵、OpenAI / Claude / Ollama / vLLM に拡張可能 |
| 🔌 **拡張可能なコードフレームワーク** | モジュラープラグインアーキテクチャ |
| 💬 **プロフェッショナルな対話体験** | ストリーミング出力、Markdown レンダリング、マルチセッション |
| 🔒 **完全ローカル** | データが端末から出ない、プライバシー保護 |
| 🌍 **クロスプラットフォーム** | macOS / Windows / Linux ネイティブ対応 |
| ⚡ **ネイティブパフォーマンス** | Metal / CUDA / Vulkan ハードウェアアクセラレーション |

---

## 🚀 クイックスタート

### 必要な環境

- **Node.js** >= 20
- **pnpm** >= 9（推奨）または npm / yarn
- **OS**: macOS 12+ / Windows 10+ / Linux（主要ディストリビューション）

### 3 ステップで開始

```bash
# 1. リポジトリをクローン
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. 依存関係をインストール
pnpm install

# 3. 開発モードを起動
pnpm dev
```

起動後、サイドバーの **Engine** タブをクリックして開始。

---

## 📦 インストール

### 開発モード

```bash
pnpm dev
```

### ビルド

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

---

## 🎯 使用ガイド

1. **モデル選択**: Engine ページの「モデル選択」ボタンをクリックし、ローカルの `.gguf` モデルファイルを選択
2. **パラメータ調整**: 右側のパネルで温度、Top-P、コンテキスト長、GPU レイヤーなどを調整
3. **対話開始**: 入力ボックスに質問を入力、ストリーミング出力と Markdown レンダリングを楽しむ
4. **マルチセッション**: 複数の独立した会話を作成、各会話が独自のコンテキスト履歴を保持

---

## 🛠 技術スタック

- **ランタイム**: Electron 39
- **UI フレームワーク**: React 19 + TypeScript 5
- **ビルドツール**: electron-vite
- **AI エンジン**: node-llama-cpp

---

## 🤝 コントリビュート

プルリクエストと Issue を歓迎します！

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'feat: Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

---

## 📄 ライセンス

[MIT](LICENSE) ライセンスの下で公開されています。

---

<div align="center">

Made with ❤️ by the OpenNative Team

[GitHub](https://github.com/OpenNativeAI/OpenNative) · [お問い合わせ](mailto:1178677990@qq.com)

</div>
