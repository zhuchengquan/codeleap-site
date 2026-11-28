(function () {
  var box = document.getElementById('mode');
  if (!box) return;
  var run = document.getElementById('mRun');
  var hint = document.getElementById('mHint');
  var res = document.getElementById('mRes');

  var W = {
    q1: { A: 0, B: 1, C: 2 },
    q2: { A: 0, B: 1, C: 2, D: 0 },
    q3: { A: 0, B: 1, C: 2 },
    q4: { A: 0, B: 1, C: 2 },
    q5: { A: 0, B: 1, C: 1, D: 0 }
  };
  var ORDER = ['q1', 'q2', 'q3', 'q4', 'q5'];

  var answers = {};
  var picked = 0;

  Array.prototype.forEach.call(box.querySelectorAll('.q'), function (q) {
    var key = q.getAttribute('data-q');
    Array.prototype.forEach.call(q.querySelectorAll('.opt'), function (opt) {
      opt.addEventListener('click', function () {
        Array.prototype.forEach.call(q.querySelectorAll('.opt'), function (o) { o.classList.remove('on'); });
        opt.classList.add('on');
        if (!answers[key]) picked++;
        answers[key] = opt.getAttribute('data-v');
        refresh();
      });
    });
  });

  function refresh() {
    var left = 5 - picked;
    if (left > 0) {
      run.disabled = true;
      hint.textContent = '还有 ' + left + ' 题没选';
    } else {
      run.disabled = false;
      hint.textContent = '五题选完，点这里出结论';
    }
  }

  function flags() {
    var out = [];
    if (answers.q1 === 'C') out.push(['陪调试', '家里基本没人能坐下来看代码，错误反馈这一环是空的。']);
    else if (answers.q1 === 'B') out.push(['陪调试', '陪伴不稳定，卡点容易被拖成放弃。']);
    if (answers.q2 === 'C') out.push(['目标', '竞赛目标对时序要求高：报名窗口、赛前两个月，自己排容易错过。']);
    else if (answers.q2 === 'B') out.push(['目标', '考级要卡时间窗，信息本身不难，难在什么时候做。']);
    else if (answers.q2 === 'D') out.push(['目标', '目标还没定，这时候花钱容易花错方向。']);
    if (answers.q3 === 'C') out.push(['卡点', '正卡在同一处，继续加资源只会更乱，需要有人把坎拆小。']);
    if (answers.q4 === 'C') out.push(['节奏', '必须有人盯着才学，自学的外部条件不成立。']);
    else if (answers.q4 === 'B') out.push(['节奏', '靠提醒才动，固定时间需要外部约定。']);
    if (answers.q5 === 'B') out.push(['班源', '有班但远或者贵，到场率会打折，线上直播要一起算。']);
    else if (answers.q5 === 'C') out.push(['班源', '本地没有合适的班，报班不是「想不想」而是「有没有」。']);
    return out;
  }

  function decide(score) {
    if (answers.q2 === 'D' && score >= 3) return 'diag';
    if (score >= 7) return 'diag';
    if (score >= 4) return 'class';
    if (score >= 2) return 'hybrid';
    return 'self';
  }

  var COPY = {
    self: {
      lv: '纯自学就够', sub: '不必报班，把钱和时间省下来',
      text: '家里能接住反馈、孩子自己能排节奏、目标只是兴趣——自学的四个条件基本成立。接下来需要的不是课，是固定的产出与每四周一次复盘。',
      acts: [
        ['先自检一遍自学条件', 'blog-self-study.html'],
        ['四道题定起点，再按级别找免费资源', 'stage-finder.html'],
        ['八道题测一下底子', 'level-test.html']
      ],
      warn: '改判条件：连续四周交不出一个能演示的作品。出现这个信号，说明缺的是外部节奏，不是资源。'
    },
    hybrid: {
      lv: '自学 + 少量付费', sub: '平时自学，只在关键节点花钱',
      text: '自学的大框架成立，但有一两处缺口：可能是一个正卡着的点，也可能是一个要卡的报名窗口。把预算集中在这两处，比整期报班更划算。',
      acts: [
        ['一次两课时的诊断，把坎指出来', 'index.html#trial'],
        ['考级前 4–6 周报集训（约 8 课时）', 'camp.html'],
        ['按起点算一下集训与整期的差价', 'plan-calculator.html']
      ],
      warn: '改判条件：诊断后四周仍卡在同一处，说明缺口比预想的大，该考虑整期班。'
    },
    class: {
      lv: '建议报班', sub: '缺两样以上，优先 6 人小班',
      text: '反馈、节奏、同伴里缺了两样以上，靠家里补成本很高。这个阶段报班买的是「每周固定一次、有人接手错误、有人一起做」，不是知识本身。',
      acts: [
        ['用五个问题核一遍机构（别只听介绍）', 'blog-self-study.html'],
        ['先试听一次，重点看孩子的手', 'index.html#trial'],
        ['按起点与目标算课时与总价', 'plan-calculator.html']
      ],
      warn: '不建议一对一：这个年龄段，同伴的作用常常大于老师多讲二十分钟。'
    },
    diag: {
      lv: '先诊断再决定', sub: '目标和卡点不清，先别花大钱',
      text: '风险项叠了三层以上，或者目标还没定就先看到了卡点。这时候最该买的不是课，是一次能说清「起点在哪、卡在哪一层」的诊断。',
      acts: [
        ['预约 30 分钟入学测评（免费）', 'index.html#trial'],
        ['先想清楚这一年要不要证书', 'curriculum-map.html'],
        ['拿不准就先做八道题', 'level-test.html']
      ],
      warn: '在诊断结论出来之前，不建议先买整期课包；定金与锁定班型的优惠都可以等。'
    }
  };

  run.addEventListener('click', function () {
    var score = 0;
    ORDER.forEach(function (k) { score += W[k][answers[k]] || 0; });
    var key = decide(score);
    var c = COPY[key];
    var f = flags();
    var list = f.length
      ? f.map(function (x) { return '<div><b>' + x[0] + '：</b>' + x[1] + '</div>'; }).join('')
      : '<div>五项都没有明显缺口。按纯自学走，每四周复查一次即可。</div>';
    var acts = c.acts.map(function (a, i) {
      return '<a class="' + (i === 0 ? 'btn-primary' : 'btn') + '" href="' + a[1] + '">' + a[0] + '</a>';
    }).join('');

    res.innerHTML =
      '<div class="lv"><i>结论</i><b>' + c.lv + '</b><span>' + c.sub + '</span></div>' +
      '<div class="sums"><div><b>' + score + '/9</b><span>风险分（越高越需要外部支持）</span></div><div><b>' + f.length + '</b><span>被点亮的缺项</span></div></div>' +
      '<p>' + c.text + '</p>' +
      '<div class="list">' + list + '</div>' +
      '<div class="acts">' + acts + '</div>' +
      '<div class="warn">' + c.warn + '</div>';
    res.hidden = false;
    res.scrollIntoView({ block: 'nearest' });
  });

  refresh();
})();
