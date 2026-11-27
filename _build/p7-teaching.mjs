import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>7 步</b><span>备课流程，每步都有产出</span></div>
<div class="n"><b>90 分钟</b><span>切成 6 段，误差不超过 5 分钟</span></div>
<div class="n"><b>4 类</b><span>试听 / 正课 / 补课 / 赛前</span></div>
<div class="n"><b>24 小时</b><span>课后必须完成的三个动作</span></div>`;

const slice = `
<div class="timeline">
  <div class="tl"><div class="when">00–05</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>报到与开机</h4><p>签到、领器材、打开上次的作品。这 5 分钟不讲课，用来把孩子从「课间状态」拉进「工作状态」。</p></div></div>
  <div class="tl"><div class="when">05–15</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>回顾与提问</h4><p>抽 3 个孩子复述上次做了什么、卡在哪。答不上来不批评，记在学情表里，当堂补一句。</p></div></div>
  <div class="tl"><div class="when">15–40</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>新知识（只讲一个点）</h4><p>一节课只引入一个新概念，配一个 30 秒可演示的例子。讲完立刻让孩子照着做一遍，不等到最后。</p></div></div>
  <div class="tl"><div class="when">40–70</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>动手任务（分层）</h4><p>同一个任务给三档要求：完成基础、加一个变化、自己设计一个新规则。先完成基础的，才能领下一档。</p></div></div>
  <div class="tl"><div class="when">70–85</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>展示与互评</h4><p>抽 2–3 个作品投屏，作者讲 60 秒，其他孩子提一个具体建议。老师只补充「为什么这样更好」。</p></div></div>
  <div class="tl"><div class="when">85–90</div><div class="rail"><span class="dot"></span></div><div class="what"><h4>收纳与预告</h4><p>器材归位、保存提交、说明下节课做什么。收纳由孩子自己做，助教检查，不代劳。</p></div></div>
</div>
<div class="note"><b>为什么把时间切死：</b>新老师最常见的失误是「讲得太久、动手太晚」。讲到 40 分钟还没让孩子碰键盘，这节课基本就废了。切片是给老师的硬约束，不是给家长的表演。</div>`;

const prep = `
<div class="steps">
  <div class="stp"><span class="k">01</span><div><h4>读教案，也读上一节的报告</h4><p>教案是底稿不是剧本。先看这个班上次的学情记录：谁卡在循环、谁已经能自己加音效。备课从「这个班」出发，不从「这节课」出发。</p></div></div>
  <div class="stp"><span class="k">02</span><div><h4>把案例代码自己跑一遍</h4><p>老师必须亲手从零写一次当堂案例，包括故意写错一次再修好。没跑过的案例，上课一定会在某个孩子的电脑上出问题。</p></div></div>
  <div class="stp"><span class="k">03</span><div><h4>标出三个「必然卡点」</h4><p>每节课预判三个孩子大概率会卡的地方（坐标方向、变量作用域、括号层级），并给每个卡点准备一句提示语，而不是直接给答案。</p></div></div>
  <div class="stp"><span class="k">04</span><div><h4>准备分层任务的三档</h4><p>基础档保证最慢的孩子也能完成；加一档给学得快的；挑战档留给已经会的人，避免他们闲着去打扰别人。</p></div></div>
  <div class="stp"><span class="k">05</span><div><h4>器材与账号预检</h4><p>硬件课按 12 项验收走一遍；软件课提前登录三个测试账号，确认案例库、OJ、作品库都能打开。</p></div></div>
  <div class="stp"><span class="k">06</span><div><h4>写一句「今天只教一件事」</h4><p>写在教案最上面。这节课结束时，如果孩子说不出这句话，说明讲散了。</p></div></div>
  <div class="stp"><span class="k">07</span><div><h4>课后 10 分钟自评</h4><p>三个问题：哪一段超时了、哪个孩子没被点到、哪个环节可以删。写进教研共享表，下周磨课会用。</p></div></div>
