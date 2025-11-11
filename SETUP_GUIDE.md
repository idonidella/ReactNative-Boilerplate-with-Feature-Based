# Setup Guide for React Native Boilerplate

## CocoaPods Permissions

The setup script automatically fixes CocoaPods permissions during initialization. If you still encounter permission errors, run:

```bash
sudo chown -R $(whoami) /opt/homebrew/lib/ruby/gems
```

Then reinstall pods:

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Running the Project

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Troubleshooting

### If pod install still fails:

1. Clear CocoaPods cache:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod cache clean --all
```

2. Reinstall pods:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

3. Rebuild the app:
```bash
npm run ios
```

## Environment Setup

Make sure you have:
- Node.js >= 18
- Xcode with Command Line Tools
- Watchman (optional but recommended for macOS)

```bash
# Install Watchman
brew install watchman

# Verify installation
watchman version
```

