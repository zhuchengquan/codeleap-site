import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>8 步</b><span>从线索到结业的完整链路</span></div>
<div class="n"><b>2 小时</b><span>新线索首次响应的上限</span></div>
<div class="n"><b>12 项</b><span>学员建档必填字段</span></div>
<div class="n"><b>3 个</b><span>流失预警信号，出现就介入</span></div>`;

const journey = `
<div class="timeline">
  <div class="tl"><div class="when">T0</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>线索进来</h4><p>来源分四类：到店、电话、转介绍、线上表单。每条线索只归一个顾问，避免两个人同时联系同一个家长。</p></div></div>
  <div class="tl"><div class="when">T0 + 2h</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>首次响应</h4><p>电话或微信回一句具体的话：孩子几岁、住在哪个区、想解决什么问题。不发课包价目表，先约试听时间。</p></div></div>
  <div class="tl"><div class="when">T1</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>试听（90 分钟）</h4><p>孩子上课，家长后排旁听。课后 10 分钟由主讲说三件事：孩子做了什么、卡在哪、建议从哪个阶段开始。</p></div></div>
  <div class="tl"><div class="when">T1 + 1 天</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>入学测评（30 分钟）</h4><p>不是所有孩子都要测。零基础且年龄匹配的可以直接进 L1；跨阶段、转学来的、跳过级的必须测。</p></div></div>
  <div class="tl"><div class="when">T2</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>报名与建档</h4><p>选班次、签合同、付首期。同时建学员档案（12 个字段），当天完成，不留到下周。</p></div></div>
  <div class="tl"><div class="when">T2 + 3 天</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>分班与首课</h4><p>按年龄、基础、时间、性格四条原则分班。首课由主讲上，教务旁听，当天给家长一条反馈。</p></div></div>
  <div class="tl"><div class="when">首月</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>首月回访</h4><p>第 4 次课后做一次 10 分钟回访：孩子愿不愿意来、作业能不能独立完成、家长有没有看不懂的报告。</p></div></div>
  <div class="tl"><div class="when">阶段末</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>结业或续费</h4><p>阶段测评 + 一份书面建议：继续、补课时、降阶、转赛道。续费在建议之后谈，不在测评之前谈。</p></div></div>
</div>`;

const leads = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>来源</th><th>典型占比</th><th>首次响应时限</th><th>跟进节奏</th></tr></thead>
<tbody>
<tr><th>到店 / 路过</th><td>约 25%</td><td>当天</td><td>当天约试听，3 天内不联系即关闭</td></tr>
<tr><th>电话咨询</th><td>约 20%</td><td>2 小时内</td><td>3 次未接则改微信，仍无回应转沉默池</td></tr>
<tr><th>老带新转介绍</th><td>约 35%</td><td>2 小时内</td><td>由被推荐人熟悉的老师先联系，转化率最高</td></tr>
<tr><th>线上表单 / 公众号</th><td>约 20%</td><td>当天</td><td>先发一条语音，不发长图文</td></tr>
</tbody></table></div>
<div class="note"><b>不追单的边界：</b>同一家长 7 天内最多 2 次主动联系，明确说「暂不考虑」的进入 3 个月沉默池，不再打扰。这条写进顾问考核，不只看转化率。</div>`;

const convert = `
<div class="steps">
  <div class="stp"><span class="k">01</span><div><h4>确认试听，不发价目表</h4><p>只发三条信息：时间、地址、需要带什么。价格在试听课后由主讲结合孩子情况说，不在微信里甩一张表。</p></div></div>
  <div class="stp"><span class="k">02</span><div><h4>课前 1 天再确认一次</h4><p>一条短消息即可。试听爽约率在只约一次的情况下接近三成，二次确认能砍掉一半。</p></div></div>
  <div class="stp"><span class="k">03</span><div><h4>试听课按课型表执行</h4><p>砍回顾、拉长动手、留 10 分钟给家长。不测评打分、不当场逼单。</p></div></div>
  <div class="stp"><span class="k">04</span><div><h4>课后 10 分钟三方在场</h4><p>主讲说孩子表现，顾问说班次与费用，家长提问。三方在场是为了避免「顾问说的」和「老师说的」不一致。</p></div></div>
  <div class="stp"><span class="k">05</span><div><h4>报与不报都留档</h4><p>不报的记录原因（价格 / 距离 / 时间 / 孩子不想学 / 再考虑），这些原因每月汇总，决定下个月改什么。</p></div></div>
</div>`;

