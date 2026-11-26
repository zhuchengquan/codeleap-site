import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>2 套</b><span>L2 基础套件 / L4 竞赛套件</span></div>
<div class="n"><b>12 项</b><span>每节课前的开箱验收</span></div>
<div class="n"><b>8 类</b><span>常用传感器与执行器</span></div>
<div class="n"><b>0 强电</b><span>全程 5V 供电，不碰 220V</span></div>`;

const kits = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>套件</th><th>包含什么</th><th>适用</th><th>使用方式</th></tr></thead>
<tbody>
<tr><th>L2 基础套件</th><td>主控板 ×1、扩展板 ×1、面包板 ×1、LED 与按键、蜂鸣器、光敏与温湿度传感器、超声波、舵机 ×1、结构件与杜邦线若干</td><td>L2 硬件模块（12 课时）</td><td>两人一套，同班轮流做主控手与记录手</td></tr>
<tr><th>L4 竞赛套件</th><td>主控板 ×1、循迹与避障模块、陀螺仪、电机驱动、锂电池组、结构底盘</td><td>L4 硬件专题与 WRC 备赛</td><td>一人一套，可申请带回家备赛（押金制）</td></tr>
<tr><th>耗材</th><td>杜邦线、热缩管、螺丝、亚克力板、胶枪胶棒</td><td>全阶段</td><td>按学期配额领用，不额外收费</td></tr>
</tbody></table></div>
<div class="note"><b>不外借的东西：</b>主控板与锂电池组不外借给非在读学员；竞赛套件带回家需家长签安全告知书并付押金，归还时按损耗清单结算。</div>`;

const checkin = `
<div class="check">
  <div class="c"><i>1</i><span>主控板电源指示灯是否正常亮起（不亮先换线，不要直接换板）</span></div>
  <div class="c"><i>2</i><span>USB 线是否松动、接口是否氧化（这是"烧录失败"最常见的原因）</span></div>
  <div class="c"><i>3</i><span>扩展板插接方向是否正确（反插一次就可能烧稳压芯片）</span></div>
  <div class="c"><i>4</i><span>传感器接线：电源、地、信号三根是否对应</span></div>
  <div class="c"><i>5</i><span>舵机是否在通电前手动转到中位（带载上电容易堵转）</span></div>
  <div class="c"><i>6</i><span>结构件螺丝是否齐全，缺件当场补齐</span></div>
  <div class="c"><i>7</i><span>锂电池电压是否在 7.4–8.4V 区间（低于 7.0V 停止使用）</span></div>
  <div class="c"><i>8</i><span>杜邦线是否有裸露铜丝，裸露的整根换掉</span></div>
  <div class="c"><i>9</i><span>桌面是否清空水杯与尖锐物</span></div>
  <div class="c"><i>10</i><span>电脑是否识别到串口（设备管理器里能看到）</span></div>
  <div class="c"><i>11</i><span>烧录软件版本是否为课堂统一版本</span></div>
  <div class="c"><i>12</i><span>收纳盒编号与座位号是否一致（丢失可追溯到人）</span></div>
</div>
<div class="note"><b>为什么每节课都做：</b>硬件课一半的时间浪费在"线松了""插反了"。把 12 项验收压进课前 10 分钟，后面的 80 分钟才能真的在写程序。</div>`;

const rules = `
<div class="steps">
  <div class="stp"><span class="k">01</span><div><h4>先断电，再接线</h4><p>任何接线动作前先拔 USB 与电池。<b>带电插拔是烧板子的第一原因</b>，比静电更常见。</p></div></div>
  <div class="stp"><span class="k">02</span><div><h4>摸一下金属再上手</h4><p>冬天穿羽绒服时静电明显，先摸桌腿或接地金属放掉静电，再拿主控板。</p></div></div>
  <div class="stp"><span class="k">03</span><div><h4>接线顺序：地 → 电源 → 信号</h4><p>固定顺序能减少接错概率。接完让同伴念一遍三根线的去向，再上电。</p></div></div>
  <div class="stp"><span class="k">04</span><div><h4>烧录失败先查三件事</h4><p>串口有没有识别、驱动有没有装、板子型号有没有选错。三件事排除完再怀疑程序。</p></div></div>
  <div class="stp"><span class="k">05</span><div><h4>下课前 5 分钟收纳</h4><p>线材按长度捆好、传感器回格、电池单独放防爆袋。收纳不合格的，下节课先做 5 分钟整理。</p></div></div>
</div>`;

