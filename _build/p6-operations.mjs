import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>30 天</b><span>从签约到能开第一节课</span></div>
<div class="n"><b>4 阶段</b><span>场地 / 账号 / 课程 / 招生</span></div>
<div class="n"><b>6 类</b><span>角色权限，互不越界</span></div>
<div class="n"><b>4 小时</b><span>工作日支持响应上限</span></div>`;

const launch = `
<div class="timeline">
  <div class="tl"><div class="when">D1–D7</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>场地与资质</h4><p>确认教学区与等候区分开、消防通道可用、照明与插座满足一人一机；办学许可与教师资质材料同步准备。<b>没有场地的，先别急着开账号</b>。</p></div></div>
  <div class="tl"><div class="when">D8–D15</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>账号、权限与课程授权</h4><p>开通校区管理员账号 → 建教务与主讲账号 → 按 L1–L4 分别授权课程范围。教师账号权限按"最小必要"给，新师不默认拿到 L4。</p></div></div>
  <div class="tl"><div class="when">D16–D23</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>班级、课时与排课</h4><p>建班（满班 6 人，硬件班 4 人）→ 导入学员 → 生成课时包 → 排出前 4 周课表。排课要留出补课位，否则第三周就会堵死。</p></div></div>
  <div class="tl"><div class="when">D24–D30</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>试听、招生与首次开课</h4><p>开放试听预约 → 跑一次完整的试听流程（含测评与书面建议）→ 首课录像复盘。首课必须由主讲上，教务旁听。</p></div></div>
</div>
<div class="note"><b>最容易延误的两件事：</b>一是教师账号权限开太大，首月就出现越权改价；二是排课排满，没有补课位，一次流感就能让整个班进度乱掉。</div>`;

const roles = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>角色</th><th>核心职责</th><th>系统权限</th><th>明确不能做</th></tr></thead>
<tbody>
<tr><th>校区负责人</th><td>招生、师资、财务与合规</td><td>全校区数据、审批退费、查看经营报表</td><td>不能改学生历史成绩与课堂报告</td></tr>
<tr><th>教务</th><td>排课、建班、课时核对、家长沟通</td><td>班级与课表、课时增减（需备注原因）、试听登记</td><td>不能改学费单价、不能删班级记录</td></tr>
<tr><th>主讲</th><td>上课、写报告、布置作业、赛考带队</td><td>本班学员学情、作业与作品、课堂工具</td><td>不能看其他班家长手机号、不能导出全校区数据</td></tr>
<tr><th>助教</th><td>器材验收、课堂协助、作业催交</td><td>本班签到与器材台账</td><td>不能写最终课堂评价、不能单独联系家长谈续费</td></tr>
<tr><th>家长</th><td>查看课时、报告、作品；请假与补课</td><td>仅自己孩子的数据</td><td>不能查看班级其他学员、不能替孩子提交作业</td></tr>
</tbody></table></div>`;

const rules = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>事项</th><th>规则</th><th>边界与例外</th></tr></thead>
<tbody>
<tr><th>课时包</th><td>48 课时为一期，有效期 14 个月</td><td>因病休学可申请延期一次，最长 6 个月，需医院证明</td></tr>
<tr><th>请假</th><td>课前 2 小时以上请假不扣课时</td><td>2 小时内或未请假按缺课处理，一期内 3 次可申请免责</td></tr>
<tr><th>补课</th><td>缺课 7 天内安排同进度班补课，不额外收费</td><td>无同进度班时改 1 对 1，消耗 1.5 课时</td></tr>
<tr><th>退课</th><td>前两次课不满意全额退；第三次起按未消耗课时退</td><td>教材与已发生的器材损耗据实扣除，7 个工作日办结</td></tr>
<tr><th>结转</th><td>升阶可结转剩余课时，按新阶段单价折算</td><td>跨阶段结转需教研确认，不跨校区结转</td></tr>
</tbody></table></div>
<div class="note"><b>规则要写在报名前，不是退费时：</b>退费纠纷九成来自"当时没人告诉我"。这四条在报名页与合同首页各出现一次。</div>`;

const finance = `
<div class="check">
  <div class="c"><i>1</i><span><b>课消对账</b>：系统课时消耗与实际上课记录逐条核对，差异超过 2 课时要查原因</span></div>
  <div class="c"><i>2</i><span><b>收款对账</b>：报名收款、续费、退费三张表与银行流水对上</span></div>
  <div class="c"><i>3</i><span><b>欠费名单</b>：课时不足 4 次自动提醒教务，不等到停课才联系</span></div>
  <div class="c"><i>4</i><span><b>教师课时费</b>：按实际授课课时结算，试听与补课单列</span></div>
  <div class="c"><i>5</i><span><b>器材台账</b>：本月新增、损耗、赔付三栏与库存对齐</span></div>
