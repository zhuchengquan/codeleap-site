import { shell, sec, faqItem } from './layout.mjs';

const t = (no, href, title, desc) => `<a class="tile" href="${href}" style="display:block"><i>${no}</i><h4>${title}</h4><p>${desc}</p></a>`;

const find = `
<div class="tiles g2">
${t('01', 'stage-finder.html', '四道题定起点', '按年龄、专注时长、数学基础、家里能不能陪，给出「从哪一级起」和「先补什么」。四题两分钟，不跳报名页。')}
${t('02', 'level-test.html', '水平小测 8 题', '八道代码阅读与逻辑题，判 L1–L4 四档。适合已经学过一阵、不知道现在排第几的孩子。')}
${t('03', 'study-mode.html', '自学还是报班', '五道题按「陪调试、目标、卡点、节奏、班源」给四种结论：纯自学、自学加少量付费、建议报班、先诊断。')}
${t('04', 'plan-calculator.html', '课时与费用粗算', '输入级别、班型、人数与学期数，算出课时、原价与优惠后的实付，并列清每一项减免从哪来。')}
${t('05', 'curriculum-map.html', '课程 × 考级对照', 'L1–L4 与 GESP、CSP-J/S 的对应关系，四种排课节奏（稳扎、压缩、竞赛、插班），以及每条路的代价。')}
</div>`;

const course = `
<div class="tiles g2">
${t('06', 'course-l1.html', 'L1 启蒙 · 6–8 岁', '顺序、循环、条件判断、广播与多角色。48 课时，每节课一个能演示的作品，前四次不急着打开电脑。')}
${t('07', 'course-l2.html', 'L2 进阶 · 8–10 岁', '变量、列表、克隆、广播、传感器与阈值。从「照着做」过渡到「自己拆」，开始写稍长的程序。')}
${t('08', 'course-l3.html', 'L3 Python · 9–12 岁', '语法与结构、函数、列表字典、文件、模拟与枚举。重点是读报错、自己定位，而不是背语法。')}
${t('09', 'course-l4.html', 'L4 竞赛 · 11–16 岁', '数组与字符串、排序查找、递归搜索、复杂度与边界。CSP-J 第一题难度独立过题，接 GESP 6–8 级。')}
${t('10', 'assessment.html', '测评体系', '入学测评、阶段测评、赛前模拟三套口径；报告三行读法：现在在哪、卡在哪、下一步练什么。')}
${t('11', 'results.html', '学员成果', '2023–2026 逐年奖项与参赛人次、赛事分布、数据口径表，以及「我们不统计什么」。')}
</div>`;

const deliver = `
<div class="tiles g2">
${t('12', 'teaching.html', '备课与授课', '一节课的七件套：目标、例题、易错点、分层任务、时间切片、作业、复盘；以及 12 个技术问题的处理口径。')}
${t('13', 'team.html', '师资与教研', '四个角色各管一段、三道关与 60+40 小时培训、教案八字段、录像复盘、家长开放课，以及家长怎么核的三问。')}
${t('14', 'platform.html', '平台与课堂', '三类账号与权限、一节课留下的六条记录、四个工具各自解决什么问题，以及孩子数据的五条硬规则。')}
${t('15', 'studio.html', '作品与创作', '四种编辑器的能力与限制、从做完到发给爷爷奶奶的五步、作品归孩子所有，以及家里怎么打开。')}
${t('16', 'hardware.html', '教具与硬件', '两套器材各解决什么问题、课前 10 分钟 12 项检查、五条动作规范、损坏怎么算，以及我们明确不做什么。')}
${t('17', 'camp.html', '假期集训', '按水平分营不按年龄硬排；三个营五天的逐日交付物、结营两小时怎么展示、报名前六件事、携带清单与退改口径。')}
</div>`;

