import { shell, sec, faqItem } from "./layout.mjs";

const stats = `
<div class="n"><b>4 种</b><span>图形化 / Python / C++ / 硬件积木</span></div>
<div class="n"><b>5 步</b><span>从保存到分享，孩子自己走完</span></div>
<div class="n"><b>3 件</b><span>每个阶段归档的作品</span></div>
<div class="n"><b>归孩子</b><span>作品版权，机构展示需授权</span></div>`;

const editors = `
<div class="table-wrap"><table class="matrix">
<thead><tr><th>编辑器</th><th>对应阶段</th><th>能做什么</th><th>限制</th></tr></thead>
<tbody>
<tr><th>图形化编辑器</th><td>L1–L2</td><td>积木编程、角色与舞台、克隆与广播、录音与绘图</td><td>不开放底层脚本接口，避免孩子绕开积木直接改代码</td></tr>
<tr><th>Python 编辑器</th><td>L3</td><td>标准语法、turtle 绘图、文件读写、第三方库（白名单内）</td><td>不装任意 pip 包，防止环境被改坏</td></tr>
<tr><th>C++ 编辑器</th><td>L4</td><td>标准 C++17、编译运行、样例对拍、复杂度提示</td><td>不开系统调用与网络接口</td></tr>
<tr><th>硬件积木</th><td>L2 / L4 硬件课</td><td>主控板烧录、传感器读数、舵机与灯带控制</td><td>需要连接指定型号主控板，网页端不能直接烧录</td></tr>
</tbody></table></div>
<div class="note"><b>为什么限制这么多：</b>孩子的作品要能"自己跑起来"，就不能依赖一堆来路不明的插件。限制是为了让每一份作品在换一台电脑后仍然打开即用。</div>`;

const publish = `
<div class="steps">
  <div class="stp"><span class="k">01</span><div><h4>保存</h4><p>编辑器每 3 分钟自动存一次，也可以手动存。命名规则「L2-第18课-打地鼠」，方便一年后还找得到。</p></div></div>
  <div class="stp"><span class="k">02</span><div><h4>写简介</h4><p>三行：这是什么、怎么玩、我遇到的最大问题是什么。写不出来说明自己还没想清楚，老师会退回来让补。</p></div></div>
  <div class="stp"><span class="k">03</span><div><h4>发布到作品库</h4><p>选择可见范围：仅自己 / 本班 / 全站。默认是本班，家长可以关掉"全站可见"。</p></div></div>
  <div class="stp"><span class="k">04</span><div><h4>生成分享页</h4><p>自动生成手机 H5 链接，发到家庭群就能玩。分享页不带机构广告，只带作者署名。</p></div></div>
  <div class="stp"><span class="k">05</span><div><h4>进作品集</h4><p>每阶段挑 3 件进正式作品集，其余留在作品库。作品集是毕业展与阶段报告的素材来源。</p></div></div>
</div>`;

const creative = `
<div class="two">
  <div class="box"><h4>创意区里能做什么</h4><ul>
    <li><b>看同年龄段的作品</b>：按阶段与年级过滤，不看"全站热门"</li>
    <li><b>点赞与留言</b>：留言需审核后展示，恶意留言直接屏蔽</li>
    <li><b>改编他人作品</b>：可"克隆一份到自己的编辑器"，原作品不会被改</li>
    <li><b>参加主题活动</b>：每月一个主题（如"做一个垃圾分类器"），自愿参加</li>
  </ul></div>
  <div class="box"><h4>创意区里不做什么</h4><ul>
    <li><b>不做排行榜</b>：点赞数不排名，避免孩子为流量改作品</li>
    <li><b>不开私信</b>：孩子之间不能私聊，只能在作品下留言</li>
    <li><b>不展示真实姓名</b>：对外只显示昵称 + 年级段</li>
    <li><b>不允许打赏与付费</b>：任何形式的变现入口都不开</li>
  </ul></div>
</div>`;

const showcase = `
<div class="kv">
  <k>每阶段 3 件</k><v>一件"技术最难的"、一件"自己最满意的"、一件"改了最多版的"，三件都要能当场演示</v>
  <k>毕业展</k><v>每学期末一次，孩子自己讲 3 分钟：做了什么、卡在哪、怎么解决的。<b>家长坐下面听，老师不代讲</b></v>
  <k>归档格式</k><v>作品链接 + 源码 + 一段 200 字说明，打包进学员档案，结课后仍可访问 12 个月</v>
  <k>不外发的</k><v>未完成作品、课堂练习草稿、被退回重做的版本，都不进作品集</v>
</div>`;