</div>`;

const plan = `
<div class="kv">
  <k>本节目标</k><v>一句话，可验证。例：能用「重复执行 10 次」画出一个正方形。</v>
  <k>新概念</k><v>只填一个。填两个说明这节课设计超载了。</v>
  <k>前置检查</k><v>上节课的关键操作，用 2 个提问确认，不假设孩子还记得。</v>
  <k>案例</k><v>一个可演示、可拆解、可改造的小作品，代码不超过 40 行。</v>
  <k>分层任务</k><v>基础 / 加一档 / 挑战，三档各写一句完成标准。</v>
  <k>预判卡点</k><v>三个，每个配一句提示语（不给答案）。</v>
  <k>观察重点</k><v>这节课要盯的 2 个孩子，以及盯什么行为。</v>
  <k>课后动作</k><v>报告写什么、作业留什么、给家长的一句话是什么。</v>
</div>
<div class="note"><b>教案不是越详细越好：</b>超过两页的教案，老师上课不会看。我们的模板固定一页 A4，八个字段，写不满就说明没想清楚。</div>`;

const types = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>课型</th><th>目标</th><th>结构差异</th><th>不能做的事</th></tr></thead>
<tbody>
<tr><th>试听课</th><td>让孩子做出一个能带走的东西，让家长看到课堂真实状态</td><td>砍掉回顾与互评，把动手时间拉到 45 分钟，结尾留 10 分钟给家长</td><td>不测评打分、不推销课包、不当场逼单</td></tr>
<tr><th>正课</th><td>按大纲推进，保证每个孩子当堂完成基础档</td><td>完整六段切片，分层任务全开</td><td>不为了赶进度跳过动手、不拖堂</td></tr>
<tr><th>补课</th><td>补上缺的那一节的核心操作，不补全部内容</td><td>只讲一个卡点 + 一个针对性练习，30–45 分钟</td><td>不重复上整节课、不占用正课时间</td></tr>
<tr><th>赛前集训</th><td>限时、独立、一次做对</td><td>整套模拟 + 讲评，讲评占一半时间</td><td>不现场查资料、不互相讨论、不逐题讲解到会</td></tr>
</tbody></table></div>`;

const trouble = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>现场状况</th><th>先做什么</th><th>不要做什么</th></tr></thead>
<tbody>
<tr><th>孩子卡住 10 分钟不动</th><td>让他说出「你想让它做什么」，再问他「现在它做了什么」</td><td>直接上手替他改代码</td></tr>
<tr><th>孩子哭了 / 说不想学</th><td>先停任务，带到旁边聊 2 分钟，问是「不会」还是「不想」</td><td>当众安慰或当众批评</td></tr>
<tr><th>两个孩进度差一倍</th><td>给快的加一档任务，给慢的减到基础档，不拉平</td><td>让快的等慢的，或让慢的抄快的</td></tr>
<tr><th>设备中途坏掉</th><td>换备用机，孩子转到纸面画流程图，不让他空着</td><td>全班停下来修设备</td></tr>
<tr><th>孩子抢答、挤占发言</th><td>改成随机点名，明确「每人一次」</td><td>点名批评「你怎么老是抢」</td></tr>
<tr><th>家长旁听时不断提问</th><td>课后统一答疑，课上只回应与孩子任务相关的问题</td><td>课上与家长讨论价格与进度</td></tr>
</tbody></table></div>`;

const after = `
<div class="check">
  <div class="c"><i>1</i><span><b>当天写完课堂报告</b>：参与度、卡点、下节课建议三项，不超过 150 字，不写「表现良好」这类空话</span></div>
  <div class="c"><i>2</i><span><b>批改作业并给一句具体反馈</b>：指出一处可以改的地方，不写「很棒」了事</span></div>
  <div class="c"><i>3</i><span><b>给家长一句话</b>：这节课孩子具体做到了什么，一句话即可，不发模板长文</span></div>