const enroll = `
<div class="tiles g2">
${t('18', 'admissions.html', '招生与学员', '从咨询到开班的六个环节漏斗、每个环节给什么、什么情况下我们劝你先别报。')}
${t('19', 'enroll.html', '在线报名', '四步填表、试听与分班安排、缴费与开票口径。留信息只用于排课，不做二次营销。')}
${t('20', 'brochure.html', '招生简章（网页版）', 'A4 两页可打印版，另有 5 页 PDF：课程体系、师资与教研、价格与条款、报名与到店。')}
${t('21', 'pricing.html', '价格与优惠', '四个级别的线下线上价目表、四条优惠只取一条的到手价、三个退费算例、付款与发票、五个常见价格误解，以及自己算一遍的入口。')}
${t('22', 'legal.html', '政策与条款', '退费、转班、请假补课、隐私与数据使用。每一条都写清时限、算法和办结天数。')}
${t('23', 'campus.html', '校区与到店', '三个校区的地址、门牌、交通与停车、可约时段，以及来一次会经历什么。')}
${t('24', 'family.html', '家校沟通', '课堂报告多久一次、家长会开什么、孩子卡住时先找谁、投诉走哪条线、多久有回音。')}
${t('25', 'operations.html', '校区运营', '排课、请假、补课、设备与安全的日常口径，六个运营指标看板，以及出问题时的处理顺序。')}
${t('26', 'parent.html', '家长中心（演示）', '家长端能看到什么：课时进度、下次课、课堂报告、作品集、赛事提醒与推荐好友；页尾教家长按周/当月节奏读档案、三种该沟通的信号。')}
</div>`;

const reads = `
<div class="tiles g2">
${t('FAQ', 'faq.html', '四十个高频问题', '八类四十问：起点、进度、请假、老师、平台、竞赛、价格、线上；每条给数字与时限，另列六个我们答不上来的问题。')}
</div>
<div class="table-wrap"><table class="matrix">
<thead><tr><th style="width:44px">#</th><th style="width:210px">长文</th><th>解决哪个问题</th><th style="width:74px">读多久</th></tr></thead>
<tbody>
<tr><th>01</th><td><a href="blog-when-to-start.html">孩子几岁开始学编程合适</a></td><td>年龄不是门槛，能不能坐住、能不能读懂「顺序」才是；给三条可观察的信号。</td><td>9 分钟</td></tr>
<tr><th>02</th><td><a href="blog-gesp-1.html">GESP 一级怎么备</a></td><td>考什么、不考什么、八周怎么排、家长能帮到哪一步，附一张备考表。</td><td>11 分钟</td></tr>
<tr><th>03</th><td><a href="blog-after-scratch.html">Scratch 之后学什么</a></td><td>三条岔路（Python / C++ / 继续做作品）各自适合谁，以及转 C++ 的最佳时点。</td><td>10 分钟</td></tr>
<tr><th>04</th><td><a href="blog-format-choice.html">班型怎么选</a></td><td>一对一、6 人小班、大班直播、录播课的成本结构与真实差别，不吹小班万能。</td><td>10 分钟</td></tr>
<tr><th>05</th><td><a href="blog-competition-path.html">竞赛路径怎么排</a></td><td>从 GESP 到 CSP-J/S 再到 NOIP 的时序、每年关键窗口，以及中途掉队怎么接。</td><td>12 分钟</td></tr>
<tr><th>06</th><td><a href="blog-math.html">数学与编程的关系</a></td><td>哪些数学能力真的影响编程、哪些不影响；数学弱的孩子怎么绕开。</td><td>9 分钟</td></tr>
<tr><th>07</th><td><a href="blog-trial.html">试听课该看什么</a></td><td>看孩子动手时间、出错时老师的反应、有没有人走神；给一张当场可用的观察表。</td><td>8 分钟</td></tr>
<tr><th>08</th><td><a href="blog-online.html">线上课怎么上才有效</a></td><td>设备、网络、陪伴分工、屏幕共享与代码回收；线上最容易失效的三个环节。</td><td>10 分钟</td></tr>
<tr><th>09</th><td><a href="blog-quit.html">孩子不想学了怎么办</a></td><td>先分清是「卡住」还是「不喜欢」；四种卡点的不同处理，以及什么时候该停。</td><td>9 分钟</td></tr>
<tr><th>10</th><td><a href="blog-self-study.html">免费教程那么多，为什么还有人报班</a></td><td>自学真正缺的不是资料，是反馈、时序、同伴与作品出口；算一笔时间账。</td><td>13 分钟</td></tr>
</tbody></table></div>
<div class="note"><b>知识库入口：</b><a href="blog.html">十篇长文与 18 条速答</a> 是上面十篇的目录页，含 18 条一句话回答、RSS 订阅与按主题筛选。每篇文末都回到「下一步该做什么」，不留在读完就完。</div>`;

