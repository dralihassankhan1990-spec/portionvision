# PortionVision 🍎🔍

**An AR food portion-size visualizer — estimate servings with familiar reference objects.**

By **Muhammad Bilal**

PortionVision helps you accurately estimate food portion sizes using everyday
reference objects (a deck of cards, a tennis ball, a golf ball) and an AR-style
camera overlay. Point the camera at your plate, align the wireframe reference
shape, capture — and log what you eat.

## ✨ Features

- **Food library** — 20+ common foods with standard serving sizes and calorie data
- **Visual comparisons** — intuitive "mental model" references (e.g. 3 oz steak = deck of cards)
- **AR camera overlay** — live camera feed with a dashed wireframe reference shape, capture-to-log
- **Portion log** — timestamped daily log with calorie totals, stored on-device
- **Favorites** — star foods you eat often
- **Accessibility** — high-contrast theme, large touch targets, ARIA labels (web)
- **Privacy-first** — zero backend; everything stays on the device

## 🧱 Project layout

| Path      | What it is                                                              |
|-----------|---------------------------------------------------------------------------|
| `/`       | Web app — React 18 + Vite + TypeScript + Bootstrap 5                       |
| `/mobile` | Native app — Expo (React Native) + TypeScript, camera via `expo-camera`    |

Both apps share the same concept and food dataset; each runs standalone.

## 🛠 Tech stack

- **Web:** React 18, TypeScript, Vite 4, Bootstrap 5, Bootstrap Icons, `getUserMedia` + Canvas
- **Mobile:** Expo SDK 54, React Native 0.81, TypeScript 5.9, `expo-camera`, AsyncStorage
- **State:** React hooks + LocalStorage (web) / AsyncStorage (mobile) — no backend

## 🚀 Run it

### Web app

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

### Mobile app (Expo)

```bash
cd mobile
npm install
npx expo start   # scan the QR code with Expo Go
```

Typecheck: `npx tsc --noEmit -p tsconfig.json` (from `mobile/`).

## 📝 Notes

- `constants.ts` (root) and `mobile/src/constants.ts` are large static food-data
  modules (~110 KB each); see `EXCLUDED_LARGE_FILES.md` if they are missing
  from a clone.
- Camera access is requested only when the AR feature is activated. No images
  ever leave the device.

## 📄 License

MIT — free for personal and commercial use.
