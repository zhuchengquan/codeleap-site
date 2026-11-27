import { shell, sec, faqItem } from './layout.mjs';

const tool = `
<div class="finder" id="finder">
  <div class="q" data-k="grade">
    <b><i>01</i>孩子现在几年级？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="g12">小学 1–2 年级</button>
      <button class="opt" type="button" data-v="g34">小学 3–4 年级</button>
      <button class="opt" type="button" data-v="g56">小学 5–6 年级</button>
      <button class="opt" type="button" data-v="g7">初一及以上</button>
    </div>
  </div>
  <div class="q" data-k="exp">
    <b><i>02</i>之前接触过编程吗？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="none">完全没接触</button>
      <button class="opt" type="button" data-v="scr">玩过 Scratch 或类似图形化</button>
      <button class="opt" type="button" data-v="lang">学过一段 Python 或 C++</button>
    </div>
  </div>
  <div class="q" data-k="solo">
    <b><i>03</i>遇到不会做的题，孩子通常？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="try">自己先试一会儿，试不出来才求助</button>
      <button class="opt" type="button" data-v="ask">马上问人，但愿意自己动手改</button>
      <button class="opt" type="button" data-v="give">直接说不会，等人来帮</button>
    </div>
  </div>
  <div class="q" data-k="math">
    <b><i>04</i>数学大概学到哪？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="frac">分数、小数与简单方程都会</button>
      <button class="opt" type="button" data-v="int">整数四则运算没问题</button>
      <button class="opt" type="button" data-v="none">除法还不熟</button>
    </div>
  </div>
  <div class="red" id="res" hidden></div>
  <p class="hint" id="hint">选完四题，这里会给出建议起点。结果只作参考，不替代入学测评。</p>
</div>
<script src="stage-finder.js"></script>`;

const rules = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>题目</th><th>选项与得分</th><th>为什么这样定</th></tr></thead>
<tbody>
<tr><th>年级</th><td>1–2 年级 0 / 3–4 年级 1 / 5–6 年级 2 / 初一以上 3</td><td>年级反映抽象能力与课业余量，不是智力</td></tr>
<tr><th>编程经验</th><td>没接触 0 / 图形化 1 / Python 或 C++ 2（乘 1.5 倍权重）</td><td>经验决定起点能否跳过基础模块，权重最高</td></tr>
<tr><th>独立动手</th><td>自己先试 1 / 问人但肯改 0.5 / 等人帮 0</td><td>编程是「自己试出来」的，这一项比聪明更重要</td></tr>
<tr><th>数学进度</th><td>分数与方程 1 / 整数四则 0.5 / 除法不熟 0</td><td>L3 起要用小数、取整与坐标，L4 要用复杂度估算</td></tr>
</tbody></table></div>
<div class="note"><b>总分与档位：</b>满分 8 分。≤ 2 分 → L1；2.5–4 分 → L2；4.5–6 分 → L3；6.5 分以上 → L4。这套规则是公开的，你可以自己算一遍，看和你预期差在哪。</div>`;

const usage = `
<div class="tiles g2">
  <div class="tile"><i>L1</i><h4>从图形化开始，先建立「顺序」</h4><p>目标是能独立做出三个小作品、讲清先做什么再做什么。这一档不建议加速，先把「自己动手」的习惯养出来。</p></div>
  <div class="tile"><i>L2</i><h4>图形化 + 硬件，补「变量」这一关</h4><p>硬件能让抽象概念看得见，但真正的分水岭是变量与克隆。入学前会补测这两项。</p></div>
  <div class="tile"><i>L3</i><h4>直接进 Python，但要过结构关</h4><p>能写一段不等于能拆几块。前 8 课时会重点看「能不能把需求拆成函数」，拆不动就先补。</p></div>
  <div class="tile"><i>L4</i><h4>进 C++ 与算法，先确认数学底</h4><p>分数、方程、复杂度估算要能跟上。数学没到位的，先补 4 次数学专题再进算法模块。</p></div>
