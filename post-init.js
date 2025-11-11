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

const fixCocoaPodsPermissions = async () => {
  const os = require('os');
  if (os.platform() === 'darwin') {
    try {
      console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
      console.log(`${colors.bright}${colors.yellow}🔐 System Authentication Required${colors.reset}`);
      console.log(`${colors.dim}Your password is needed to configure CocoaPods permissions${colors.reset}`);
      console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
      
      execSync('sudo chown -R $(whoami) /opt/homebrew/lib/ruby/gems', { stdio: 'inherit' });
      
      console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
      console.log(`${colors.green}✓ CocoaPods configuration complete!${colors.reset}`);
      console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
    } catch (error) {
      console.log(`${colors.dim}ℹ CocoaPods setup can be configured manually later${colors.reset}\n`);
    }
  }
};

const installPackages = async () => {
  const projectPath = process.cwd();
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}✦ SIRIUS AI TECH${colors.reset}${colors.cyan} ✦${colors.reset}`);
  console.log(`${colors.cyan}React Native Boilerplate Setup${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);

  const os = require('os');
  if (os.platform() === 'darwin') {
    console.log(`${colors.bright}${colors.yellow}🔧 Preparing Xcode compatibility...${colors.reset}`);
    try {
      execSync('sudo gem install xcodeproj --no-document', { stdio: 'pipe' });
      console.log(`${colors.green}✓ Xcodeproj ready${colors.reset}\n`);
    } catch (e) {
      console.log(`${colors.dim}ℹ Xcodeproj preparation skipped${colors.reset}\n`);
    }
  }

  console.log(`${colors.bright}${colors.magenta}⚙ Configure Setup Options:${colors.reset}\n`);

  const navigation = await selectYesNo('📱 Do you want to install React Navigation?');
  const httpClient = await selectYesNo('🌐 Do you want to install Axios?');
  const animation = await selectYesNo('✨ Do you want to install React Native Linear Gradient?');

  console.log(`\n${colors.bright}${colors.yellow}⏳ Installing packages...${colors.reset}\n`);

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
    dependenciesToAdd['react-native-linear-gradient'] = '^2.8.3';
  }

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...dependenciesToAdd,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  try {
    execSync('npm install', { stdio: 'inherit', cwd: projectPath });

    await fixCocoaPodsPermissions();

    console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
    console.log(`${colors.bright}${colors.green}✓ Setup Complete!${colors.reset}`);
    console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);

    console.log(`${colors.bright}${colors.magenta}📦 Installed Packages:${colors.reset}`);
    if (navigation) {
      console.log(`${colors.green}  ✓ React Navigation${colors.reset}`);
    }
    if (httpClient) {
      console.log(`${colors.green}  ✓ Axios${colors.reset}`);
    }
    if (animation) {
      console.log(`${colors.green}  ✓ React Native Linear Gradient${colors.reset}`);
    }

    console.log(`\n${colors.bright}${colors.cyan}🚀 You're All Set!${colors.reset}`);
    console.log(`${colors.dim}Run these commands to get started:${colors.reset}\n`);
    console.log(`${colors.bright}${colors.blue}npm start${colors.reset}       ${colors.dim}→ Start the development server${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}npm run ios${colors.reset}     ${colors.dim}→ Run on iOS simulator${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}npm run android${colors.reset} ${colors.dim}→ Run on Android emulator${colors.reset}`);
    console.log(`\n${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}${colors.bright}✗ Error occurred:${colors.reset} ${error.message}`);
    process.exit(1);
  }
};

installPackages().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

