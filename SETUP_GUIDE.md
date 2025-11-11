# Setup Guide for React Native Boilerplate

## If You Encounter CocoaPods Permission Errors

If you see errors like:
```
There was an error while trying to write to `/opt/homebrew/lib/ruby/gems/...`
Bundler::PermissionError
```

### Solution:

Run the following command to fix CocoaPods permissions:

```bash
sudo chown -R $(whoami) /opt/homebrew/lib/ruby/gems
```

Then run `pod install` again:

```bash
cd ios
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