const home = `
<div class="three">
  <div class="box"><h4>在家打开需要什么</h4><ul>
    <li>一台能上网的电脑（Windows / macOS 均可）</li>
    <li>Chrome 或 Edge 浏览器，版本不低于 100</li>
    <li>屏幕不小于 13 英寸，避免积木区被挤成一条</li>
  </ul></div>
  <div class="box"><h4>能不能离线</h4><ul>
    <li>图形化作品可导出为 HTML，双击就能玩</li>
    <li>Python / C++ 作品需联网运行</li>
    <li>硬件课必须到校区，器材不外借</li>
  </ul></div>
  <div class="box"><h4>家长要不要盯着</h4><ul>
    <li>不需要全程陪，建议每天固定 20 分钟</li>
    <li>不要替孩子改代码，卡住让他先讲思路</li>
    <li>作品做完，让他演示给你看，比检查代码有用</li>
  </ul></div>
</div>`;

const rights = `
<div class="check">
  <div class="c"><i>✓</i><span><b>作品版权归孩子</b>：我们只在两种情况下展示——家长书面授权，或作品入选毕业展且当场确认。</span></div>
  <div class="c"><i>✓</i><span><b>素材来源可查</b>：内置素材库均为自制或已授权，孩子也可上传自己的图片与录音，上传即确认拥有使用权。</span></div>
  <div class="c"><i>✓</i><span><b>结课不删作品</b>：账号休眠后作品保留 12 个月，家长可随时申请打包下载。</span></div>
  <div class="c"><i class="x">×</i><span><b>不做的事</b>：不拿孩子作品做招生海报、不参加需要转让版权的比赛、不把作品卖给第三方素材库。</span></div>
</div>`;

const body =
  sec({
    kicker: "编辑器",
    h2: "四种编辑器，各自的能力与限制",
    intro: "同一套账号，从拖积木到写 C++，编辑器跟着阶段换，作品库是同一个。",
    content: editors,
  }) +
  sec({
    kicker: "发布流程",
    h2: "从做完到能发给爷爷奶奶，五步",
    intro: "很多孩子会写但不会「交付」。发布流程本身就是一次训练：命名、写说明、选可见范围。",
    content: publish,
  }) +
  sec({
    kicker: "创意区",
    h2: "可以看到人的作品，但不能私聊",
    intro: "同伴作品是最好的激励，也是最容易出事的地方。规则写在前面。",
    content: creative,
  }) +
  sec({
    kicker: "作品集",
    h2: "每个阶段，只留三件",
    content: showcase,
  }) +
  sec({
    kicker: "家庭侧",
    h2: "在家里怎么打开、要不要陪着",
    content: home,
  }) +
  sec({
    kicker: "版权",
    h2: "作品是孩子的，不是机构的",
    content: rights,
  });

const faq = [
  faqItem("孩子的作品能拿去参加校内比赛吗？", "可以，作品版权归孩子。需要机构出证明或指导老师署名的，教务配合开。"),
  faqItem("作品库会不会被别人抄？", "可以「克隆一份」学习，但不能直接改原作品。所有改编作品会标注「改编自 XXX」，这是创意区的基本规则。"),
  faqItem("孩子想用自己画的图做素材，可以吗？", "可以。支持上传 PNG/JPG 与录音，上传时勾选「我拥有使用权」。涉及他人肖像的图片会被退回。"),
  faqItem("毕业展必须参加吗？", "不强制，但建议参加。讲 3 分钟这件事，对表达能力的训练不比写代码少。不参加不影响阶段结业。"),
].join("\n");

const cta = {
  title: "看一眼孩子真正做出来的东西",
  text: "试听课结束，孩子会带走一个能跑的小作品（可导出 HTML）。这比看一百张宣传图更能判断他喜不喜欢。",
  btn: "预约免费试听",
};

export const html = shell({
  file: "studio.html",
  title: "作品与创作 · 码跃少儿编程",
  desc: "四种编辑器的能力与限制、作品从保存到分享的五步、创意区的可见与不可见规则、每阶段三件作品的归档方式、家庭使用与版权归属。",
  tagline: "作品与创作",
  eyebrow: "孩子做出什么",
  h1: "作品不是一张截图，<br>是<em>换台电脑也能跑起来的东西</em>",
  lead: "家长判断课程质量，最直接的方式是看孩子做出了什么。这一页讲清楚：用什么工具做、怎么发布、作品归谁、在家里怎么打开。",
  stats,
  body,
  faq,
  cta,
});
