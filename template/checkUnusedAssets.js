const fs = require('fs');
const path = require('path');
const glob = require('glob');

//Bu js dosyasının amacı:
//1. src/assets dizinindeki tüm kullanılmayan dosyaları bulmaktır.
//kullanmak için -> "node checkUnusedAssets.js"" komutunu terminalde çalıştırın.


// assets dizininin doğru yolunu belirleyin
const assetsDir = path.join(__dirname, 'src/assets');
const srcDir = path.join(__dirname, 'src');

console.log('Assets dizini:', assetsDir);
console.log('Kaynak dizini:', srcDir);

// Assets klasörünün varlığını kontrol et
if (!fs.existsSync(assetsDir)) {
  console.log('Hata: Assets dizini bulunamadı:', assetsDir);
  process.exit(1);
}

// assets klasöründeki tüm dosyaları bul
const assetFiles = glob.sync(path.join(assetsDir, '**/*.*')).map(file => path.relative(__dirname, file));

if (assetFiles.length === 0) {
  console.log('Asset dosyaları bulunamadı. Klasör ve dosya izinlerini kontrol edin.');
  console.log('Assets klasöründeki dosyalar:', fs.readdirSync(assetsDir, { withFileTypes: true }).map(dirent => dirent.name));
} else {
  console.log('Taranan asset dosyaları:', assetFiles);
}

// src klasöründeki tüm dosyaları bul
const srcFiles = glob.sync(path.join(srcDir, '**/*.{js,jsx,ts,tsx}'));

console.log('Taranan kaynak dosyaları:', srcFiles);

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

console.log('Kullanılmayan asset dosyaları:');
if (unusedAssets.length === 0) {
  console.log('Hepsi kullanılıyor.');
} else {
  unusedAssets.forEach(asset => console.log(asset));
}
