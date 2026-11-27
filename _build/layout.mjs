const FONT = 'https://miaoda.feishu.cn/fonts/css2?family=Nunito:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap';

const CSS = `
:root{--bg:#f6f9fe;--bg-2:#eef4fd;--ink:#16213a;--muted:#56657e;--faint:#8695ab;--primary:#2b7bf3;--primary-soft:rgba(43,123,243,.10);--accent:#f0663a;--accent-soft:rgba(240,102,58,.10);--ok:#12a06a;--ok-soft:rgba(18,160,106,.12);--glass:rgba(255,255,255,.72);--glass-2:rgba(255,255,255,.94);--glass-head:rgba(255,255,255,.88);--stroke:rgba(27,52,92,.10);--stroke-2:rgba(27,52,92,.16);--shadow:0 12px 32px rgba(26,48,84,.07);--radius:18px;--radius-sm:13px;--font-display:"Nunito","Noto Sans SC",sans-serif;--font-body:"Nunito","Noto Sans SC",sans-serif;--font-mono:"JetBrains Mono","Noto Sans SC",monospace}
[data-theme="dark"]{--bg:#0d1524;--bg-2:#101a2c;--ink:#eef3fb;--muted:#a7b6cc;--faint:#7d8ea8;--primary:#5a9dff;--primary-soft:rgba(90,157,255,.14);--accent:#ff8660;--accent-soft:rgba(255,134,96,.12);--ok:#4dd49b;--ok-soft:rgba(77,212,155,.15);--glass:rgba(255,255,255,.06);--glass-2:rgba(255,255,255,.10);--glass-head:rgba(18,28,46,.88);--stroke:rgba(255,255,255,.10);--stroke-2:rgba(255,255,255,.18);--shadow:0 16px 40px rgba(0,0,0,.35)}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(180deg,var(--bg) 0%,var(--bg-2) 100%);color:var(--ink);font-family:var(--font-body);font-size:15px;line-height:1.78;letter-spacing:.01em;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--font-display);letter-spacing:.01em}
a{color:inherit;text-decoration:none}
.bar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;padding:11px 18px;background:var(--glass-head);border-bottom:1px solid var(--stroke);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);flex-wrap:wrap}
.nav{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.nav::-webkit-scrollbar{display:none}
@media(max-width:820px){.nav{order:9;flex:1 1 100%;padding:2px 0 0}}
.brand{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15.5px}
.brand .m{display:grid;place-items:center;width:29px;height:29px;border-radius:9px;background:var(--primary);color:#fff;font-size:14px;font-weight:700}
.tagline{font-size:12.5px;padding:4px 11px;border-radius:999px;border:1px solid var(--stroke-2);background:var(--glass);color:var(--muted)}
.sp{flex:1}
.icon-btn{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;border:1px solid var(--stroke-2);background:var(--glass);color:var(--muted);cursor:pointer}
.btn{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 16px;border:1px solid var(--stroke-2);border-radius:999px;background:var(--glass);color:var(--ink);font-family:inherit;font-size:13.5px;white-space:nowrap}
.btn.active{border-color:var(--primary);color:var(--primary);background:var(--primary-soft);font-weight:600}
.btn-primary{display:inline-flex;align-items:center;gap:7px;height:44px;padding:0 22px;border-radius:999px;background:var(--accent);color:#fff;font-size:14.5px;box-shadow:0 10px 24px rgba(240,102,58,.26);border:0;cursor:pointer;font-family:inherit}
.wrap{max-width:1020px;margin:0 auto;padding:32px 20px 60px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;letter-spacing:.05em;color:var(--primary)}
.eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--primary);font-style:normal}
.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}
@media(max-width:880px){.hero{grid-template-columns:1fr;gap:24px}}
.hero.solo{grid-template-columns:1fr}
.hero.solo .lead{max-width:760px}
.hero h1{margin:11px 0 13px;font-size:clamp(26px,3.8vw,37px);font-weight:800;line-height:1.3}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero .lead{margin:0;font-size:14.5px;line-height:1.9;color:var(--muted);max-width:520px}
.nums{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:22px}
@media(max-width:640px){.nums{grid-template-columns:repeat(2,1fr)}}
.n{padding:13px 15px;border-radius:var(--radius-sm);background:var(--glass-2);border:1px solid var(--stroke)}
.n b{display:block;font-family:var(--font-display);font-size:21px;font-weight:800;color:var(--accent);line-height:1.15;font-variant-numeric:tabular-nums}
.n span{display:block;font-size:11.5px;color:var(--muted);margin-top:4px;line-height:1.6}
.shot{border-radius:var(--radius);overflow:hidden;border:1px solid var(--stroke);box-shadow:var(--shadow);margin:0}
.shot img{display:block;width:100%;height:auto}
.sec{margin-top:44px}
.sec-head span{display:block;font-size:12px;letter-spacing:.06em;color:var(--faint);margin-bottom:6px}
.sec-head h2{margin:0;font-size:clamp(20px,2.6vw,26px);font-weight:700;line-height:1.35}
.sec-head p{margin:8px 0 0;font-size:13.5px;line-height:1.8;color:var(--muted);max-width:660px}
.box{padding:22px 24px;border-radius:var(--radius);background:var(--glass-2);border:1px solid var(--stroke);box-shadow:var(--shadow)}
.box h4{margin:0 0 10px;font-size:14.5px;font-weight:700}
.box ul{margin:0;padding-left:18px;display:grid;gap:8px}
.box li{font-size:13px;line-height:1.85;color:var(--muted)}
.box li b{color:var(--ink);font-weight:600}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}
@media(max-width:800px){.two{grid-template-columns:1fr}}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
@media(max-width:860px){.three{grid-template-columns:1fr}}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
.tiles.g2{grid-template-columns:repeat(2,1fr)}
@media(max-width:900px){.tiles{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.tiles.g2{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.tiles{grid-template-columns:1fr}}
@media(max-width:600px){.tiles.g2{grid-template-columns:1fr}}
.tile{padding:19px 21px;border-radius:var(--radius-sm);background:var(--glass-2);border:1px solid var(--stroke)}
.tile i{font-family:var(--font-mono);font-size:11.5px;font-style:normal;color:var(--accent);letter-spacing:.02em}
.tile h4{margin:8px 0 6px;font-size:15px;font-weight:700;line-height:1.4}
.tile p{margin:0;font-size:13px;line-height:1.82;color:var(--muted)}
.matrix{width:100%;border-collapse:collapse;margin-top:20px;font-size:13px;background:var(--glass-2);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
.matrix th,.matrix td{border-bottom:1px solid var(--stroke);padding:11px 13px;text-align:left;vertical-align:top;line-height:1.7}
.matrix thead th{background:var(--primary-soft);color:var(--ink);font-weight:600;font-size:12.5px;white-space:nowrap}
.matrix tbody th{background:var(--bg-2);font-weight:600;white-space:nowrap;color:var(--ink)}
.matrix td{color:var(--muted)}
.matrix td b{color:var(--ink);font-weight:600}
.matrix tr:last-child td,.matrix tr:last-child th{border-bottom:0}
.table-wrap{overflow-x:auto;margin-top:20px;-webkit-overflow-scrolling:touch;border-radius:var(--radius);border:1px solid var(--stroke)}
.table-wrap .matrix{margin-top:0;box-shadow:none;border-radius:0;min-width:720px}
.timeline{margin-top:22px;display:grid;gap:0}
.tl{display:grid;grid-template-columns:92px 26px 1fr;gap:0;align-items:start}
.tl .when{padding:14px 0 0;font-family:var(--font-mono);font-size:12px;color:var(--faint);text-align:right;padding-right:12px}
.tl .rail{position:relative;display:flex;justify-content:center;padding-top:18px}
.tl .rail::before{content:"";position:absolute;top:0;bottom:-6px;width:1px;background:var(--stroke-2)}
.tl .dot{width:9px;height:9px;border-radius:50%;background:var(--primary);position:relative;z-index:1}
.tl:last-child .rail::before{bottom:auto;height:18px}
.tl .what{padding:10px 0 18px 14px}
.tl .what h4{margin:0 0 4px;font-size:14.5px;font-weight:700}
.tl .what p{margin:0;font-size:13px;line-height:1.82;color:var(--muted)}
.steps{display:grid;gap:10px;margin-top:20px}
.stp{display:grid;grid-template-columns:34px 1fr;gap:14px;padding:16px 18px;border-radius:var(--radius-sm);background:var(--glass-2);border:1px solid var(--stroke)}
.stp .k{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--primary-soft);color:var(--primary);font-family:var(--font-mono);font-size:12px}
.stp h4{margin:0 0 5px;font-size:14.5px;font-weight:700}
.stp p{margin:0;font-size:13px;line-height:1.85;color:var(--muted)}
.stp p b{color:var(--ink);font-weight:600}
.check{display:grid;gap:7px;margin-top:16px}
.check .c{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:13px;line-height:1.8;color:var(--muted)}
.check .c i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--ok-soft);color:var(--ok);font-style:normal;font-size:12px}
.check .c i.x{background:var(--accent-soft);color:var(--accent)}
.kv{display:grid;grid-template-columns:132px 1fr;gap:8px 14px;margin-top:16px;font-size:13px;line-height:1.8}
.kv k{color:var(--faint);font-size:12.5px}
.kv v{color:var(--muted)}
.kv v b{color:var(--ink);font-weight:600}
.note{margin-top:18px;padding:16px 20px;border-radius:var(--radius-sm);background:var(--accent-soft);border-left:3px solid var(--accent);font-size:13.5px;line-height:1.9;color:var(--muted)}
.note b{color:var(--ink)}
.faq{display:grid;gap:8px;margin-top:20px}
.faq details{border-radius:var(--radius-sm);border:1px solid var(--stroke);background:var(--glass-2);overflow:hidden}
.faq summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;cursor:pointer;list-style:none;font-size:14px;font-weight:500}
.faq summary::-webkit-details-marker{display:none}
.faq summary svg{width:15px;height:15px;color:var(--faint);flex:none}
.faq .fb{padding:0 18px 16px;font-size:13.5px;line-height:1.88;color:var(--muted)}
.cta{margin-top:34px;display:flex;align-items:center;flex-wrap:wrap;gap:16px;padding:24px 26px;border-radius:var(--radius);background:var(--accent-soft);border:1px solid rgba(240,102,58,.22)}
.cta .tt{flex:1;min-width:240px}
.cta b{display:block;font-size:15.5px;font-weight:700}
.cta span{display:block;font-size:12.5px;color:var(--muted);margin-top:3px;line-height:1.7}
.foot{max-width:1020px;margin:0 auto;padding:0 20px 52px;font-size:12px;line-height:1.9;color:var(--faint)}
.foot a{color:var(--primary)}
.crumbs{font-size:12px;color:var(--faint);margin-bottom:10px}
.crumbs a{color:var(--primary)}
`;

