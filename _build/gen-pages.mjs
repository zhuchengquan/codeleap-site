import fs from 'node:fs';
import path from 'node:path';
import * as p1 from './p1-platform.mjs';
import * as p2 from './p2-curriculum.mjs';
import * as p3 from './p3-assessment.mjs';
import * as p4 from './p4-studio.mjs';
import * as p5 from './p5-hardware.mjs';
import * as p6 from './p6-operations.mjs';

const OUT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';

const pages = [
  ['platform.html', p1.html],
  ['curriculum-map.html', p2.html],
  ['assessment.html', p3.html],
  ['studio.html', p4.html],
  ['hardware.html', p5.html],
  ['operations.html', p6.html],
];

for (const [file, html] of pages) {
  fs.writeFileSync(path.join(OUT, file), html, 'utf8');
  console.log(`${file} ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
}
