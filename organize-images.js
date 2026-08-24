import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\sudha\\.gemini\\antigravity-ide\\brain\\05e7a7b1-23d6-4fb7-bb59-53af89767d8a';
const publicImg = 'c:\\Users\\sudha\\OneDrive\\Desktop\\saree\\shop\\public\\images';

const folders = ['hero', 'sarees', 'models', 'categories', 'bridal', 'craft', 'journal', 'icons'];
folders.forEach(f => {
  const dir = path.join(publicImg, f);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const files = fs.readdirSync(brainDir);

function copyImage(prefix, targetRelPath) {
  const match = files.find(file => file.startsWith(prefix) && file.endsWith('.jpg'));
  if (match) {
    const src = path.join(brainDir, match);
    const destJpg = path.join(publicImg, targetRelPath);
    const destPng = destJpg.replace(/\.jpg$/, '.png');
    fs.copyFileSync(src, destJpg);
    fs.copyFileSync(src, destPng);
    console.log(`Copied ${match} -> ${targetRelPath} (.jpg & .png)`);
  } else {
    console.log(`No match for prefix: ${prefix}`);
  }
}

copyImage('hero_model', 'hero/hero-model.png');
copyImage('saree_01', 'sarees/saree-01.png');
copyImage('saree_02', 'sarees/saree-02.png');
copyImage('saree_03', 'sarees/saree-03.png');
copyImage('saree_04', 'sarees/saree-04.png');
copyImage('saree_01', 'sarees/featured-midnight-silk.png');

copyImage('category_silk', 'categories/category-silk.png');
copyImage('category_heritage', 'categories/category-heritage.png');
copyImage('category_bridal', 'categories/category-bridal.png');
copyImage('category_contemporary', 'categories/category-contemporary.png');

copyImage('editorial_model', 'models/editorial-model.png');

copyImage('craft_thread', 'craft/craft-thread.png');
copyImage('craft_weaving', 'craft/craft-weaving.png');
copyImage('craft_drape', 'craft/craft-drape.png');

copyImage('bridal_01', 'bridal/bridal-01.png');
copyImage('saree_02', 'bridal/bridal-02.png');
copyImage('category_bridal', 'bridal/bridal-03.png');

copyImage('category_silk', 'journal/journal-01.png');
copyImage('craft_weaving', 'journal/journal-02.png');
copyImage('category_contemporary', 'journal/journal-03.png');
copyImage('category_heritage', 'journal/journal-04.png');

console.log('Images organized successfully!');