const THEME_SCRIPT = `<script>
(function () {
  var KEY = "codeleap-theme";
  var root = document.documentElement;
  try { var saved = localStorage.getItem(KEY); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  var btn = document.getElementById("themeBtn");
  if (btn) btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });
  document.querySelectorAll(".faq summary").forEach(function (s) {
    s.addEventListener("click", function () {
      var d = s.parentElement;
      if (!d.open) document.querySelectorAll(".faq details[open]").forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
</script>`;

const NAV = [
  ["curriculum-map.html", "课程 × 考级"],
  ["platform.html", "平台与课堂"],
  ["assessment.html", "测评体系"],
  ["studio.html", "作品"],
  ["hardware.html", "教具"],
  ["operations.html", "校区运营"],
];

export function cnQuotes(html) {
  if (!html) return html;
  return html.replace(/(<[^>]*>)|([^<]+)/g, (all, tag, text) => {
    if (tag) return tag;
    let open = true;
    return text.replace(/"/g, () => {
      const ch = open ? "「" : "」";
      open = !open;
      return ch;
    });
  });
}

export function shell({ file, title, desc, tagline, eyebrow, h1, lead, stats, body, cta, faq, aside }) {
  const navLinks = NAV.map(([h, t]) => `<a class="btn${h === file ? " active" : ""}" href="${h}"${h === file ? ' aria-current="page"' : ""}>${t}</a>`).join("\n  ");
  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://codeleap.example/${file}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="码跃少儿编程 CodeLeap">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://codeleap.example/${file}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%232b7bf3'/%3E%3Ctext x='16' y='22' font-size='16' font-family='sans-serif' fill='%23fff' text-anchor='middle'%3E%E7%A0%81%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://miaoda.feishu.cn" crossorigin>
<link rel="stylesheet" href="${FONT}">
<style>${CSS}</style>
</head>
<body>

<div class="bar">
  <a class="brand" href="index.html"><span class="m">码</span>码跃少儿编程</a>
  <span class="tagline">${tagline}</span>
  <div class="sp"></div>
  <nav class="nav">
  ${navLinks}
  </nav>
  <button class="icon-btn" id="themeBtn" type="button" aria-label="切换明暗模式">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>
  </button>
  <a class="btn-primary" href="index.html#trial" style="height:38px;padding:0 16px;font-size:13.5px">预约试听</a>
</div>

<div class="wrap">
  <div class="crumbs"><a href="index.html">首页</a> / ${eyebrow}</div>
  <section class="hero${aside ? "" : " solo"}">
    <div>
      <span class="eyebrow"><i></i>${eyebrow}</span>
      <h1>${cnQuotes(h1)}</h1>
      <p class="lead">${cnQuotes(lead)}</p>
      ${stats ? `<div class="nums">${cnQuotes(stats)}</div>` : ""}
    </div>
    ${aside ? `<div>${aside}</div>` : ""}
  </section>

${cnQuotes(body)}

${faq ? `<section class="sec"><div class="sec-head"><span>FAQ</span><h2>家长最常问的四个问题</h2></div><div class="faq">${cnQuotes(faq)}</div></section>` : ""}

  <section class="cta">
    <div class="tt"><b>${cnQuotes(cta.title)}</b><span>${cnQuotes(cta.text)}</span></div>
    <a class="btn-primary" href="index.html#trial">${cta.btn}</a>
  </section>

</div>

<div class="foot">
  <p><b>码跃少儿编程 CodeLeap</b> · 合肥 · 高新 / 政务 / 滨湖三校区 · 400-860-2026</p>
  <p><a href="index.html">官网首页</a> · <a href="curriculum-map.html">课程 × 考级</a> · <a href="platform.html">平台与课堂</a> · <a href="assessment.html">测评体系</a> · <a href="studio.html">作品与创作</a> · <a href="hardware.html">教具与硬件</a> · <a href="operations.html">校区运营</a> · <a href="blog.html">知识库</a> · <a href="team.html">师资与教研</a> · <a href="campus.html">校区与到店</a> · <a href="enroll.html">在线报名</a></p>
  <p>内容示例站点：页面中的机构数据、师资、价格与流程均为演示内容，正式上线前需替换为真实信息与合同条款。</p>
</div>

${THEME_SCRIPT}
</body>
</html>`;
}

export function faqItem(q, a) {
  return `<details><summary>${q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary><div class="fb">${a}</div></details>`;
}

export function sec({ kicker, h2, intro, content }) {
  return `<section class="sec"><div class="sec-head"><span>${kicker}</span><h2>${h2}</h2>${intro ? `<p>${intro}</p>` : ""}</div>${content}</section>`;
}
