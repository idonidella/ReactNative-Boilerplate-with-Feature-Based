#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const prompt = async (question) => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(question, (answer) => {
      readline.close();
      resolve(answer.toLowerCase().trim());
    });
  });
};

const selectYesNo = async (title) => {
  const answer = await prompt(`${colors.cyan}→${colors.reset} ${title} ${colors.dim}(y/n):${colors.reset} `);
  return answer === 'y' || answer === 'yes';
};

const installPackages = async () => {
  const projectPath = process.cwd();
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}✦ SIRIUS AI TECH${colors.reset}${colors.cyan} ✦${colors.reset}`);
  console.log(`${colors.cyan}React Native Boilerplate Setup${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);

  console.log(`${colors.bright}${colors.magenta}⚙ Kurulum Seçeneklerini Yapılandırın:${colors.reset}\n`);

  const navigation = await selectYesNo('📱 React Navigation');
  const httpClient = await selectYesNo('🌐 Axios');
  const animation = await selectYesNo('✨ React Native Reanimated');

  console.log(`\n${colors.bright}${colors.yellow}⏳ Paketler yükleniyor...${colors.reset}\n`);

  const dependenciesToAdd = {};

  if (navigation) {
    dependenciesToAdd['@react-navigation/native'] = '^6.1.0';
    dependenciesToAdd['@react-navigation/bottom-tabs'] = '^6.5.0';
    dependenciesToAdd['@react-navigation/native-stack'] = '^6.11.0';
    dependenciesToAdd['react-native-screens'] = '^3.29.0';
    dependenciesToAdd['react-native-safe-area-context'] = '^4.9.0';
    dependenciesToAdd['react-native-gesture-handler'] = '^2.16.0';
  }

  if (httpClient) {
    dependenciesToAdd['axios'] = '^1.7.0';
  }

  if (animation) {
    dependenciesToAdd['react-native-reanimated'] = '^3.8.1';
  }

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...dependenciesToAdd,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  try {
    execSync('npm install', { stdio: 'inherit', cwd: projectPath });

    console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
    console.log(`${colors.bright}${colors.green}✓ Kurulum Tamamlandı!${colors.reset}`);
    console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);

    console.log(`${colors.bright}${colors.magenta}📦 Yüklenen Paketler:${colors.reset}`);
    if (navigation) {
      console.log(`${colors.green}  ✓ React Navigation${colors.reset}`);
    }
    if (httpClient) {
      console.log(`${colors.green}  ✓ Axios${colors.reset}`);
    }
    if (animation) {
      console.log(`${colors.green}  ✓ React Native Reanimated${colors.reset}`);
    }

    console.log(`\n${colors.bright}${colors.cyan}🚀 Başlamaya Hazırsınız!${colors.reset}`);
    console.log(`${colors.dim}Aşağıdaki komutları çalıştırın:${colors.reset}\n`);
    console.log(`${colors.bright}${colors.blue}npm start${colors.reset}       ${colors.dim}→ Geliştirme sunucusu başlatın${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}npm run ios${colors.reset}     ${colors.dim}→ iOS simülatöründe çalıştırın${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}npm run android${colors.reset} ${colors.dim}→ Android emülatöründe çalıştırın${colors.reset}`);
    console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}${colors.bright}✗ Hata oluştu:${colors.reset} ${error.message}`);
    process.exit(1);
  }
};

installPackages().catch((error) => {
  console.error('Hata:', error);
  process.exit(1);
});