</div>
<div class="note"><b>不管落在哪一档，都要做一次入学测评：</b>这份问卷只回答「大概从哪开始」，测评回答的是「现在具体缺哪两项」。前者是方向，后者是处方。</div>`;

const noStart = `
<div class="check">
  <div class="c"><i class="x">×</i><span><b>还不满 6 岁</b>：手部精细动作与持续注意力都还没到位。可以先来玩两次体验课，不建议正式开课。</span></div>
  <div class="c"><i class="x">×</i><span><b>完全没接触过、且遇到难题只会等人帮</b>：先上一次「自己试 15 分钟」的体验课再决定。我们不建议用上课替代「愿意自己动手」这件事。</span></div>
  <div class="c"><i class="x">×</i><span><b>目标直接冲 CSP-J、但除法还不熟</b>：先把数学补到分数与简单方程，否则算法课会变成背模板。</span></div>
  <div class="c"><i>✓</i><span><b>更常见的正确做法</b>：先测评定起点 → 按阶段打基础 → 学期末冲一次考级 → 有余力再进竞赛。</span></div>
</div>`;

const body =
  sec({
    kicker: "四道题",
    h2: "先定起点，再谈报哪个班",
    intro: "家长最常问「我孩子该从哪一级开始」。与其按年龄猜，不如按四个能被观察的事实算一遍。",
    content: tool,
  }) +
  sec({
    kicker: "规则",
    h2: "分数怎么算，全部公开",
    intro: "不搞黑箱。你可以自己算一遍，也可以拿它和我们的测评结果对照。",
    content: rules,
  }) +
  sec({
    kicker: "结果怎么用",
    h2: "四档结果，各自的第一步",
    intro: "同一个分数在不同阶段含义不同。下面是每一档真正该做的第一件事。",
    content: usage,
  }) +
  sec({
    kicker: "例外",
    h2: "三种情况，我们不建议现在开始",
    intro: "招生不是越多越好。有些孩子现在来，学得慢、伤兴趣，过半年反而更快。",
    content: noStart,
  });

const faq = [
  faqItem("这个结果准吗？", "它只能给出方向，不能给出处方。四个事实都是可观察的，所以方向通常不会太偏；但「具体缺哪两项能力」必须靠 30 分钟的入学测评，问卷看不出来。"),
  faqItem("为什么不直接按年龄推荐？", "同一年龄的孩子，独立动手能力可以差两年。我们见过三年级能自己拆函数的孩子，也见过六年级一遇卡点就等人的孩子，按年龄一刀切一定会错一半。"),
  faqItem("算出来和我预期不一样，听谁的？", "先听测评。如果你算出来是 L3、预期是 L2，多半是「经验」这一项给高了——玩过 Scratch 不等于建立过变量概念，测评会当场验证。"),
  faqItem("一定要做测评才能报名吗？", "要。测评不收费、30 分钟，目的是定起点而不是筛选。定错起点的代价是几个月的时间和兴趣，比一次测评贵得多。"),
].join("\n");

const cta = {
  title: "算完还是拿不准？",
  text: "约一次 30 分钟的入学测评：三个环节、当场出结论，给「建议起点 + 需要补的两项能力」，不推销课包。",
  btn: "预约入学测评",
  href: "index.html#trial",
};

export const html = shell({
  file: "stage-finder.html",
  title: "四道题定起点 · 码跃少儿编程",
  desc: "四道选择题估算孩子的编程起点：年级、编程经验、独立动手能力、数学进度，公开评分规则，给出 L1–L4 建议与第一步动作，不替代入学测评。",
  tagline: "选阶段",
  eyebrow: "四道题定起点",
  h1: "别按年龄猜，<br>按四个<em>能被观察的事实</em>算",
  lead: "年级、经验、遇到难题的反应、数学进度——这四件事比「几岁」更能决定孩子该从哪一级开始。选完四题，给你一个起点和下一步动作。",
  stats: `<div class="n"><b>4</b><span>道单选题，2 分钟</span></div><div class="n"><b>8</b><span>分制，规则全公开</span></div><div class="n"><b>4</b><span>档起点 L1–L4</span></div><div class="n"><b>0</b><span>推销，结果可自己复算</span></div>`,
  body,
  cta,
  faq,
});
