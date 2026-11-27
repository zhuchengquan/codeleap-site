import { shell, sec, faqItem } from './layout.mjs';

const tool = `
<div class="finder" id="quiz">
  <div class="q" data-q="q1">
    <b><i>01</i>早上要出门，四件事：刷牙、吃早饭、背包、穿鞋。哪个顺序最合理？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">刷牙 → 吃早饭 → 背包 → 穿鞋</button>
      <button class="opt" type="button" data-v="B">穿鞋 → 刷牙 → 吃早饭 → 背包</button>
      <button class="opt" type="button" data-v="C">背包 → 穿鞋 → 刷牙 → 吃早饭</button>
    </div>
  </div>
  <div class="q" data-q="q2">
    <b><i>02</i>要在屏幕上画 6 个一模一样的圆圈，最省事的做法是？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">把「画一个圆」重复执行 6 次</button>
      <button class="opt" type="button" data-v="B">把「画一个圆」复制粘贴 6 份</button>
      <button class="opt" type="button" data-v="C">画一个圆就够了</button>
    </div>
  </div>
  <div class="q" data-q="q3">
    <b><i>03</i>规则是：碰到红色就停，否则继续往前走。角色走到一块红色砖上，它会？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">停下来</button>
      <button class="opt" type="button" data-v="B">继续走</button>
      <button class="opt" type="button" data-v="C">变大一倍</button>
    </div>
  </div>
  <div class="q" data-q="q4">
    <b><i>04</i>分数一开始是 0，每打中一次加 1。打中 3 次后，分数是多少？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">0</button>
      <button class="opt" type="button" data-v="B">1</button>
      <button class="opt" type="button" data-v="C">3</button>
      <button class="opt" type="button" data-v="D">30</button>
    </div>
  </div>
  <div class="q" data-q="q5">
    <b><i>05</i>这段程序跑完，屏幕上会显示什么？</b>
    <pre class="qcode">n = 0
for i in range(4):
    n = n + 2
print(n)</pre>
    <div class="opts">
      <button class="opt" type="button" data-v="A">2</button>
      <button class="opt" type="button" data-v="B">4</button>
      <button class="opt" type="button" data-v="C">6</button>
      <button class="opt" type="button" data-v="D">8</button>
    </div>
  </div>
  <div class="q" data-q="q6">
    <b><i>06</i>这行代码错在哪：<code style="padding:3px 8px;border-radius:6px;background:var(--glass);border:1px solid var(--stroke-2);font-family:var(--font-mono);font-size:12.5px">print('你好</code></b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">少了右引号和右括号</button>
      <button class="opt" type="button" data-v="B">print 不能用来打印中文</button>
      <button class="opt" type="button" data-v="C">这行没问题</button>
    </div>
  </div>
  <div class="q" data-q="q7">
    <b><i>07</i>一个循环从 1 数到 10（包含 10），一共执行多少次？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">9 次</button>
      <button class="opt" type="button" data-v="B">10 次</button>
      <button class="opt" type="button" data-v="C">11 次</button>
    </div>
  </div>
  <div class="q" data-q="q8">
    <b><i>08</i>程序输出不对，第一步应该做什么？</b>
    <div class="opts">
      <button class="opt" type="button" data-v="A">直接删掉重写</button>
      <button class="opt" type="button" data-v="B">先看报错信息和最后输出的那一行</button>
      <button class="opt" type="button" data-v="C">马上问老师要答案</button>
    </div>
  </div>
  <div class="sub">
    <button type="button" id="qRun" disabled>看结果</button>
    <span id="qHint">还有 8 题没选</span>
  </div>
  <div class="red" id="qRes" hidden></div>
</div>
<script src="level-test.js"></script>`;

