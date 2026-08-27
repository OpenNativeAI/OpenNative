<div align="center">

# 🚀 OpenNative

**로컬 AI의 완벽한 신기 — 데스크톱 AI 네이티브 툴킷**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](#-설치)

**🤖 멀티 AI 엔진 · 🔌 확장 가능한 코드 프레임워크 · 🔒 완전 로컬 · 🌍 크로스 플랫폼**

</div>

> 🌐 **언어:** [🇨🇳 简体中文](README.md) · [🇺🇸 English](README.en.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇩🇪 Deutsch](README.de.md)

---

## ✨ 왜 OpenNative인가?

| 기능 | 설명 |
|------|------|
| 🤖 **멀티 AI 엔진** | llama.cpp 내장, OpenAI / Claude / Ollama / vLLM 확장 가능 |
| 🔌 **확장 가능한 코드 프레임워크** | 모듈러 플러그인 아키텍처 |
| 💬 **프로페셔널한 대화 경험** | 스트리밍 출력, Markdown 렌더링, 멀티 세션 |
| 🔒 **완전 로컬** | 데이터가 기기를 떠나지 않음, 프라이버시 보호 |
| 🌍 **크로스 플랫폼** | macOS / Windows / Linux 네이티브 지원 |
| ⚡ **네이티브 성능** | Metal / CUDA / Vulkan 하드웨어 가속 |

---

## 🚀 빠른 시작

### 요구 사항

- **Node.js** >= 20
- **pnpm** >= 9 (권장) 또는 npm / yarn
- **OS**: macOS 12+ / Windows 10+ / Linux (주요 배포판)

### 3 단계로 시작

```bash
# 1. 저장소 복제
git clone https://github.com/OpenNativeAI/OpenNative.git
cd OpenNative

# 2. 의존성 설치
pnpm install

# 3. 개발 모드 시작
pnpm dev
```

시작 후 사이드바의 **Engine** 탭을 클릭하여 시작하세요.

---

## 📦 설치

### 개발 모드

```bash
pnpm dev
```

### 빌드

```bash
# macOS
pnpm build:mac

# Windows
pnpm build:win

# Linux
pnpm build:linux
```

---

## 🎯 사용 가이드

1. **모델 선택**: Engine 페이지의 "모델 선택" 버튼을 클릭하여 로컬 `.gguf` 모델 파일 선택
2. **매개변수 조정**: 오른쪽 패널에서 온도, Top-P, 컨텍스트 길이, GPU 레이어 등을 조정
3. **대화 시작**: 입력 상자에 질문 입력, 스트리밍 출력과 Markdown 렌더링 즐기기
4. **멀티 세션**: 여러 독립적인 대화 생성, 각 대화는 자체 컨텍스트 기록 유지

---

## 🛠 기술 스택

- **런타임**: Electron 39
- **UI 프레임워크**: React 19 + TypeScript 5
- **빌드 도구**: electron-vite
- **AI 엔진**: node-llama-cpp

---

## 🤝 기여

Pull Request와 Issue를 환영합니다!

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경 사항 커밋 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 열기

---

## 📄 라이선스

이 프로젝트는 [MIT](LICENSE) 라이선스 하에 배포됩니다.

---

<div align="center">

Made with ❤️ by the OpenNative Team

[GitHub](https://github.com/OpenNativeAI/OpenNative) · [문의](mailto:1178677990@qq.com)

</div>