</div>
<div class="note"><b>24 小时是底线：</b>超过 24 小时再发报告，家长已经记不清课上发生了什么，报告就变成了形式。</div>`;

const fragment = `
<div class="tiles g2">
  <div class="tile"><i>片段 01</i><h4>第一次写循环</h4><p>孩子把「重复 10 次」写成「移动 10 步」，画出十条重叠的线。不纠正，让他自己数一遍屏幕上的线，再问他「你想让它在哪停」。</p></div>
  <div class="tile"><i>片段 02</i><h4>变量为什么是 0</h4><p>角色一直在原地。让孩子把变量显示打开，盯着数字看三次点击，他自己会发现「忘了加 1」。</p></div>
  <div class="tile"><i>片段 03</i><h4>作品跑不起来</h4><p>先问「在你自己电脑上能跑吗」，再问「换一台呢」。九成问题出在引用了本地的图片或插件。</p></div>
  <div class="tile"><i>片段 04</i><h4>赛前第一次模考</h4><p>全班的分数都低于平时。不讲题，先讲「限时状态下怎么读题」，再让他们重做第一题。</p></div>
</div>`;

const body =
  sec({
    kicker: "90 分钟",
    h2: "一节课切成六段，每段都有明确动作",
    intro: "家长看到的是一节课；老师执行的是一张时间表。切片的意义是让「讲多久、动手多久」不靠感觉。",
    content: slice,
  }) +
  sec({
    kicker: "备课",
    h2: "七步备课，每步都要有产出",
    intro: "备课不是把教案读一遍。七步走完，老师手上应该有：一份改过的案例、三个卡点提示、三档任务。",
    content: prep,
  }) +
  sec({
    kicker: "教案",
    h2: "一页 A4，固定八个字段",
    intro: "模板约束的是思考，不是字数。八个字段填不满，说明这节课还没想清楚。",
    content: plan,
  }) +
  sec({
    kicker: "课型",
    h2: "四种课，结构不一样",
    intro: "试听课不是「正课少讲一点」，补课也不是「再上一遍」。课型不同，目标与结构都要换。",
    content: types,
  }) +
  sec({
    kicker: "现场",
    h2: "六种常见状况，先做什么",
    intro: "课堂的大部分失控不是孩子的问题，是老师第一反应选错了。这张表是给新师的处置顺序。",
    content: trouble,
  }) +
  sec({
    kicker: "课后",
    h2: "下课不等于结束，24 小时内三件事",
    content: after,
  }) +
  sec({
    kicker: "课堂片段",
    h2: "四个真实片段，看老师怎么接",
    intro: "同样的错误，直接给答案和让孩子自己看见，效果差一整个阶段。",
    content: fragment,
  });

const faq = [
  faqItem("家长可以旁听吗？", "可以，提前和教务说一声。旁听时请坐在后排，不打断课堂、不给孩子递答案；课堂问题课后统一答疑。每学期还有一次专门的家长开放日。"),
  faqItem("孩子跟不上进度怎么办？", "先看是「这一节跟不上」还是「这个阶段跟不上」。前者用补课解决，后者要降阶重学。两种情况都不会让孩子在课上硬撑。"),
  faqItem("为什么一节课只讲一个新概念？", "少儿编程的难点不在概念数量，在「能不能用出来」。一节课一个概念、一个案例、三档任务，孩子才来得及自己动手。讲三个概念的那节课，通常三个都没学会。"),
  faqItem("老师会替孩子改代码吗？", "不会。老师只做三件事：让他复述目标、指出报错在哪一行、给一句提示。改代码这件事必须由孩子自己完成，否则下节课还是不会。"),
].join("\n");

const cta = {
  title: "想看看一节课到底怎么上？",
  text: "可以约一次试听，家长坐在后排完整看 90 分钟：从报到、回顾、新知识到动手与展示。看完再决定要不要报。",
  btn: "预约试听",
};

export const html = shell({
  file: "teaching.html",
  title: "备课与授课 · 码跃少儿编程",
  desc: "90 分钟怎么切成六段、备课七步各有什么产出、教案固定八个字段、四种课型的结构差异、六种课堂状况的处置顺序，以及课后 24 小时内必须做完的三件事。",
  tagline: "备课与授课",
  eyebrow: "一节课的内部",
  h1: "一节课好不好，<br>看的是<em>课前那七步</em>",
  lead: "家长看到的是 90 分钟；老师执行的是一张时间表、一页教案和三档任务。这一页把「备课—上课—课后」摊开，包括新师最容易做错的几个地方。",
  stats,
  body,
  faq,
  cta,
});
