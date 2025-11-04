const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Purpose of this JS file:
// 1. Find all unused files under src/assets.
// Usage -> run "node checkUnusedAssets.js" in the terminal.


// Set the correct path for the assets directory
const assetsDir = path.join(__dirname, 'src/assets');
const srcDir = path.join(__dirname, 'src');

console.log('Assets directory:', assetsDir);
console.log('Source directory:', srcDir);

// Check if the assets folder exists
if (!fs.existsSync(assetsDir)) {
  console.log('Error: Assets directory not found:', assetsDir);
  process.exit(1);
}

// Find all files in the assets folder
const assetFiles = glob.sync(path.join(assetsDir, '**/*.*')).map(file => path.relative(__dirname, file));

if (assetFiles.length === 0) {
  console.log('No asset files found. Check folder and file permissions.');
  console.log('Files in assets folder:', fs.readdirSync(assetsDir, { withFileTypes: true }).map(dirent => dirent.name));
} else {
  console.log('Scanned asset files:', assetFiles);
}

// Find all files in the src folder
const srcFiles = glob.sync(path.join(srcDir, '**/*.{js,jsx,ts,tsx}'));

console.log('Scanned source files:', srcFiles);

const unusedAssets = [];

assetFiles.forEach(asset => {
  let isUsed = false;
  for (let file of srcFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(path.basename(asset))) {
      isUsed = true;
      break;
    }
  }
  if (!isUsed) {
    unusedAssets.push(asset);
  }
});

console.log('Unused asset files:');
if (unusedAssets.length === 0) {
  console.log('All assets are in use.');
} else {
  unusedAssets.forEach(asset => console.log(asset));
}
