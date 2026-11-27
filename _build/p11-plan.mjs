import { shell, sec, faqItem } from './layout.mjs';

const tool = `
<div class="finder" id="calc">
  <div class="q" data-k="grade">
    <b><i>01</i>孩子现在几年级？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="g12">小学 1–2 年级</button>
      <button class="opt" type="button" data-v="g34">小学 3–4 年级</button>
      <button class="opt" type="button" data-v="g56">小学 5–6 年级</button>
      <button class="opt" type="button" data-v="g7">初一及以上</button>
    </div>
  </div>
  <div class="q" data-k="base">
    <b><i>02</i>编程基础在哪个程度？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="none">完全零基础</button>
      <button class="opt" type="button" data-v="gfx">学过图形化（Scratch 等）</button>
      <button class="opt" type="button" data-v="py">学过一段 Python 或 C++</button>
    </div>
  </div>
  <div class="q" data-k="goal">
    <b><i>03</i>这轮的目标是什么？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="gesp3">考 GESP 3 级</button>
      <button class="opt" type="button" data-v="gesp6">考 GESP 6 级</button>
      <button class="opt" type="button" data-v="cspj">冲 CSP-J 复赛</button>
      <button class="opt" type="button" data-v="csps">冲 CSP-S 复赛</button>
    </div>
  </div>
  <div class="q" data-k="freq">
    <b><i>04</i>每周能上几次课？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="1">每周 1 次（常规）</button>
      <button class="opt" type="button" data-v="2">每周 2 次（周末连上）</button>
    </div>
  </div>
  <div class="red" id="res" hidden></div>
  <p class="hint" id="hint">四项选完，这里给出阶段明细、总课时、预计月数与线下线上两套价格。粗算，不含教材与参赛差旅。</p>
</div>
<script src="plan-calculator.js"></script>`;

const rules = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>当前年级</th><th>零基础</th><th>学过图形化</th><th>学过 Python 或 C++</th></tr></thead>
<tbody>
<tr><th>小学 1–2 年级</th><td>L1</td><td>L1</td><td>L2</td></tr>
<tr><th>小学 3–4 年级</th><td>L1</td><td>L2</td><td>L3</td></tr>
<tr><th>小学 5–6 年级</th><td>L2</td><td>L2</td><td>L3</td></tr>
<tr><th>初一及以上</th><td>L3</td><td>L3</td><td>L4</td></tr>
</tbody></table></div>
<div class="note"><b>起点怎么定：</b>这张表只做粗算。同样是「学过图形化」，有没有真正建立过变量概念差别很大，所以最终起点以四道题精测或入学测评为准。</div>
<div class="table-wrap"><table class="matrix" style="margin-top:16px">
<thead><tr><th>目标</th><th>需要走到</th><th>从 L1 起最少</th><th>这一步在做什么</th></tr></thead>
<tbody>
<tr><th>GESP 3 级</th><td>L2 结束</td><td>2 期 / 96 次</td><td>图形化与基础语法过一遍，能独立写出带循环的小程序</td></tr>
<tr><th>GESP 6 级</th><td>L3 结束</td><td>3 期 / 144 次</td><td>Python 与基础数据结构，能读报错、能改错</td></tr>
<tr><th>CSP-J 复赛</th><td>L4 + 冲刺</td><td>4 期 / 192 次</td><td>C++ 与算法专题，加一轮限时模拟赛训练</td></tr>
<tr><th>CSP-S 复赛</th><td>再提高一年</td><td>5 期 / 240 次</td><td>提高级数学与算法，通常需要完整一年</td></tr>
</tbody></table></div>
<div class="table-wrap"><table class="matrix" style="margin-top:16px">
<thead><tr><th>阶段</th><th>课时</th><th>线下</th><th>线上</th></tr></thead>
<tbody>
<tr><th>L1 图形化启蒙</th><td>48 次 × 90 分钟</td><td>4980 元 / 期</td><td>3980 元 / 期</td></tr>
<tr><th>L2 图形化与硬件</th><td>48 次 × 90 分钟</td><td>4980 元 / 期</td><td>3980 元 / 期</td></tr>
<tr><th>L3 Python 编程</th><td>48 次 × 90 分钟</td><td>4980 元 / 期</td><td>3980 元 / 期</td></tr>
<tr><th>L4 C++ 编程</th><td>48 次 × 120 分钟</td><td>7980 元 / 期</td><td>6480 元 / 期</td></tr>
<tr><th>CSP-J 冲刺</th><td>48 次 × 120 分钟</td><td>7980 元 / 期</td><td>6480 元 / 期</td></tr>
<tr><th>CSP-S 提高</th><td>48 次 × 120 分钟</td><td>7980 元 / 期</td><td>6480 元 / 期</td></tr>
</tbody></table></div>
<div class="note"><b>时长怎么折算：</b>一期固定 48 次课。每周 1 次，约 11 个月走完一期；每周 2 次，约 5.5 个月。总月数 = 期数 × 单期月数，取整显示。价格只算课包，不含教材、考级报名费与异地参赛差旅。</div>`;

const cases = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>组合</th><th>起点</th><th>期数</th><th>每周 1 次</th><th>每周 2 次</th><th>线下合计</th><th>线上合计</th></tr></thead>
<tbody>
<tr><th>零基础 · 小学 1–2 · GESP 3 级</th><td>L1</td><td>2</td><td>约 22 个月</td><td>约 11 个月</td><td>¥9,960</td><td>¥7,960</td></tr>
<tr><th>学过图形化 · 小学 3–4 · CSP-J 复赛</th><td>L2</td><td>4</td><td>约 44 个月</td><td>约 22 个月</td><td>¥25,920</td><td>¥20,880</td></tr>
<tr><th>零基础 · 小学 5–6 · CSP-S 复赛</th><td>L2</td><td>5</td><td>约 55 个月</td><td>约 28 个月</td><td>¥33,900</td><td>¥27,400</td></tr>
</tbody></table></div>
<div class="note"><b>这三行是真实算术，不是宣传数字：</b>期数 = 起点到目标经过的阶段数；线下合计 = 各阶段线下单价相加；线上合计同理。你可以用上面的工具核对任意组合，结果应当一致。</div>`;