</div>`;

const support = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>事项</th><th>响应时限</th><th>找谁</th><th>升级路径</th></tr></thead>
<tbody>
<tr><th>账号无法登录 / 权限异常</th><td>工作日 4 小时内</td><td>校区教务</td><td>超时转区域技术支持</td></tr>
<tr><th>平台故障（上传、白屏）</th><td>当天回复，24 小时内定位</td><td>技术支持</td><td>影响开课则启动备用方案（本地离线课件）</td></tr>
<tr><th>课程内容与教研问题</th><td>2 个工作日内</td><td>教研组</td><td>月度教研会集中答复</td></tr>
<tr><th>家长投诉与退费争议</th><td>24 小时内首次回复</td><td>校区负责人</td><td>7 个工作日内给书面方案</td></tr>
</tbody></table></div>`;

const coop = `
<div class="tiles">
  <div class="tile"><i>方式一</i><h4>课程授权</h4><p>使用我们的课程体系与教案，自行招生与授课。提供教师培训（40 小时）与季度教研，不参与日常运营。</p></div>
  <div class="tile"><i>方式二</i><h4>托管运营</h4><p>课程 + 教务系统 + 排课与师资培训打包，我方派 1 名驻场教务前 3 个月，之后远程支持。</p></div>
  <div class="tile"><i>方式三</i><h4>共建校区</h4><p>共同选址、共同投入、按约定比例分成。适合已有场地但缺课程与师资的机构。</p></div>
</div>
<div class="note"><b>说明：</b>本页为站点示例内容，三种合作方式仅用于展示"商业链路闭环"，不构成任何真实的招商承诺、收益承诺或授权要约。正式合作以双方书面合同为准；涉及品牌授权、课程版权与分成比例，须单独签署协议。</div>`;

const board = `
<p style="margin:0 0 14px;font-size:13.5px;line-height:1.85;color:var(--muted)">一个校区健不健康，不看单月营收，看六个能每月复算的数。口径不统一，看板就会变成各自解释的报表。</p>
<div class="table-wrap"><table class="matrix">
<thead><tr><th>指标</th><th>口径（怎么算）</th><th>健康区间</th><th>异常时先查什么</th></tr></thead>
<tbody>
<tr><th>在读人数</th><td>当月有课时消耗的去重学员数，不含仅报名未开课</td><td>环比不下降</td><td>先查「到期未续」与「请假超 4 周」两批人</td></tr>
<tr><th>课耗率</th><td>实际消耗课时 ÷ 当月应排课时</td><td>≥ 92%</td><td>低于 88% 先查排课冲突与请假流程，而不是催家长</td></tr>
<tr><th>满班率</th><td>各班实际人数 ÷ 班额上限（6 人）</td><td>≥ 75%</td><td>低于 65% 先合并班，而不是继续开新班</td></tr>
<tr><th>续费率</th><td>到期续费人数 ÷ 当月到期人数</td><td>≥ 70%</td><td>低于 60% 先看阶段报告质量与结课作品，而不是打折</td></tr>
<tr><th>退费率</th><td>当月退费金额 ÷ 当月确认营收</td><td>≤ 5%</td><td>单月超 8% 逐单回访，区分「搬家」与「不满意」</td></tr>
<tr><th>转介绍占比</th><td>新签学员中老带新来源占比</td><td>≥ 25%</td><td>低于 15% 说明老家长没有可分享的东西，先补作品与阶段展</td></tr>
</tbody></table></div>
<div class="note"><b>看板不看的三个数：</b>单月营收（受预收与退费影响，波动大且可被包装）；试听到场人数（可注水，不等于有效线索）；老师的课时数（一旦当成考核指标，就会诱导排满班、压缩备课）。</div>
<div class="two">
  <div class="box"><h4>月度复盘会，30 分钟怎么开</h4><ul>
    <li><b>前 10 分钟</b>：只过六个数里异常的两项，不复述全部</li>
    <li><b>中间 10 分钟</b>：每项异常定<b>一个动作、一个责任人、一个验收日</b></li>
    <li><b>后 10 分钟</b>：回看上个月定的动作有没有效，没效就换，不叠加新动作</li>
  </ul></div>
  <div class="box"><h4>三个常被算错的坑</h4><ul>
    <li><b>把预收款当营收</b>：未消耗课时是负债，退费时才知道疼</li>
    <li><b>用报名数算满班率</b>：报名未开课的人不进班，满班率虚高</li>
    <li><b>把请假算成缺课</b>：课耗率会被误判，老师也被冤枉</li>
  </ul></div>
</div>`;