const profile = `
<div class="kv">
  <k>基本信息</k><v>姓名、昵称、出生年月、年级、就读学校</v>
  <k>联系与授权</k><v>至少一位监护人手机号、紧急联系人、肖像与作品使用授权（可拒绝）</v>
  <k>学习起点</k><v>入学测评结论、建议起始阶段、需要补的两项能力</v>
  <k>班级关系</k><v>校区、班次、主讲、助教、固定上课时间</v>
  <k>课时账户</k><v>总课时、已消耗、剩余、有效期、补课余额</v>
  <k>健康与注意事项</k><v>视力、过敏、是否佩戴助听设备、是否需要靠前排座位（家长自愿填写）</v>
  <k>家庭沟通偏好</k><v>希望多久收到一次反馈、是否接受电话、是否进家长群</v>
  <k>历史记录</k><v>调班、请假、补课、退费、投诉，全部留痕，换老师也能接上</v>
</div>
<div class="note"><b>建档当天完成：</b>拖到下周再补，往往会缺「健康与注意事项」这一栏，而这恰恰是课堂上最不能缺的信息。</div>`;

const classRule = `
<div class="check">
  <div class="c"><i>1</i><span><b>年龄差不超过 2 岁</b>：同班最大与最小相差超过 2 岁，课堂节奏很难兼顾，宁可另开一班</span></div>
  <div class="c"><i>2</i><span><b>基础差不超过一个台阶</b>：零基础与学过半年的不混班；跨阶必须测评后再定</span></div>
  <div class="c"><i>3</i><span><b>时间固定</b>：同班学员的固定时段一致，临时调课走补课，不轻易改班级时间</span></div>
  <div class="c"><i>4</i><span><b>性格搭配</b>：一个班最多 2 个高表达欲的孩子，否则发言会集中在两三个人身上</span></div>
</div>
<div class="table-wrap"><table class="matrix">
<thead><tr><th>变更类型</th><th>谁能发起</th><th>条件</th><th>生效时间</th></tr></thead>
<tbody>
<tr><th>调班</th><td>家长 / 教务</td><td>目标班有空位且基础匹配</td><td>下一次课生效，课时随人走</td></tr>
<tr><th>换老师</th><td>家长</td><td>说明具体原因，不要求评价前任老师</td><td>一周内安排，尽量不换班次</td></tr>
<tr><th>暂停</th><td>家长</td><td>因病或搬迁，提供说明</td><td>最长 6 个月，恢复时优先原班</td></tr>
<tr><th>转校区</th><td>家长</td><td>目标校区有同进度班</td><td>下个阶段起生效，不跨阶段结转</td></tr>
</tbody></table></div>`;

const points = `
<div class="two">
  <div class="box"><h4>积分能换什么</h4><ul>
    <li>课时延长：200 分 = 1 课时，每期最多换 4 课时</li>
    <li>器材借用：竞赛套件带回家备赛，押金可用积分抵扣</li>
    <li>活动名额：集训营、家长工作坊的优先报名</li>
    <li>实物：文具、编程周边，标价透明，不设隐藏门槛</li>
  </ul></div>
  <div class="box"><h4>积分不能做什么</h4><ul>
    <li>不能抵扣现金、不能转赠他人、不能兑换课时退费</li>
    <li>不与「老带新」优惠叠加，取更优的一项</li>
    <li>不按考试分数发放，只奖励持续行为：全勤、作业完成、作品发布</li>
    <li>不排名、不公示榜单，避免把学习变成比积分</li>
  </ul></div>
</div>
<div class="note"><b>为什么不用分数换积分：</b>一旦积分和分数挂钩，孩子会挑简单的题做。我们只对「持续做」的行为计分：连续出勤、按时交作业、主动发布作品。</div>`;

