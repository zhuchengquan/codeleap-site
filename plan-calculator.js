(function () {
  var root = document.getElementById('calc');
  if (!root) return;

  var res = document.getElementById('res');
  var hint = document.getElementById('hint');
  var ans = { grade: null, base: null, goal: null, freq: null };

  var STAGE = {
    L1: { label: 'L1 图形化启蒙', off: 4980, on: 3980, min: 90 },
    L2: { label: 'L2 图形化与硬件', off: 4980, on: 3980, min: 90 },
    L3: { label: 'L3 Python 编程', off: 4980, on: 3980, min: 90 },
    L4: { label: 'L4 C++ 编程', off: 7980, on: 6480, min: 120 },
    J: { label: 'CSP-J 冲刺', off: 7980, on: 6480, min: 120 },
    S: { label: 'CSP-S 提高', off: 7980, on: 6480, min: 120 }
  };
  var CHAIN = ['L1', 'L2', 'L3', 'L4', 'J', 'S'];

  var START = {
    none: { g12: 'L1', g34: 'L1', g56: 'L2', g7: 'L3' },
    gfx: { g12: 'L1', g34: 'L2', g56: 'L2', g7: 'L3' },
    py: { g12: 'L2', g34: 'L3', g56: 'L3', g7: 'L4' }
  };
  var GOAL = { gesp3: 'L2', gesp6: 'L3', cspj: 'J', csps: 'S' };
  var GOALNAME = { gesp3: 'GESP 3 级', gesp6: 'GESP 6 级', cspj: 'CSP-J 复赛', csps: 'CSP-S 复赛' };
  var GRADENAME = { g12: '小学 1–2 年级', g34: '小学 3–4 年级', g56: '小学 5–6 年级', g7: '初一及以上' };

  function money(n) {
    return '¥' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function pick(k, v) {
    ans[k] = v;
    root.querySelectorAll('[data-k="' + k + '"] .opt').forEach(function (b) {
      b.classList.toggle('on', b.dataset.v === v);
    });
    update();
  }

  function update() {
    var left = 0;
    ['grade', 'base', 'goal', 'freq'].forEach(function (k) { if (!ans[k]) left += 1; });
    if (left) {
      res.hidden = true;
      hint.hidden = false;
      hint.textContent = '还差 ' + left + ' 项没选。粗算不含教材、考级报名费与异地参赛差旅。';
      return;
    }

    var start = START[ans.base][ans.grade];
    var target = GOAL[ans.goal];
    var si = CHAIN.indexOf(start);
    var ti = CHAIN.indexOf(target);
    hint.hidden = true;

    if (ti < si) {
      res.innerHTML =
        '<div class="lv"><i>目标已覆盖</i><b>' + GOALNAME[ans.goal] + '</b><span>按当前基础，不需要再走一遍</span></div>' +
        '<p>' + GRADENAME[ans.grade] + '、' + (ans.base === 'none' ? '零基础' : ans.base === 'gfx' ? '学过图形化' : '学过 Python') +
        '，建议起点已经在 ' + STAGE[start].label + '。这个位置已经覆盖了' + GOALNAME[ans.goal] + '需要的内容，可以先把目标上调一档，或直接用测评确认能否报考。</p>' +
        '<div class="acts">' +
          '<a class="btn-primary" href="index.html#trial">预约入学测评</a>' +
          '<a class="btn" href="stage-finder.html">四道题精测起点</a>' +
      '<a class="btn" href="study-mode.html">五道题：自学还是报班</a>' +
        '</div>' +
        '<div class="warn">提醒：这条提示只在「起点高于目标」时出现。若孩子实际水平低于问卷描述，仍可能要从更早的阶段补起，以测评结论为准。</div>';
      res.hidden = false;
      return;
    }

    var list = CHAIN.slice(si, ti + 1);
    var perWeek = ans.freq === '1' ? 1 : 2;
    var totalSessions = list.length * 48;
    var weeks = totalSessions / perWeek;
    var months = Math.round(weeks / 4.35);
    var offSum = 0;
    var onSum = 0;
    list.forEach(function (k) { offSum += STAGE[k].off; onSum += STAGE[k].on; });

    var rows = list.map(function (k) {
      var st = STAGE[k];
      return '<tr><td><b>' + st.label + '</b></td><td>48 次 × ' + st.min + ' 分钟</td><td>' + money(st.off) + '</td><td>' + money(st.on) + '</td></tr>';
    }).join('');

    var warns = [];
    if (ans.goal === 'csps' && (start === 'L1' || start === 'L2')) {
      warns.push('从启蒙走到 CSP-S 通常要 4–5 年，按每周 1 次算约 ' + months + ' 个月。若孩子已在小学高年级，建议先把目标定在 CSP-J 复赛，拿到结果再决定是否往上走。');
    }
    if (ans.grade === 'g7' && ans.goal === 'gesp3') {
      warns.push('初一才把目标定在 GESP 3 级偏低。建议先做一次四道题精测或入学测评，确认能否直接进 L3。');
    }
    if (perWeek === 1 && list.length >= 4) {
      warns.push('按每周 1 次走完这条线要 ' + months + ' 个月。想压缩可以与校区谈每周 2 次或寒暑假加课，但低龄阶段不建议压缩消化时间。');
    }
    warns.push('以上为课包原价合计：两人同报各减 300、续费 9 折、兄妹 8.5 折、老带新各减 200（不叠加）；不含教材、考级报名费与异地参赛差旅。');

    res.innerHTML =
      '<div class="lv"><i>粗算结果</i><b>' + list.length + ' 期</b><span>' + STAGE[start].label + ' → ' + GOALNAME[ans.goal] + '</span></div>' +
      '<div class="sums">' +
        '<div><b>' + totalSessions + '</b><span>次课</span></div>' +
        '<div><b>' + list.length + '</b><span>期（48 次/期）</span></div>' +
        '<div><b>' + months + '</b><span>个月左右</span></div>' +
        '<div><b>' + perWeek + '</b><span>次 / 周</span></div>' +
      '</div>' +
      '<div class="phases"><table><tr><th>阶段</th><th>课时</th><th>线下</th><th>线上</th></tr>' + rows + '</table></div>' +
      '<div class="two">' +
        '<div><b>' + money(offSum) + '</b><span>线下合计 · ' + list.length + ' 期</span></div>' +
        '<div><b>' + money(onSum) + '</b><span>线上合计 · ' + list.length + ' 期</span></div>' +
      '</div>' +
      '<div class="acts">' +
        '<a class="btn-primary" href="index.html#trial">预约入学测评</a>' +
        '<a class="btn" href="stage-finder.html">四道题精测起点</a>' +
      '<a class="btn" href="study-mode.html">五道题：自学还是报班</a>' +
        '<a class="btn" href="course-' + (start === 'J' ? 'l4' : start === 'S' ? 'l4' : start.toLowerCase()) + '.html">看起点课程</a>' +
      '</div>' +
      warns.map(function (w) { return '<div class="warn">' + w + '</div>'; }).join('');
    res.hidden = false;
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
