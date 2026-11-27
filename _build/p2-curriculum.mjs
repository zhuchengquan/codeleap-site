import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>4 个</b><span>阶段，一条主线不拐弯</span></div>
<div class="n"><b>8 级</b><span>GESP 可对应的级别</span></div>
<div class="n"><b>3 类</b><span>考级 / 白名单赛事 / CSP</span></div>
<div class="n"><b>1 张</b><span>表看清"什么时候考什么"</span></div>`;

const matrix = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>阶段</th><th>适合年级</th><th>课时</th><th>核心内容</th><th>对应考级</th><th>可参加的比赛</th><th>学完能做什么</th></tr></thead>
<tbody>
<tr><th>L1 图形化启蒙</th><td>小学 1–3 年级</td><td>48 × 90 分钟</td><td>顺序、循环、条件、事件、变量；ScratchJr 过渡到 Scratch</td><td><b>GESP 一级</b>（图形化）</td><td>蓝桥杯青少组 Scratch 初级</td><td>独立做出 3 个小游戏，能讲清每块积木为什么放这里</td></tr>
<tr><th>L2 图形化 + 硬件</th><td>小学 3–5 年级</td><td>48 × 90 分钟</td><td>列表、克隆、广播、函数积木；主控板、传感器、结构件</td><td><b>GESP 二–三级</b></td><td>蓝桥 Scratch 中级、WRC 普及组</td><td>做出带传感器的互动装置，能排查接线与烧录问题</td></tr>
<tr><th>L3 Python</th><td>小学 4 年级–初一</td><td>48 × 90 分钟</td><td>语法、函数、列表与字典、文件读写、枚举与简单排序</td><td><b>GESP 四–五级</b>（Python）</td><td>蓝桥 Python 组、NOC 编程赛</td><td>写出 200 行以内的完整程序，能读懂报错并自己改</td></tr>
<tr><th>L4 C++ 算法</th><td>小学 5 年级–初二</td><td>48 × 120 分钟</td><td>C++ 语法、数组、排序、递归、栈队列、基础图论</td><td><b>GESP 六–八级</b>；CSP-J 第一轮</td><td>CSP-J/S、NOIP 普及组</td><td>独立完成 CSP-J 前两题，能写对拍与暴力验证</td></tr>
</tbody></table></div>
<div class="note"><b>这张表的用法：</b>先看"适合年级"，再看"对应考级"。如果孩子年级与阶段不匹配（比如四年级零基础），不要硬塞进 L3——先做入学测评，按测评结果定起点，而不是按年龄。</div>`;

const timeline = `
<div class="timeline">
  <div class="tl"><div class="when">三年级</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>L1 起步，同年可试 GESP 一级</h4><p>一周一次课，课后每天 15 分钟。这个阶段不追求代码量，追求"敢自己动手试"。</p></div></div>
  <div class="tl"><div class="when">四年级</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>L2 + 硬件，考 GESP 二–三级</h4><p>开始接触传感器与主控板。考级放在学期末，不占用正常课时，用 4 次课后加练完成。</p></div></div>
  <div class="tl"><div class="when">五年级</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>L3 Python，考 GESP 四–五级</h4><p>从"拖积木"切到"敲键盘"，第一个月最难受。这时不要同时报两个班，容易两头都松。</p></div></div>
  <div class="tl"><div class="when">六年级</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>L4 C++，冲 CSP-J 第一轮</h4><p>CSP-J 第一轮在秋季，需要提前 3 个月进入模考节奏，每周一套限时卷。</p></div></div>
  <div class="tl"><div class="when">初一</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>CSP-J 第二轮 / 转 CSP-S</h4><p>第一轮过线才有第二轮。没过线不换赛道，先补搜索与动态规划两块短板。</p></div></div>
</div>
<div class="note"><b>这是"典型节奏"，不是标准答案。</b>有的孩子四年级就能进 L3，也有六年级才从 L1 开始且学得很好。时间轴的意义是让家长知道"下一站在哪"，不是拿来催孩子。</div>`;

