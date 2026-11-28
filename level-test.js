(function () {
  var box = document.getElementById('quiz');
  if (!box) return;
  var run = document.getElementById('qRun');
  var hint = document.getElementById('qHint');
  var res = document.getElementById('qRes');

  var KEYS = {
    q1: 'A', q2: 'A', q3: 'A', q4: 'C', q5: 'D', q6: 'A', q7: 'B', q8: 'B'
  };
  var META = {
    q1: ['顺序与分解', '还不能把一件事拆成有先后的小步。可以从「先做什么、再做什么」的口头练习开始。'],
    q2: ['循环与复用', '习惯复制粘贴，还没建立「重复一次就够」。这一条是图形化阶段最该补的。'],
    q3: ['条件判断', '分不清「满足条件才做」和「总是做」。用一个「红灯停」的小游戏就能讲明白。'],
    q4: ['变量', '变量被当成固定数字。打地鼠这类记分类游戏，是理解变量最快的方式。'],
    q5: ['循环累加', '不会跟着循环跟踪值的变化。让孩子每次循环都念一遍「现在是几」。'],
    q6: ['语法完整性', '没注意括号、引号要成对。写代码前先数一遍成对符号，是个好习惯。'],
    q7: ['边界与计数', '「到 10 为止」容易数成 9 次。差一错误在编程里非常常见，也很容易练。'],
    q8: ['调试习惯', '出错先求助，还没养成看报错的习惯。先看信息、再动手，这条能省三年时间。']
  };
  var ORDER = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

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
    var left = 8 - picked;
    if (left > 0) {
      run.disabled = true;
      hint.textContent = '还有 ' + left + ' 题没选';
    } else {
      run.disabled = false;
      hint.textContent = '八题选完，点这里出结果';
    }
  }

  function band(score) {
    if (score >= 7) return {
      lv: 'L4 起点', sub: '逻辑底子够，直接测评竞赛方向',
      text: '八题里最多错一道，说明顺序、循环、条件、读错这四件事都稳。可以直接做 L4 测评；语法从零开始也不影响，竞赛班前八次课会把 C++ 语法补齐。'
    };
    if (score >= 5) return {
      lv: 'L3 起点', sub: 'Python 编程，先补读错与边界',
      text: '逻辑基本稳，缺的是语法熟练度和找错的习惯。从 L3 起最合适，头一个月重点练两件事：读英文报错、处理「到几为止」这类边界。'
    };
    if (score >= 3) return {
      lv: 'L2 起点', sub: '进阶图形化与硬件',
      text: '顺序和重复有感觉，变量与边界还不稳。从 L2 起，变量、克隆、列表是主线，等能独立管住一组数据，再转 Python 会顺很多。'
    };
    return {
      lv: 'L1 起点', sub: '启蒙，先建立三个概念',
      text: '现在还不必写代码。先在 L1 把顺序、重复、条件这三个概念建立起来，这一级不背语法、不刷题，靠做作品把概念用熟。'
    };
  }

  run.addEventListener('click', function () {
    var score = 0;
    var wrong = [];
    ORDER.forEach(function (k) {
      if (answers[k] === KEYS[k]) score++;
      else wrong.push(k);
    });
    var b = band(score);
    var list = wrong.length
      ? wrong.map(function (k) {
          return '<div><b>' + META[k][0] + '：</b>' + META[k][1] + '</div>';
        }).join('')
      : '<div>八题全对，没有需要补的点。直接去做入学测评，让老师看孩子上机的状态。</div>';

    res.innerHTML =
      '<div class="lv"><i>建议起点</i><b>' + b.lv + '</b><span>' + b.sub + '</span></div>' +
      '<div class="sums"><div><b>' + score + '/8</b><span>本次得分</span></div><div><b>' + (8 - score) + '</b><span>错题数量</span></div></div>' +
      '<p>' + b.text + '</p>' +
      '<div class="list">' + list + '</div>' +
      '<div class="acts">' +
      '<a class="btn" href="plan-calculator.html">按这个起点算课时与费用</a>' +
      '<a class="btn" href="stage-finder.html">再做四道题（家长自评）</a>' +
      '<a class="btn" href="study-mode.html">五道题：自学还是报班</a>' +
      '<a class="btn-primary" href="index.html#trial">预约入学测评</a>' +
      '</div>';
    res.hidden = false;
    res.scrollIntoView({ block: 'nearest' });
  });

  refresh();
})();