const churn = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>信号</th><th>怎么发现</th><th>谁介入</th><th>动作</th></tr></thead>
<tbody>
<tr><th>连续 2 次请假</th><td>系统自动提醒教务</td><td>教务</td><td>当天电话，问清是时间冲突还是兴趣下降</td></tr>
<tr><th>作业连续 3 次未交</th><td>作业看板标红</td><td>主讲</td><td>课上单独问 2 分钟，判断是难度还是动力</td></tr>
<tr><th>家长不再回复消息</th><td>顾问跟进记录 7 天无回应</td><td>顾问</td><td>换渠道联系一次，仍无回应则暂缓，不连续轰炸</td></tr>
</tbody></table></div>
<div class="check">
  <div class="c"><i>✓</i><span><b>续费在建议之后</b>：先给阶段测评与书面建议，家长认可方向再谈续费。顺序反了，续费率反而低</span></div>
  <div class="c"><i class="x">×</i><span><b>不做的事</b>：不制造「名额快没了」的假紧迫、不用赠课诱导一次性买多年、不在孩子面前谈价格与退费</span></div>
</div>`;

const body =
  sec({
    kicker: "学员生命周期",
    h2: "从一条线索，到一次结业",
    intro: "招生不是一次成交，是一条有明确时间点的链路。每个节点卡住，后面都会变形。",
    content: journey,
  }) +
  sec({
    kicker: "线索",
    h2: "四类来源，四种跟进节奏",
    intro: "不同来源的家长，期待完全不同。转介绍要快，线上表单要轻，到店要当场约。",
    content: leads,
  }) +
  sec({
    kicker: "试听转化",
    h2: "五个动作，不做第六个",
    intro: "试听课的目标不是当场签单，是让家长看清「匹配不匹配」。多做的第六个动作通常是逼单。",
    content: convert,
  }) +
  sec({
    kicker: "建档",
    h2: "十二个字段，当天填完",
    intro: "档案不是给系统看的，是给下一个接手的老师看的。换老师时能直接接上，才算合格。",
    content: profile,
  }) +
  sec({
    kicker: "分班",
    h2: "四条原则，和四种变更",
    intro: "分班分错，后面所有教学动作都要加倍补偿。宁可晚开一周，也不硬凑一个班。",
    content: classRule,
  }) +
  sec({
    kicker: "积分",
    h2: "奖励持续行为，不奖励分数",
    content: points,
  }) +
  sec({
    kicker: "流失",
    h2: "三个信号出现，就要介入",
    content: churn,
  });

const faq = [
  faqItem("试听一定要先测评吗？", "不一定。零基础、年龄在对应阶段区间的孩子可以直接试听进班；跨阶段、转学、想跳级的必须先做 30 分钟测评，否则分班没有依据。"),
  faqItem("能不能先上一节正课再决定？", "试听课就是按正课结构上的，只是砍掉回顾与互评、把动手时间拉长。先上正课再决定，对孩子和同班学员都不太公平。"),
  faqItem("分班后觉得不合适能换吗？", "可以，下一次课生效，课时随人走。换班不收费，但一期内建议不超过 2 次，频繁换班对孩子建立课堂习惯不利。"),
  faqItem("老带新优惠和两人同报能叠加吗？", "不叠加，取更优的一项。老带新各减 200，两人同报各减 300，系统会自动算更优的那个，不会默认给低的那档。"),
].join("\n");

const cta = {
  title: "先看清匹配不匹配，再谈报名",
  text: "约一次试听或 30 分钟测评，我们会告诉你孩子适合从哪个阶段开始、需要补哪两项、以及不建议现在报的理由（如果有）。",
  btn: "预约试听 / 测评",
};

export const html = shell({
  file: "admissions.html",
  title: "招生与学员管理 · 码跃少儿编程",
  desc: "从线索、试听、测评、建档、分班到续费与流失预警的完整链路：四类线索的跟进时限、试听转化五个动作、建档十二个字段、分班四条原则、积分与续费边界。",
  tagline: "招生与学员管理",
  eyebrow: "从线索到结业",
  h1: "招生的核心不是说服，<br>是<em>把「不匹配」提前说出口</em>",
  lead: "这一页写给两类人：正在选机构的家长，和想把招生做扎实的校长。链路、时限、字段、边界都写在这里，包括我们明确不做的追单动作。",
  stats,
  body,
  faq,
  cta,
});