const gradeRules = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>GESP 级别</th><th>大致对应能力</th><th>我们建议的备考方式</th><th>不建议的做法</th></tr></thead>
<tbody>
<tr><th>一级–二级</th><td>图形化：顺序、循环、条件、简单变量</td><td>跟着 L1/L2 正常上课，考前 4 次课做真题</td><td>为考级停掉正常课，纯刷题 3 个月</td></tr>
<tr><th>三级–四级</th><td>图形化进阶 / Python 入门语法</td><td>L2 末或 L3 中段参加，考前做 3 套限时卷</td><td>零基础直接报四级，"以考代学"</td></tr>
<tr><th>五级–六级</th><td>Python 函数、列表字典、简单算法</td><td>L3 后段，配合 OJ 每周 5 题</td><td>跳级连报两级，两套大纲一起背</td></tr>
<tr><th>七级–八级</th><td>C++ 语法、数组、排序、递归</td><td>L4 中段，先保证 CSP-J 第一轮再谈八级</td><td>把八级当"小升初筹码"，忽略实际编码能力</td></tr>
</tbody></table></div>
<div class="note"><b>关于跳级：</b>我们允许跳级，但要先通过对应级别的模考（≥ 75 分）才给报名。跳级不是省时间，是把"没学会"推迟到更贵的阶段暴露。</div>`;

const contestRules = `
<div class="two">
  <div class="box"><h4>CSP-J / S 的前置条件</h4><ul>
    <li><b>L4 至少 24 课时</b>：数组、排序、递归没学完，第一轮阅读程序题基本靠猜</li>
    <li><b>每周一套限时卷</b>：连续 6 周，按真实考试时间做</li>
    <li><b>会写暴力与对拍</b>：不会对拍，赛场上改一个 bug 能改 40 分钟</li>
    <li><b>第一轮过线再谈第二轮</b>：没过线不换赛道，先补短板</li>
  </ul></div>
  <div class="box"><h4>白名单赛事怎么选</h4><ul>
    <li><b>看主办方与学段</b>：优先教育部白名单内、对应孩子学段的赛项</li>
    <li><b>看赛项是否"真写代码"</b>：纯作品投票类比赛对能力提升有限</li>
    <li><b>一年最多两项</b>：备赛会挤占正常课时，多了两头都做不好</li>
    <li><b>不承诺获奖</b>：我们只承诺训练与带队，不承诺名次——承诺名次的机构，最后都在换赛道</li>
  </ul></div>
</div>`;

const mismatch = `
<div class="check">
  <div class="c"><i class="x">×</i><span><b>按年龄硬排阶段</b>：四年级零基础直接进 L3，结果整学期在补语法，作品一个没做完。正确做法是先测评。</span></div>
  <div class="c"><i class="x">×</i><span><b>只刷题不做项目</b>：考级能过，但一让独立做作品就卡住。项目是"把知识连起来"的唯一方式。</span></div>
  <div class="c"><i class="x">×</i><span><b>跳过图形化直接学 C++</b>：抽象层一次跨两级，孩子能背语法但写不出完整程序。除个别测评明显超前的孩子，我们不建议。</span></div>
  <div class="c"><i>✓</i><span><b>正确顺序</b>：先测评定起点 → 按阶段打基础 → 学期末冲一次考级 → 有余力再进竞赛。</span></div>
</div>`;

const schedule = `
<p style="margin:0 0 14px;font-size:13.5px;line-height:1.85;color:var(--muted)">同样的 48 课时，排成一周一次和排成一周两次，走完的时间差一倍，孩子的吸收效果也差一截。排课不是把课时塞进日历，是先定节奏再定日期。</p>
<div class="table-wrap"><table class="matrix">
<thead><tr><th>路径</th><th>适合谁</th><th>节奏</th><th>一个阶段走完</th><th>代价与风险</th></tr></thead>
<tbody>
<tr><th>标准周课</th><td>绝大多数孩子，尤其是 L1–L2</td><td>每周 1 次，90 分钟，固定时段</td><td>约 12 个月（含寒暑假各停 2–3 周）</td><td>假期容易断档，开学要 1–2 课时找回手感</td></tr>
<tr><th>加速周课</th><td>测评超前、目标明确（如六年级冲 CSP-J 第一轮）</td><td>每周 2 次，隔天排</td><td>约 6 个月</td><td>练习量翻倍；消化不了就是「假会」，一到独立做题就露</td></tr>
<tr><th>假期集训</th><td>补前置、考级前冲刺、转阶段过渡</td><td>寒暑假 10–15 天，每天 2 课时</td><td>补 20–30 课时</td><td>集中学集中忘，必须配学期内的巩固任务，否则三周归零</td></tr>
<tr><th>一对一补差</th><td>插班生补前置、单点卡死（如递归、指针）</td><td>每周 1 次，60–90 分钟，叠加常规班</td><td>按卡点定，通常 8–12 次</td><td>成本高；长期只上一对一，会缺同伴协作与公开表达的训练</td></tr>
</tbody></table></div>
<div class="note"><b>三条排课硬约束：</b>① L1–L2 不加课时、不加速度，这两阶段的重点是「愿意自己动手」，不是进度；② 同一孩子一周内不排两次同类型课（两次都是讲练课，第二次基本白上）；③ 每 12 课时必须有一次复盘，复盘不占正课，单独约 20 分钟。</div>
<div class="two">
  <div class="box"><h4>什么时候可以从标准切加速</h4><ul>
    <li><b>连续 8 课时</b>的基础档都在课上独立完成，不需要提示</li>
    <li>课后练习平均用时<b>低于预估的 60%</b>，且正确率在 80% 以上</li>
    <li>孩子自己提出「想快点」，而不是家长单方面想快</li>
  </ul></div>
  <div class="box"><h4>什么时候必须减速</h4><ul>
    <li>同一类题<b>连续错三次</b>，说明前置概念没建立，不是粗心</li>
    <li>课上频繁看别人屏幕、等别人先做，独立启动能力在退</li>
    <li>出现「上课能懂、回家写不出」，且持续两周以上</li>
  </ul></div>