const topics = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>题号</th><th>考什么</th><th>答错说明</th></tr></thead>
<tbody>
<tr><th>01</th><td>顺序与分解</td><td>还不能把一件事拆成有先后的小步</td></tr>
<tr><th>02</th><td>循环与复用</td><td>习惯复制粘贴，还没建立「重复一次就够」</td></tr>
<tr><th>03</th><td>条件判断</td><td>分不清「满足条件才做」和「总是做」</td></tr>
<tr><th>04</th><td>变量</td><td>变量被当成固定数字，没理解它会变</td></tr>
<tr><th>05</th><td>循环累加</td><td>不会跟着循环跟踪值的变化</td></tr>
<tr><th>06</th><td>语法完整性</td><td>没注意括号、引号要成对</td></tr>
<tr><th>07</th><td>边界与计数</td><td>「到 10 为止」容易数成 9 次</td></tr>
<tr><th>08</th><td>调试习惯</td><td>出错先求助，还没养成看信息的习惯</td></tr>
</tbody></table></div>
<div class="note"><b>八题只测四件事：</b>顺序、重复、条件、读错。这四件事不需要识字量，也不需要提前学语法——它们是后面所有阶段的共同地基。语法可以补，地基不行。</div>`;

const use = `
<div class="check">
  <div class="c"><i>✓</i><span><b>7–8 分：</b>逻辑底子够。可以直接做 L4 测评，或进 L3 快班试两周；语法从零开始也不影响。</span></div>
  <div class="c"><i>✓</i><span><b>5–6 分：</b>从 L3 Python 起。重点补两件事：读英文报错、处理边界情况。</span></div>
  <div class="c"><i>✓</i><span><b>3–4 分：</b>从 L2 起。变量、克隆、列表是这一级的主线，先把手上的东西管住再谈语法。</span></div>
  <div class="c"><i>✓</i><span><b>0–2 分：</b>从 L1 起。先建立顺序、重复、条件三个概念，这一级不背任何语法。</span></div>
  <div class="c"><i class="x">×</i><span><b>别按分数跳级。</b>这套题测的是逻辑直觉，不含语法熟练度和耐力，跳级后会在这两项上还债。</span></div>
  <div class="c"><i class="x">×</i><span><b>别让孩子独自做。</b>题干请家长读，孩子只负责想答案；识字量不该影响结果。</span></div>
  <div class="c"><i class="x">×</i><span><b>一次结果不算数。</b>隔两周再做一次，看的是稳定，不是运气。</span></div>
</div>`;

const body =
  sec({
    kicker: '开始',
    h2: '八道题，家长读题、孩子作答',
    intro: '都是选择题，不用敲键盘。八题答完才出结果；答错不扣分，但会进错题清单，告诉你卡在哪一类。',
    content: tool,
  }) +
  sec({
    kicker: '题目在考什么',
    h2: '八道题，四件事',
    intro: '每道题都对应一项可训练的能力，答错不是「不会编程」，而是某一个点还没建立。',
    content: topics,
  }) +
  sec({
    kicker: '怎么用这个结果',
    h2: '分数不是等级，是起点线索',
    intro: '同一个分数，配不同年级，起点可以差一级。下面的用法是我们在招生咨询里实际用的。',
    content: use,
  });

const faq = [
  faqItem('这套题和「四道题定起点」有什么区别？', '那四题问的是家长：年级、经验、能不能独立动手、数学吃不吃力，是自评；这八题让孩子答，测的是逻辑直觉。两个都做，交叉看更准：自评说 L2、题目测出 6 分，通常可以直接进 L3 试两周。'),
  faqItem('八道题够精确吗？', '不够精确，但足够分流。真正的起点由 30 分钟入学测评确认，含上机与读题；这里只是让家长在报名前先有个方向，不必等测评才知道该看哪一级。'),
  faqItem('孩子认字少，能测吗？', '能。家长读题、孩子说答案，别替他想。二年级以下建议只做前四题，后四题会受识字量影响，分数不作为判断依据。'),
  faqItem('测出来比同龄人低，是不是不该学？', '不是。这套题测的是「现在」，不是「潜力」。低分只说明起点要往前挪一级，不说明学不了；反过来，高分也不代表能直接进竞赛班。'),
].join('\n');

const cta = {
  title: '测完想知道从哪一级开始？',
  text: '把得分带来，30 分钟入学测评会确认起点，并给出第一期该补什么。测评免费，不报名也可以只拿报告。',
  btn: '预约入学测评',
  href: 'index.html#trial',
};

export const html = shell({
  file: 'level-test.html',
  title: '水平小测：八道题 · 码跃少儿编程',
  desc: '八道选择题测孩子的编程底子，不用敲代码。测顺序、重复、条件、读错四件事，出得分、建议起点与错题清单。',
  tagline: '水平小测',
  eyebrow: '八道题',
  h1: '孩子的编程底子，<br>八道题<em>看得出来</em>',
  lead: '不看会不会敲代码，只看四件事：能不能按顺序想事、懂不懂重复与条件、能不能读一段简单程序、出错后先做什么。三分钟，家长读题，孩子作答。',
  stats: `<div class="n"><b>8</b><span>道选择题，不用键盘</span></div><div class="n"><b>3</b><span>分钟，家长读题</span></div><div class="n"><b>4</b><span>件事：顺序 / 重复 / 条件 / 读错</span></div><div class="n"><b>0</b><span>门槛，答错也不扣分</span></div>`,
  body,
  cta,
  faq,
});
