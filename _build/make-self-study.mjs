import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const tpl = fs.readFileSync(path.join(root, 'blog-quit.html'), 'utf8');
const body = fs.readFileSync(path.join(root, '_build/blog-self-study-article.html'), 'utf8').trim();

let out = tpl;

const TITLE = '免费教程那么多，为什么还有人报班';
const DESC = '入门阶段的自学资源确实够用，但反馈、节奏、同伴、信息这四件事免费资源不给。附自学与报班六维对比表、四个断点、不必报班的四种情况，以及五个能当场验证的问题。';

out = out.replace(/<title>[^<]*<\/title>/, `<title>${TITLE} · 码跃少儿编程</title>`);
out = out.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`);
out = out.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://codeleap.example/blog-self-study.html">');
out = out.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${TITLE}">`);
out = out.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${DESC}">`);
out = out.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://codeleap.example/blog-self-study.html">');

const a1 = out.indexOf('<article class="art">');
const a2 = out.indexOf('</article>');
out = out.slice(0, a1) + '<article class="art">\n' + body + '\n  ' + out.slice(a2);

const b1 = out.indexOf('    <div class="box">');
const b2 = out.indexOf('    <div class="box" style="margin-top:12px">');
const toolsBox = `    <div class="box">
      <h4>先自己判断一次</h4>
      <ul>
        <li><a href="stage-finder.html">四道题定起点</a><span class="k">2 分钟 · 不用留电话</span></li>
        <li><a href="level-test.html">八道题水平小测</a><span class="k">建议起点 L1–L4</span></li>
        <li><a href="plan-calculator.html">课时与费用粗算</a><span class="k">按阶段算总账</span></li>
        <li><a href="brochure.html">招生简章</a><span class="k">价格 · 退费 · 校区</span></li>
      </ul>
    </div>
`;
out = out.slice(0, b1) + toolsBox + out.slice(b2);

out = out.replace(
  /<div class="toc">.*?<\/div>/s,
  '<div class="toc"><a href="blog-when-to-start.html">几岁开始学编程合适</a><a href="blog-gesp-1.html">GESP 一级怎么准备</a><a href="blog-after-scratch.html">Scratch 之后学什么</a><a href="blog-format-choice.html">班型怎么选</a><a href="blog-competition-path.html">竞赛路径</a><a href="blog-math.html">数学与编程</a><a href="blog-trial.html">试听课看什么</a><a href="blog-online.html">线上课怎么上</a><a href="blog-quit.html">孩子说不想学了</a><a href="blog-self-study.html">自学还是报班</a><a href="blog.html">全部文章与速答</a></div>'
);

out = out.replace(/<!--ldjson-->[\s\S]*?<\/script>\n?/g, '<!--ldjson-->\n<script type="application/ld+json">{}</script>\n');

fs.writeFileSync(path.join(root, 'blog-self-study.html'), out, 'utf8');
console.log('written blog-self-study.html', Math.round(out.length / 1024) + 'KB');