const byQuestion = `
<div class="tiles g2">
${t('FAQ', 'faq.html', '四十个高频问题', '八类四十问：起点、进度、请假、老师、平台、竞赛、价格、线上；每条给数字与时限，另列六个我们答不上来的问题。')}
</div>
<div class="table-wrap"><table class="matrix">
<thead><tr><th style="width:250px">你现在的处境</th><th>先看这一页</th><th>再看这一页</th></tr></thead>
<tbody>
<tr><th>孩子还小，不知道能不能学</th><td><a href="blog-when-to-start.html">几岁开始学</a></td><td><a href="stage-finder.html">四道题定起点</a></td></tr>
<tr><th>学过一阵，不知道排第几</th><td><a href="level-test.html">水平小测 8 题</a></td><td><a href="curriculum-map.html">课程 × 考级对照</a></td></tr>
<tr><th>想知道到底学什么、学完会什么</th><td><a href="curriculum-map.html">课程 × 考级对照</a></td><td><a href="course-l1.html">L1 课程页</a></td></tr>
<tr><th>学费多少、优惠怎么算</th><td><a href="plan-calculator.html">课时与费用粗算</a></td><td><a href="brochure.html">招生简章</a></td></tr>
<tr><th>犹豫要不要花钱报班</th><td><a href="study-mode.html">自学还是报班</a></td><td><a href="blog-self-study.html">免费教程与报班的差别</a></td></tr>
<tr><th>准备去试听，怕被话术带走</th><td><a href="blog-trial.html">试听课该看什么</a></td><td><a href="team.html#check">三个问题问出真实水平</a></td></tr>
<tr><th>在纠结线上还是线下</th><td><a href="blog-online.html">线上课怎么上</a></td><td><a href="platform.html">平台与课堂</a></td></tr>
<tr><th>要考 GESP，不知道从哪级报</th><td><a href="blog-gesp-1.html">GESP 一级怎么备</a></td><td><a href="curriculum-map.html">课程 × 考级对照</a></td></tr>
<tr><th>想走竞赛，但不知道时间够不够</th><td><a href="blog-competition-path.html">竞赛路径怎么排</a></td><td><a href="course-l4.html">L4 竞赛课</a></td></tr>
<tr><th>孩子最近说不想学了</th><td><a href="blog-quit.html">不想学了怎么办</a></td><td><a href="family.html">家校沟通</a></td></tr>
<tr><th>想核实老师和教研是不是真的</th><td><a href="team.html">师资与教研</a></td><td><a href="teaching.html">备课与授课</a></td></tr>
<tr><th>学完能做出什么、有什么凭证</th><td><a href="results.html">学员成果</a></td><td><a href="studio.html">作品与创作</a></td></tr>
<tr><th>想先弄清退费、转班、请假</th><td><a href="legal.html">政策与条款</a></td><td><a href="operations.html">校区运营</a></td></tr>
</tbody></table></div>`;

