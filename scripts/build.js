
// Copy client to server/public for deployment (PWA-ready)
import fs from 'fs';
import path from 'path';

const src = path.resolve('client');
const dest = path.resolve('server', 'public');

function copyRecursiveSync(srcPath, destPath) {
  if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
  for (const entry of fs.readdirSync(srcPath, { withFileTypes: true })) {
    const from = path.join(srcPath, entry.name);
    const to = path.join(destPath, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}
copyRecursiveSync(src, dest);
console.log('✅ Client copied to server/public');