const body =
  sec({
    kicker: "校区启用",
    h2: "把「开一个校区」拆成 30 天",
    intro: "手册里最容易漏掉的不是功能，是顺序：先场地、再账号、再排课、最后招生。顺序反了，后面全是返工。",
    content: launch,
  }) +
  sec({
    kicker: "角色权限",
    h2: "六类角色，权限互不越界",
    intro: "权限不是「信任问题」，是设计问题。把不该给的权限从系统层拿掉，比事后追责有效。",
    content: roles,
  }) +
  sec({
    kicker: "课时规则",
    h2: "课时、请假、补课、退课、结转",
    intro: "这五条是家长最关心、也最容易产生争议的部分，全部前置写清。",
    content: rules,
  }) +
  sec({
    kicker: "月度对账",
    h2: "每月固定核对五件事",
    content: finance,
  }) +
  sec({
    kicker: "支持响应",
    h2: "出问题找谁，多久有回音",
    content: support,
  }) +
  sec({
    kicker: "经营看板",
    h2: "六个指标，构成一个校区的月度体检",
    intro: "「这个月怎么样」不能只回答营收。六个数各自对应一个动作，异常时知道先查哪里，比数字本身有用。",
    content: board,
  }) +
  sec({
    kicker: "合作方式",
    h2: "三种合作，各自适合谁",
    intro: "如果你不是家长，而是想开少儿编程项目的机构，这一节是给你的。",
    content: coop,
  });

const faq = [
  faqItem("开一个校区最少需要几个人？", "起步配置是 1 名负责人 + 1 名教务 + 2 名主讲，助教可由在读优秀学员家长兼职或后续补充。低于这个配置，首月排课就会转不动。"),
  faqItem("教师没有竞赛背景，能教 L4 吗？", "不能直接带 L4。路径是先带 L1–L2 满一学期，通过 L4 命题测试（相当于 CSP-J 第一轮 70 分），再跟课 8 次，才独立带班。"),
  faqItem("课时包有效期为什么是 14 个月？", "48 课时按每周一次算约 12 个月，留 2 个月缓冲给请假与假期。有效期太短会逼家长赶课，太长则退费核算变复杂。"),
  faqItem("合作后课程版权归谁？", "课程与教案版权归我方，合作方获得在约定校区、约定期限内的使用权；合作方自研的补充内容归合作方。具体以合同为准。"),
].join("\n");

const cta = {
  title: "想在自己校区跑通这套流程？",
  text: "可以先约一次 60 分钟的线上沟通：看你现在的场地、师资与生源情况，判断适合课程授权还是托管运营。不合适会直接说。",
  btn: "预约运营沟通",
};

export const html = shell({
  file: "operations.html",
  title: "校区运营 · 码跃少儿编程",
  desc: "校区从签约到开课的 30 天四阶段、六类角色的权限边界、课时与退课规则、月度对账五项、支持响应时限，以及三种合作方式的适用场景。",
  tagline: "校区运营",
  eyebrow: "机构与合作",
  h1: "开一个校区，<br>难的不是招生，是<em>把顺序排对</em>",
  lead: "这一页写给两类人：想把校区管明白的校长，和想开少儿编程项目的机构。内容是把「启用 → 账号 → 排课 → 教学 → 对账」这条链路摊开。",
  stats,
  body,
  faq,
  cta,
});
