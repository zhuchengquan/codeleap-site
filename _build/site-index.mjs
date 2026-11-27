import fs from 'node:fs';
import path from 'node:path';

export const ROOT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';

// 生成器产出的九页：章节来自 sec-head，锚点在页面运行时由脚本赋为 s1..N
export const SPECIAL = [
  ['platform.html', '平台与课堂'],
  ['curriculum-map.html', '课程 × 考级'],
  ['assessment.html', '测评体系'],
  ['studio.html', '作品与创作'],
  ['hardware.html', '教具与硬件'],
  ['operations.html', '校区运营'],
  ['teaching.html', '备课与授课'],
  ['admissions.html', '招生与学员'],
  ['family.html', '家校沟通'],
  ['stage-finder.html', '四道题定起点'],
  ['plan-calculator.html', '课时与费用粗算'],
];

// 手写页：章节取 h2，锚点由 patch-all 写入 ps1..N
export const OTHER = [
  ['blog.html', '知识库'],
  ['blog-when-to-start.html', '几岁开始学'],
  ['blog-gesp-1.html', 'GESP 一级备考'],
  ['blog-after-scratch.html', 'Scratch 之后'],
  ['blog-format-choice.html', '班型怎么选'],
  ['blog-competition-path.html', '竞赛路径'],
  ['blog-math.html', '数学与编程'],
  ['blog-trial.html', '试听课看什么'],
  ['camp.html', '假期集训'],
  ['campus.html', '校区与到店'],
  ['course-l1.html', 'L1 启蒙'],
  ['course-l2.html', 'L2 进阶'],
  ['course-l3.html', 'L3 Python'],
  ['course-l4.html', 'L4 C++'],
  ['enroll.html', '在线报名'],
  ['legal.html', '政策与条款'],
  ['parent.html', '家长中心'],
  ['results.html', '学员成果'],
  ['team.html', '师资与教研'],
  ['brochure.html', '招生简章'],
];

const strip = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim();

export function buildIndex({ specialHtml = null } = {}) {
  const out = [];

  for (const [file, name] of SPECIAL) {
    const html = specialHtml && specialHtml[file] ? specialHtml[file] : fs.readFileSync(path.join(ROOT, file), 'utf8');
    const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, name])[1]);
    out.push({ u: file, p: name, k: '总览', t: h1, id: '' });
    const re = /<div class="sec-head"><span>([\s\S]*?)<\/span><h2>([\s\S]*?)<\/h2>/g;
    let m, i = 0;
    while ((m = re.exec(html))) {
      i += 1;
      out.push({ u: file, p: name, k: strip(m[1]), t: strip(m[2]), id: 's' + i });
    }
  }

  // 首页：h2 的 id 由 patch-index 写入
  const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const h1i = strip((idx.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, '首页'])[1]);
  out.push({ u: 'index.html', p: '首页', k: '总览', t: h1i, id: '' });
  const ih = /<h2([^>]*)>([\s\S]*?)<\/h2>/g;
  let im, n = 0;
  while ((im = ih.exec(idx))) {
    n += 1;
    const idm = im[1].match(/id="([^"]+)"/);
    out.push({ u: 'index.html', p: '首页', k: '章节', t: strip(im[2]), id: idm ? idm[1] : 'h' + n });
  }

  // 其它手写页：h2 的 id 由 patch-all 写入 ps1..N
  for (const [file, name] of OTHER) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const h1o = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, name])[1]);
    out.push({ u: file, p: name, k: '总览', t: h1o, id: '' });
    const oh = /<h2([^>]*)>([\s\S]*?)<\/h2>/g;
    let om, k = 0;
    while ((om = oh.exec(html))) {
      k += 1;
      const idm = om[1].match(/id="([^"]+)"/);
      out.push({ u: file, p: name, k: '章节', t: strip(om[2]), id: idm ? idm[1] : 'ps' + k });
    }
  }

  return out;
}
