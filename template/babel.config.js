module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          theme: './src/theme',
          '@theme': './src/theme',
          assets: './src/assets',
          '@assets': './src/assets',
          components: './src/components',
          '@components': './src/components',
          services: './src/services',
          '@services': './src/services',
          store: './src/store',
          '@store': './src/store',
          utils: './src/utils',
          '@utils': './src/utils',
          hooks: './src/hooks',
          '@hooks': './src/hooks',
          types: './src/types',
          '@types': './src/types',
          locales: './src/locales',
          '@locales': './src/locales',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