const maintain = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>周期</th><th>做什么</th><th>谁负责</th><th>记录在哪</th></tr></thead>
<tbody>
<tr><th>每节课</th><td>12 项开箱验收、收纳检查</td><td>助教</td><td>课堂记录表</td></tr>
<tr><th>每周</th><td>清点套件数量、检查线材损耗</td><td>助教</td><td>器材台账</td></tr>
<tr><th>每月</th><td>电池充放电一次、校准传感器</td><td>主讲</td><td>器材台账</td></tr>
<tr><th>每学期</th><td>全套通电测试、淘汰损坏件、补充耗材</td><td>校区负责人</td><td>学期盘点表</td></tr>
</tbody></table></div>
<div class="kv" style="margin-top:18px">
  <k>正常损耗</k><v>杜邦线、螺丝、结构件属于正常损耗，<b>不向家长收费</b></v>
  <k>人为损坏</k><v>反插烧板、带电短接、丢失套件，按成本价 60% 收取，首次可免</v>
  <k>自然老化</k><v>电池鼓包、传感器漂移，机构承担更换</v>
</div>`;

const safety = `
<div class="check">
  <div class="c"><i>✓</i><span><b>全程 5V / 7.4V 低压</b>：不接市电、不做 220V 强电实验，任何"家电改装"类项目一律不做。</span></div>
  <div class="c"><i>✓</i><span><b>锂电池单独管理</b>：防爆袋存放、不过充、鼓包立即停用并隔离。</span></div>
  <div class="c"><i>✓</i><span><b>工具限定</b>：只用钝头螺丝刀、斜口钳；不提供电烙铁（除 L4 竞赛班，需老师在场）。</span></div>
  <div class="c"><i>✓</i><span><b>两人一组互相检查</b>：上电前必须同伴复核，减少一个人闷头接错的可能。</span></div>
  <div class="c"><i class="x">×</i><span><b>禁止</b>：自带充电宝给主控板供电、拆解电池、把传感器插到非指定接口。</span></div>
</div>`;

const body =
  sec({
    kicker: "器材",
    h2: "两套器材，各自解决什么问题",
    intro: "硬件课的价值不在「零件多」，而在孩子能不能把「传感器读数」变成「程序里的一个条件」。",
    content: kits,
  }) +
  sec({
    kicker: "开箱验收",
    h2: "课前 10 分钟，固定 12 项",
    intro: "这 12 项不是给老师看的，是让孩子自己养成「上电前先检查」的习惯。",
    content: checkin,
  }) +
  sec({
    kicker: "使用规范",
    h2: "五条动作规范，比讲十遍原理有用",
    content: rules,
  }) +
  sec({
    kicker: "维护与损耗",
    h2: "坏了怎么算，提前说清楚",
    intro: "器材损耗是最容易产生纠纷的地方。我们把周期、责任、赔付口径写在报名前。",
    content: maintain,
  }) +
  sec({
    kicker: "安全边界",
    h2: "我们做什么，明确不做什么",
    content: safety,
  });

const faq = [
  faqItem("需要家长自己买器材吗？", "不需要。L2 硬件模块与 L4 竞赛套件都由校区提供，耗材含在学费里。只有竞赛套件带回家备赛需付押金。"),
  faqItem("孩子把板子烧了要赔吗？", "看原因。反插、带电短接这类人为损坏按成本价 60% 收取，第一次免；正常老化与元件失效由机构承担。"),
  faqItem("硬件课会不会耽误写代码？", "L2 的硬件模块只有 12 课时，占比四分之一。它的作用是让孩子看到「程序能控制真实世界」，反而提升后面的编程兴趣。"),
  faqItem("女生学硬件会不会不适应？", "课堂上男女混班，两人一组轮换角色。按我们近三年的数据，女生在「接线规范」和「记录」两项上的完成度普遍更高。"),
].join("\n");

const cta = {
  title: "硬件课适不适合，来上一节就知道",
  text: "试听课可以选硬件主题：孩子会接线、烧录、让一个传感器真正动起来。能不能坐得住、敢不敢动手，一节课就看出来了。",
  btn: "预约硬件试听",
};

export const html = shell({
  file: "hardware.html",
  title: "教具与硬件 · 码跃少儿编程",
  desc: "L2 与 L4 两套器材清单、课前 12 项开箱验收、五条使用规范、维护周期与损耗赔付口径，以及明确不做的强电与拆解边界。",
  tagline: "教具与硬件",
  eyebrow: "教具与硬件",
  h1: "硬件课不是拼装课，<br>是让程序<em>真的动起来</em>",
  lead: "家长担心两件事：器材要不要自己买、孩子会不会弄坏。这一页把清单、验收、规范、赔付口径全部摊开写。",
  stats,
  body,
  faq,
  cta,
});
