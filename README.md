## react-native-feature-based-boilerplate

# Installation (RN 0.76.9 recommended)

```bash
npx @react-native-community/cli@latest init MyApp \
  --version 0.76.9 \
  --template react-native-feature-based-boilerplate
```

## Requirements
- Node >= 18
- Xcode (iOS) / Android Studio (Android)
- Watchman (recommended on macOS)

## What's Included
- TypeScript, i18n (i18next), Zustand, MMKV
- Preconfigured Babel for alias and dotenv
- iOS/Android project files, font asset linking
- Feature-based folder structure

## Quick Start
```bash
npm install
npm start
npm run ios
npm run android
```

## Scripts
- `npm start`: starts Metro
- `npm run ios`: runs on iOS simulator
- `npm run android`: runs on Android emulator

## Environment Variables
- `react-native-dotenv` is configured. Babel plugin is set up for `.env`.

## Version Compatibility
- React Native: `0.76.9`
- React: `18.3.1`
- @react-native packages aligned with `0.76.9`