const notes = `
<div class="check">
  <div class="c"><i class="x">×</i><span><b>别按最乐观的数字做预算</b>：多数孩子会在某一期上「重复巩固」，实际投入通常比粗算多 1 期左右。把 1 期余量算进去，报名时不会被追加费用打乱计划。</span></div>
  <div class="c"><i class="x">×</i><span><b>跳级省的钱，会以另一种方式花掉</b>：GESP 90 分以上可跨级，但跨掉的模块要用 8 课时衔接补回来。课时表能压缩，地基不能。</span></div>
  <div class="c"><i class="x">×</i><span><b>线上便宜，但低龄不合适</b>：L1–L2 的器材与课堂秩序必须到店，线上只建议 L3 以上、且单程通勤超 45 分钟的家庭。</span></div>
  <div class="c"><i>✓</i><span><b>正确用法是「先定目标，再看预算」</b>：把目标写下来，用工具算一遍，再拿这个数字和校区核对。目标变了，数字跟着变，比凭感觉报名靠谱。</span></div>
</div>`;

const body =
  sec({
    kicker: '课时规划',
    h2: '填四个条件，得一条路径',
    intro: '四项选完即出结果：经过哪几个阶段、每阶段多少钱、总共多久。结果是粗算，口径在下一节全部摊开。',
    content: tool,
  }) +
  sec({
    kicker: '规则',
    h2: '怎么算的，全部公开',
    intro: '三张表：起点怎么定、目标对应到哪一阶段、每期多少钱。你可以自己复算，也可以拿它和报名单对照。',
    content: rules,
  }) +
  sec({
    kicker: '示例',
    h2: '三种常见组合的真实结果',
    intro: '把工具里的三组典型输入摊在这里，方便你直接对照自家情况。',
    content: cases,
  }) +
  sec({
    kicker: '提醒',
    h2: '四个容易被忽略的点',
    intro: '算得准不准，往往取决于这几个假设。',
    content: notes,
  });

const faq = [
  faqItem('为什么按「期」算，不按课时算？', '一期 48 次课对应一个完整阶段，跳着买课时一定会缺模块。按阶段算还有一个好处：中途发现起点定错，可以在阶段末调整，不必按小时退补。'),
  faqItem('结果里为什么没有一对一？', '一对一按同课程小班的 1.8–2.5 倍计价，也不是主班型。先用班课走到目标，确实出现单点短板时再补 4–8 次一对一，总价更低，孩子也不脱离同伴。'),
  faqItem('每周 2 次是不是更快？', '总课时不变，单期时长减半，所以总月数会明显缩短。但低龄阶段不建议——消化时间被压缩，重复巩固的需求反而会上来，最后还是要多花一期。'),
  faqItem('算出来的钱可以分期吗？', '可以按学期付，不额外收手续费。具体期数与付款节点以当期报名单为准，报名单上也会写明退费规则：前两次不满意全额退，第三次起按未消耗课时退，7 个工作日内办结。'),
].join('\n');

const cta = {
  title: '算完还是不确定？',
  text: '课时是粗算，起点才是变量。30 分钟入学测评能确认起点，通常能省掉半期到一期的重复内容。',
  btn: '预约入学测评',
  href: 'index.html#trial',
};

export const html = shell({
  file: 'plan-calculator.html',
  title: '课时与费用粗算 · 码跃少儿编程',
  desc: '选年级、基础、目标与每周上课次数，算出一条路径需要几期课、多少课时、多长时间、线下线上各多少钱。起点表、目标表与单价全部公开。',
  tagline: '算课时',
  eyebrow: '课时与费用粗算',
  h1: '「学多久、花多少」，<br>先自己<em>算一遍</em>',
  lead: '课时、时长、费用三件事，家长通常在报名时才被告知。这里把口径摊开：选四个条件，直接给出阶段明细、总课时与线下线上两套价格。粗算，但规则与单价全部公开。',
  stats: `<div class="n"><b>4</b><span>项条件，1 分钟填完</span></div><div class="n"><b>6</b><span>个阶段，课时与单价公开</span></div><div class="n"><b>2</b><span>套价格：线下 / 线上</span></div><div class="n"><b>0</b><span>隐藏费用，可自己复算</span></div>`,
  body,
  cta,
  faq,
});
