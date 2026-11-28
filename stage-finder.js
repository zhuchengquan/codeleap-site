(function () {
  var root = document.getElementById('finder');
  if (!root) return;

  var res = document.getElementById('res');
  var hint = document.getElementById('hint');
  var ans = { grade: null, exp: null, solo: null, math: null };

  var V = {
    grade: { g12: 0, g34: 1, g56: 2, g7: 3 },
    exp: { none: 0, scr: 1, lang: 2 },
    solo: { try: 1, ask: 0.5, give: 0 },
    math: { frac: 1, int: 0.5, none: 0 }
  };

  var TXT = {
    grade: { g12: '小学 1–2 年级', g34: '小学 3–4 年级', g56: '小学 5–6 年级', g7: '初一及以上' },
    exp: { none: '没有接触过编程', scr: '玩过图形化编程', lang: '学过一段 Python 或 C++' },
    solo: { try: '遇到难题会自己先试', ask: '肯动手但习惯先问人', give: '遇到难题习惯等人帮' },
    math: { frac: '数学已学到分数与方程', int: '整数四则没问题', none: '除法还不熟' }
  };

  var INFO = {
    L1: { href: 'course-l1.html', full: '启蒙 · 图形化', why: '图形化起步，先建立「先做什么、再做什么」的顺序概念，不急着换语言。' },
    L2: { href: 'course-l2.html', full: '图形化 + 硬件', why: '图形化加硬件，把「变量」和「条件」变成看得见的东西，这是后面所有语言的地基。' },
    L3: { href: 'course-l3.html', full: 'Python · 项目', why: '直接进 Python，前 8 课时重点看能不能把需求拆成函数，拆不动就先补结构。' },
    L4: { href: 'course-l4.html', full: 'C++ · 算法', why: '进 C++ 与算法，先确认数学底：分数、方程、复杂度估算要能跟上。' }
  };

  function pick(k, v) {
    ans[k] = v;
    root.querySelectorAll('[data-k="' + k + '"] .opt').forEach(function (b) {
      b.classList.toggle('on', b.dataset.v === v);
    });
    update();
  }

  function update() {
    var done = ans.grade && ans.exp && ans.solo && ans.math;
    if (!done) {
      var left = 0;
      Object.keys(ans).forEach(function (k) { if (!ans[k]) left += 1; });
      res.hidden = true;
      hint.hidden = false;
      hint.textContent = '还差 ' + left + ' 题。结果只作参考，不替代入学测评。';
      return;
    }

    var score = V.grade[ans.grade] + V.exp[ans.exp] * 1.5 + V.solo[ans.solo] + V.math[ans.math];
    var lv = 'L1';
    if (score >= 6.5) lv = 'L4';
    else if (score >= 4.5) lv = 'L3';
    else if (score >= 2.5) lv = 'L2';

    var reason = TXT.grade[ans.grade] + '、' + TXT.exp[ans.exp] + '、' + TXT.solo[ans.solo] + '、' + TXT.math[ans.math] + '。按这四项算下来是 ' + score + ' 分，落在 ' + lv + ' 档：' + INFO[lv].why;

    var warn = '';
    if (ans.solo === 'give' && ans.exp === 'none') {
      warn = '提醒：零基础且遇到难题习惯等人帮，建议先上一次「自己试 15 分钟」的体验课，确认愿意动手再定班。';
    } else if (lv === 'L4' && ans.math !== 'frac') {
      warn = '提醒：数学还没到分数与方程，直接进 L4 容易变成背模板。建议先补 4 次数学专题，再进算法模块。';
    } else if (ans.grade === 'g12' && ans.exp === 'none') {
      warn = '提醒：6–8 岁零基础，建议先体验两次再正式开课，先看孩子能不能坐住 90 分钟。';
    }

    res.innerHTML =
      '<div class="lv"><i>建议起点</i><b>' + lv + '</b><span>' + INFO[lv].full + '</span></div>' +
      '<p>' + reason + '</p>' +
      '<div class="acts">' +
        '<a class="btn-primary" href="' + INFO[lv].href + '">看 ' + lv + ' 的课程页</a>' +
        '<a class="btn" href="index.html#trial">预约入学测评</a>' +
        '<a class="btn" href="plan-calculator.html">算课时与费用</a>' +
        '<a class="btn" href="level-test.html">做八道题测底子</a>' +
      '<a class="btn" href="study-mode.html">五道题：自学还是报班</a>' +
        '<a class="btn" href="curriculum-map.html">看课程 × 考级</a>' +
      '</div>' +
      (warn ? '<div class="warn">' + warn + '</div>' : '');
    res.hidden = false;
    hint.hidden = true;
  }

  root.addEventListener('click', function (e) {
    var b = e.target.closest('.opt');
    if (!b) return;
    var q = b.closest('.q');
    if (!q) return;
    pick(q.dataset.k, b.dataset.v);
  });

  update();
})();