</div>`;

const body =
  sec({
    kicker: "主矩阵",
    h2: "四个阶段，各自对应什么考级与比赛",
    intro: "这张表是全站最该被收藏的一页。左侧是课程，右侧是出口，中间是可以被验证的能力。",
    content: matrix,
  }) +
  sec({
    kicker: "典型节奏",
    h2: "从三年级到初一，一条常见的五年线",
    intro: "不是每个孩子都按这条线走，但大多数家长需要知道「下一站大概在哪」。",
    content: timeline,
  }) +
  sec({
    kicker: "考级口径",
    h2: "GESP 八级，分别对应什么能力",
    intro: "考级不是目的，是把「学会了」变成一张可验证的凭证。级别和能力对不上，证书就没意义。",
    content: gradeRules,
  }) +
  sec({
    kicker: "竞赛口径",
    h2: "CSP 与白名单赛事，什么时候进",
    intro: "竞赛是另一条曲线：它要求的是「限时、独立、一次做对」，和平时上课完全不同。",
    content: contestRules,
  }) +
  sec({
    kicker: "常见错配",
    h2: "三种最容易走弯路的安排",
    content: mismatch,
  }) +
  sec({
    kicker: "排课路径",
    h2: "四种排法，走完一个阶段的时间差一倍",
    intro: "家长问「多久能学完」，真正该问的是「一周排几次、每次之后有没有消化时间」。",
    content: schedule,
  });

const faq = [
  faqItem("可以跳过 L2 直接学 Python 吗？", "可以，但要过入学测评的「逻辑与抽象」两项。L2 的核心不是硬件，是列表、克隆、广播这些「把程序组织起来」的思路，这些在 Python 里同样要用。跳过可以，但要在 L3 前 8 课时补上。"),
  faqItem("GESP 一年考几次，什么时候报？", "一般每年 4 次（3、6、9、12 月），具体以中国电子学会当年通知为准。我们建议跟着学期末的那一次报，不追场次。"),
  faqItem("CSP-J 第一轮没过，还要不要继续学？", "继续学，但不急着换赛道。第一轮考的是阅读程序与补全代码，本质是「读代码的能力」，这恰恰是后面第二轮最需要的基本功。"),
  faqItem("证书对小升初/中考有用吗？", "看地区和学校。GESP 与 CSP 在部分学校的科技特长生招生里有参考价值，但不是硬通货。我们不会拿「包升学」做卖点，也不建议为此牺牲正常学习节奏。"),
].join("\n");

const cta = {
  title: "不确定孩子该从哪一级开始？",
  text: "做一次 30 分钟的入学测评，比对着年龄猜要准。测评结果会给到「建议起点阶段 + 需要补的两项能力」，不推销课程。",
  btn: "预约入学测评",
};

export const html = shell({
  file: "curriculum-map.html",
  title: "课程 × 考级 × 竞赛对照 · 码跃少儿编程",
  desc: "L1–L4 四个阶段分别对应哪些 GESP 级别、能参加哪些比赛、学完能做什么；从三年级到初一的典型节奏，以及跳级、错配与竞赛前置条件。",
  tagline: "课程 × 考级",
  eyebrow: "课程与出口",
  h1: "一张表说清楚：<br><em>几岁学什么，什么时候考什么</em>",
  lead: "家长真正想知道的不是「课程有几门」，而是「学完这个阶段，孩子能考到哪一级、能参加什么比赛、下一步往哪走」。这一页把四个阶段与出口对齐。",
  stats,
  body,
  faq,
  cta,
});