const body = [
  sec({
    kicker: '先定位',
    h2: '不知道从哪开始，先做这四件事',
    intro: '四个工具都不留电话、不跳报名页，做完直接给结论；第五张是课程 × 考级对照表，用来核对路径，不参与判断。它们解决的是不同的问题，别混着用。',
    content: find,
  }),
  sec({
    kicker: '看课程',
    h2: '四个级别，一条可核对的路径',
    intro: '每个级别都写清「练什么、不练什么、这一级结束能独立做到什么」。课程页不是宣传页，是可以拿来对照孩子进度的说明书。',
    content: course,
  }),
  sec({
    kicker: '看交付',
    h2: '课上怎么教，课后留下什么',
    intro: '这部分是最容易被话术糊过去的：谁来教、怎么备课、平台留什么记录、作品归谁、器材怎么管。每一页都尽量写到能核对的颗粒度。',
    content: deliver,
  }),
  sec({
    kicker: '做决定',
    h2: '报名前后会遇到的九件事',
    intro: '从咨询到开班、从缴费到退费，把流程、时限和例外都写在前面。看不清条款就先别交钱。',
    content: enroll,
  }),
  sec({
    kicker: '继续读',
    h2: '十篇长文，按问题排',
    intro: '不是资讯流，是十篇能读完、能拿去做决定的长文。每篇都有小标题、表格和「下一步」，可以只读其中一节。',
    content: reads,
  }),
  sec({
    kicker: '按处境查',
    h2: '十三种处境，各自该打开哪两页',
    intro: '如果你只想找一页，就从这张表进。左列是你的原话，右两列是先看与再看。',
    content: byQuestion,
  }),
];

const cta = {
  title: '地图看完了，还是不确定从哪一步开始？',
  text: '约一次 30 分钟入学测评：带孩子来，做四道题、写一小段代码，当场给一页报告——现在在哪、卡在哪、下一步练什么。免费，不报名也能只拿报告。',
  btn: '预约入学测评',
  href: 'index.html#trial',
};

const faq = [
  faqItem('这张地图是给人看的，还是给搜索引擎看的？', '给人看的。分组按「你现在的处境」而不是按文件目录：先定位、看课程、看交付、做决定、继续读。搜索引擎另有一份 sitemap.xml，两者不混用。'),
  faqItem('为什么有的页面没列进来？', '三类页不列：404 页、打印排版页（brochure-print.html）、内部存档页（manual.html，已 noindex 并被 robots 屏蔽）。它们是给机器或内部用的，不是给家长读的。'),
  faqItem('我只记得一句话，怎么找到它在哪一页？', '用站内搜索：右上角放大镜，或按 Ctrl+K、直接敲 /。索引 280 多条章节，命中后直接跳到那一段，不用逐页翻。'),
  faqItem('站点现在一共有多少内容？', '40 个可导航页面：9 个专题、4 个家长工具、11 篇知识库长文（含目录页）、4 个课程页，以及首页、价格与优惠、四十个高频问题、简章、条款、校区等。另有 5 页招生简章 PDF 与一份 RSS。所有数据均为演示口径。'),
].join('\n');

export const html = shell({
  file: 'site-map.html',
  title: '全站内容地图 · 码跃少儿编程',
  desc: '按处境而不是按目录排列的全站地图：四个家长工具、四个级别课程、教学与交付、报名与条款、十一篇知识库长文，以及十三种处境各自该看哪两页。',
  tagline: '全站地图',
  eyebrow: '内容地图',
  h1: '四十页，<br>按你<em>现在的处境</em>排',
  lead: '这个站点不按文件目录组织，按家长真正会遇到的顺序组织：先定位、再看课程、然后看交付、最后做决定。找不到入口时，从这张地图进。',
  stats: `<div class="n"><b>40</b><span>个可导航页面</span></div><div class="n"><b>4</b><span>个不用留电话的工具</span></div><div class="n"><b>11</b><span>篇知识库长文</span></div><div class="n"><b>13</b><span>种处境，各自两页</span></div>`,
  body: body.join('\n'),
  cta,
  faq,
});
