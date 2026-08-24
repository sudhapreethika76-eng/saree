import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\sudha\\.gemini\\antigravity-ide\\brain\\05e7a7b1-23d6-4fb7-bb59-53af89767d8a\\.user_uploaded\\media_1787579722335.jpg';

const destinations = [
  'c:\\Users\\sudha\\OneDrive\\Desktop\\saree\\shop\\public\\images\\models\\editorial-model.png',
  'c:\\Users\\sudha\\OneDrive\\Desktop\\saree\\shop\\public\\images\\models\\editorial-model.jpg',
  'c:\\Users\\sudha\\OneDrive\\Desktop\\saree\\shop\\src\\assets\\images\\editorial-model.png',
  'c:\\Users\\sudha\\OneDrive\\Desktop\\saree\\shop\\src\\assets\\images\\editorial-model.jpg'
];

destinations.forEach(dest => {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied uploaded image -> ${dest}`);
});

console.log('Editorial image update successful!');
