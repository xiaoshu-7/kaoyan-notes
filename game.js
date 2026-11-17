/* ============================================================
   坦克防线 · 知识突击
   坦克自动开火，玩家答题；答对开重炮，答错敌人推进。
   ============================================================ */

/* ---------------- 题库 ---------------- */
/* q 题干 / o 选项 / a 正确索引 / e 解析 */

const BANK = [
  {
    q: '在一个长度为 n 的顺序表中，插入一个元素平均需要移动多少个元素？',
    o: ['n', 'n/2', '(n+1)/2', 'n²'],
    a: 1,
    e: '插入位置有 n+1 种（含表尾），移动次数分别是 n, n−1, …, 0，平均 n/2。删除是 (n−1)/2，两者不同。'
  },
  {
    q: '在单链表中，删除指针 p 所指结点的前驱结点，时间复杂度是？',
    o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    a: 2,
    e: '单链表只能向后找，要删 p 的前驱必须先找到 p 的前前驱，必须从头遍历，是 O(n)。这是单链表相对于双向链表的劣势。'
  },
  {
    q: '若进栈序列为 1、2、3、4，下列哪个不可能是出栈序列？',
    o: ['4,3,2,1', '1,2,3,4', '3,1,2,4', '2,3,4,1'],
    a: 2,
    e: '3 出栈时，1、2 已在栈中，2 在 1 上面，所以出栈顺序必须是 2 在 1 之前。3,1,2,4 中 1 先于 2 出栈，违反栈的后进先出。'
  },
  {
    q: '循环队列用数组 Q[0..n-1] 存储，front 指向队头元素，rear 指向队尾元素的下一个位置。队列满的条件是？',
    o: ['(rear+1)%n == front', 'rear == front', 'rear == n-1', '(front+1)%n == rear'],
    a: 0,
    e: '为了区分队空和队满，牺牲一个单元：队空是 rear==front，队满是 (rear+1)%n==front。这样队列最多存 n−1 个元素。'
  },
  {
    q: '一棵二叉树中，度为 2 的结点有 10 个，则叶子结点有多少个？',
    o: ['9', '10', '11', '无法确定'],
    a: 2,
    e: '公式 n₀ = n₂ + 1。度为 2 的结点 10 个，叶子就是 11 个。这个结论对所有二叉树都成立，与度为 1 的结点数无关。'
  },
  {
    q: '含有 n 个结点的完全二叉树，其高度为（根为第 1 层）？',
    o: ['⌊log₂n⌋', '⌈log₂(n+1)⌉', '⌊log₂n⌋+1', '⌈log₂n⌉+1'],
    a: 1,
    e: '高度 h = ⌈log₂(n+1)⌉，也等于 ⌊log₂n⌋+1。两者等价，但题目给的选项只有 ⌈log₂(n+1)⌉ 是对的。'
  },
  {
    q: '已知二叉树的前序遍历为 ABDECF，中序遍历为 DBEAFC，则其后序遍历为？',
    o: ['DEBFCA', 'DEBCFA', 'DBEFCA', 'EDBFCA'],
    a: 0,
    e: '前序首字母 A 是根，中序中 A 左边 DBE 是左子树、右边 FC 是右子树。递归下去：左子树后序 DEB，右子树后序 FC，整体是 DEB + FC + A = DEBFCA。'
  },
  {
    q: '对 n 个权值构造哈夫曼树，其带权路径长度（WPL）等于？',
    o: ['所有叶子权值之和', '所有叶子权值乘深度之和', '所有结点权值之和', 'n 个权值的最小值乘 n'],
    a: 1,
    e: 'WPL = Σ(叶子权值 × 该叶子的路径长度)。哈夫曼树让 WPL 最小，所以常用于最优编码。注意是「叶子」的深度，不是所有结点。'
  },
  {
    q: '对二叉排序树进行中序遍历，得到的序列是？',
    o: ['无序的', '递增有序的', '递减有序的', '先增后减的'],
    a: 1,
    e: 'BST 的性质：左子树 < 根 < 右子树。中序遍历（左-根-右）恰好按从小到大输出，所以是递增有序。这是判断 BST 的标准方法。'
  },
  {
    q: 'AVL 树中某结点的平衡因子定义为「左子树高度减右子树高度」，则平衡因子的取值只能是？',
    o: ['0', '−1, 0, 1', '−2, −1, 0, 1, 2', '任意整数'],
    a: 1,
    e: '平衡因子绝对值不超过 1，否则需要旋转调整。取值只有 −1、0、1 三种。超过就要 LL、RR、LR、RL 四种旋转之一来修正。'
  },
  {
    q: '一个有 n 个顶点的无向连通图，至少有多少条边？',
    o: ['n−1', 'n', 'n+1', 'n(n−1)/2'],
    a: 0,
    e: '连通图最少是一棵树，n 个顶点 n−1 条边。最多是完全图 n(n−1)/2 条。这两个边界常考。'
  },
  {
    q: '用邻接矩阵存储含 n 个顶点的图，其空间复杂度为？',
    o: ['O(n)', 'O(n²)', 'O(n+e)', 'O(e)'],
    a: 1,
    e: '邻接矩阵是 n×n 的二维数组，与边数无关，空间 O(n²)。邻接表的空间是 O(n+e)。稀疏图用邻接表更省。'
  },
  {
    q: '下列哪种情况适合用 Kruskal 算法而不是 Prim 算法求最小生成树？',
    o: ['稠密图', '稀疏图', '有向图', '带负权边的图'],
    a: 1,
    e: 'Kruskal 按边权排序选边，复杂度 O(e log e)，适合边少的稀疏图。Prim 从顶点扩展，O(n²)，适合边多的稠密图。'
  },
  {
    q: 'Dijkstra 算法不能正确处理下列哪种情况？',
    o: ['有环的图', '带负权边的图', '无向图', '稠密图'],
    a: 1,
    e: 'Dijkstra 基于贪心：一旦确定某点最短路径就不再更新。负权边可能让「已确定」的点变得更短，所以失效。带负权要用 Bellman-Ford。'
  },
  {
    q: '对一个有向图进行拓扑排序，若排序结果包含全部顶点，则说明该图？',
    o: ['是连通图', '不存在环', '是完全图', '是二分图'],
    a: 1,
    e: '拓扑排序能输出所有顶点，说明图中无环（DAG）。如果有环，环上的顶点入度永远不为 0，无法输出。这是判断有向图是否有环的方法。'
  },
  {
    q: '对长度为 n 的有序表进行折半查找，最多需要比较多少次？',
    o: ['⌊log₂n⌋', '⌈log₂(n+1)⌉', 'n/2', 'n'],
    a: 1,
    e: '折半查找的判定树高度是 ⌈log₂(n+1)⌉，最多比较这么多次。时间复杂度 O(log n)。注意折半查找要求「有序 + 顺序存储」。'
  },
  {
    q: '散列表处理冲突的方法中，下列哪种不会产生「堆积」现象？',
    o: ['线性探测法', '二次探测法', '链地址法', '再散列法'],
    a: 2,
    e: '链地址法把同义词串成链表，不同散列地址的元素互不干扰，没有堆积。线性探测会产生一次堆积，二次探测会减轻但仍存在。'
  },
  {
    q: '下列排序算法中，哪个是不稳定的？',
    o: ['冒泡排序', '插入排序', '归并排序', '快速排序'],
    a: 3,
    e: '稳定的：冒泡、插入、归并、基数。不稳定的：快排、堆排、希尔、简单选择。口诀「快些选堆」是不稳定的四个。'
  },
  {
    q: '快速排序在最坏情况下的时间复杂度是？',
    o: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    a: 1,
    e: '当序列已基本有序、且每次都选第一个元素为基准时，每次划分只减少一个元素，退化成 O(n²)。随机选基准可以避免。'
  },
  {
    q: '堆排序中，建立初始堆的时间复杂度是？',
    o: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    a: 0,
    e: '自底向上建堆是 O(n)，不是 O(n log n)。虽然看起来有 n 次下沉、每次 O(log n)，但大部分结点在下层，总代价收敛到 O(n)。'
  },
  {
    q: '归并排序的空间复杂度是？',
    o: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    a: 2,
    e: '归并需要 O(n) 的辅助数组存放合并结果。这是归并排序相对快排、堆排的劣势——后两者空间都是 O(log n)（递归栈）。'
  },
  {
    q: '对 1000 个元素进行排序，下列哪个算法平均性能最好？',
    o: ['冒泡排序', '简单选择排序', '快速排序', '直接插入排序'],
    a: 2,
    e: '前三个 O(n²) 算法中，快排是 O(n log n)，明显更快。虽然快排最坏是 O(n²)，但平均性能优于其他三个。'
  },
  {
    q: '在一棵 3 阶 B 树中，每个非根结点至少有多少个关键字？',
    o: ['1', '2', '3', '4'],
    a: 0,
    e: 'm 阶 B 树的非根结点至少有 ⌈m/2⌉−1 个关键字。m=3 时是 ⌈1.5⌉−1 = 1 个。根结点至少 1 个（非空时）。'
  },
  {
    q: 'KMP 算法中，next 数组的作用是？',
    o: ['记录已匹配的长度', '记录模式串的移动位置', '记录主串的位置', '记录字符出现的次数'],
    a: 1,
    e: 'next[j] 表示模式串第 j 个字符失配时，应该回退到哪个位置继续比较。它记录的是「模式串前缀和后缀的最长公共长度」，让主串指针不回溯。'
  },
  {
    q: '二维数组 A[0..9][0..9] 按行优先存储，每个元素占 2 字节，首地址为 1000，则 A[3][4] 的地址是？',
    o: ['1068', '1064', '1072', '1060'],
    a: 0,
    e: '按行优先：地址 = 首地址 + (i×列数 + j)×元素大小 = 1000 + (3×10 + 4)×2 = 1000 + 68 = 1068。'
  },
  {
    q: '递归程序运行时，系统用什么数据结构保存调用信息？',
    o: ['队列', '栈', '链表', '树'],
    a: 1,
    e: '函数调用采用「后进先出」的顺序返回，所以用栈。每次调用压入一个栈帧（保存返回地址、参数、局部变量），返回时弹出。'
  },
  {
    q: '将一棵树转换为二叉树时，采用的规则是？',
    o: ['左孩子右兄弟', '左兄弟右孩子', '按层序编号', '按先序排列'],
    a: 0,
    e: '「左孩子右兄弟」：每个结点的第一个孩子作为左孩子，其余兄弟依次作为右孩子链。这样转换后的二叉树唯一，且能还原。'
  },
  {
    q: '下列哪种排序算法在数据已基本有序时效率最高？',
    o: ['快速排序', '直接插入排序', '简单选择排序', '堆排序'],
    a: 1,
    e: '插入排序在基本有序时接近 O(n)，因为每个元素只需少量移动。快排在有序时反而退化到 O(n²)。这个对比常考。'
  },
  {
    q: '广义表 L = (a, (b, c), d) 的长度和深度分别是？',
    o: ['长度 3，深度 2', '长度 3，深度 3', '长度 2，深度 3', '长度 4，深度 2'],
    a: 0,
    e: '长度是顶层元素个数：a、(b,c)、d 共 3 个。深度是括号嵌套的最大层数：(b,c) 有一层嵌套，所以深度是 2。'
  }
];

/* ---------------- 游戏状态 ---------------- */

const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
const W = 620, H = 720;

const G = {
  running: false,
  hp: 100,
  score: 0,
  combo: 0,
  right: 0,
  wrong: 0,
  enemies: [],
  bullets: [],
  boom: [],
  lastFire: 0,
  lastSpawn: 0,
  fireGap: 1300,
  spawnGap: 3000,
  speed: 17,
  boostUntil: 0,
  qIdx: 0,
  pool: [],
  answered: false,
  lastTs: 0,
  tankX: W / 2,
  shake: 0
};

const WRONG_KEY = 'tank:wrong';

function loadWrong() {
  try { return JSON.parse(localStorage.getItem(WRONG_KEY) || '[]'); } catch (e) { return []; }
}
function saveWrong(list) {
  try { localStorage.setItem(WRONG_KEY, JSON.stringify(list.slice(-200))); } catch (e) {}
}
function addWrong(idx) {
  const w = loadWrong();
  if (!w.includes(idx)) { w.push(idx); saveWrong(w); }
}
function wrongCount() { return loadWrong().length; }

/* ---------------- 绘制工具 ---------------- */

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawGrid() {
  ctx.fillStyle = '#EAE3D0';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(160,145,110,.13)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // 基地线
  ctx.strokeStyle = 'rgba(180,68,58,.28)';
  ctx.setLineDash([8, 6]);
  ctx.beginPath(); ctx.moveTo(0, H - 46); ctx.lineTo(W, H - 46); ctx.stroke();
  ctx.setLineDash([]);

  // 顶部安全区
  const g = ctx.createLinearGradient(0, 0, 0, 120);
  g.addColorStop(0, 'rgba(244,239,226,.9)');
  g.addColorStop(1, 'rgba(244,239,226,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, 120);
}

function drawTank(x, y, color, dark, ang) {
  ctx.save();
  ctx.translate(x, y);

  // 履带
  ctx.fillStyle = dark;
  roundRect(-26, -8, 52, 22, 5); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  for (let i = -22; i < 24; i += 9) ctx.fillRect(i, -6, 3, 18);

  // 车身
  ctx.fillStyle = color;
  roundRect(-19, -16, 38, 26, 3); ctx.fill();

  // 炮塔
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(0, -14, 11, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.12)';
  ctx.beginPath(); ctx.arc(0, -14, 11, 0, Math.PI * 2); ctx.stroke();

  // 炮管
  ctx.save();
  ctx.rotate(ang);
  ctx.fillStyle = dark;
  roundRect(-3, -40, 6, 28, 2); ctx.fill();
  ctx.restore();

  ctx.restore();
}

function drawEnemy(e) {
  ctx.save();
  ctx.translate(e.x, e.y);

  ctx.fillStyle = '#8E5B52';
  roundRect(-22, -6, 44, 18, 4); ctx.fill();
  ctx.fillStyle = '#B4443A';
  roundRect(-16, -14, 32, 22, 3); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -14, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#7A2F28';
  roundRect(-2.5, -32, 5, 20, 2); ctx.fill();

  // 血条
  const w = 36, p = Math.max(0, e.hp / e.maxHp);
  ctx.fillStyle = 'rgba(120,100,60,.18)';
  ctx.fillRect(-w / 2, 16, w, 4);
  ctx.fillStyle = p > .5 ? '#4A7A52' : (p > .25 ? '#C08A3E' : '#B4443A');
  ctx.fillRect(-w / 2, 16, w * p, 4);

  ctx.restore();
}

/* ---------------- 游戏逻辑 ---------------- */

function reset() {
  G.hp = 100;
  G.score = 0;
  G.combo = 0;
  G.right = 0;
  G.wrong = 0;
  G.enemies = [];
  G.bullets = [];
  G.boom = [];
  G.lastFire = 0;
  G.lastSpawn = 0;
  G.fireGap = 1300;
  G.spawnGap = 3000;
  G.speed = 17;
  G.boostUntil = 0;
  G.qIdx = 0;
  G.answered = false;
  G.shake = 0;

  // 洗牌题库
  G.pool = BANK.map((_, i) => i);
  for (let i = G.pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [G.pool[i], G.pool[j]] = [G.pool[j], G.pool[i]];
  }

  updateHud();
  document.getElementById('stBank').textContent = wrongCount();
}

function spawnEnemy() {
  const lane = 3;
  const x = 110 + Math.floor(Math.random() * lane) * 200 + (Math.random() * 40 - 20);
  G.enemies.push({
    x: Math.max(70, Math.min(W - 70, x)),
    y: 60,
    hp: 45,
    maxHp: 45,
    w: 44, h: 40,
    wob: Math.random() * 6.28
  });
}

function fire(superShot) {
  const bx = G.tankX;
  const by = H - 96;
  G.bullets.push({
    x: bx, y: by,
    vy: superShot ? -760 : -520,
    dmg: superShot ? 999 : 18,
    big: !!superShot
  });
  G.shake = superShot ? 6 : 2;
}

function boom(x, y, big) {
  const n = big ? 18 : 8;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = (big ? 2.6 : 1.4) * (0.6 + Math.random());
    G.boom.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, r: big ? 3.6 : 2.4 });
  }
}

function update(dt, ts) {
  // 生成敌人
  if (ts - G.lastSpawn > G.spawnGap) {
    G.lastSpawn = ts;
    spawnEnemy();
  }

  // 自动开火
  const gap = ts < G.boostUntil ? G.fireGap * 0.45 : G.fireGap;
  if (ts - G.lastFire > gap) {
    G.lastFire = ts;
    fire(false);
  }

  // 子弹
  for (let i = G.bullets.length - 1; i >= 0; i--) {
    const b = G.bullets[i];
    b.y += b.vy * dt;
    if (b.y < -20) { G.bullets.splice(i, 1); continue; }

    for (let j = G.enemies.length - 1; j >= 0; j--) {
      const e = G.enemies[j];
      if (Math.abs(b.x - e.x) < 28 && Math.abs(b.y - e.y) < 26) {
        e.hp -= b.dmg;
        boom(b.x, b.y, b.big);
        G.bullets.splice(i, 1);
        if (e.hp <= 0) {
          boom(e.x, e.y, true);
          G.enemies.splice(j, 1);
        }
        break;
      }
    }
  }

  // 敌人推进
  for (let i = G.enemies.length - 1; i >= 0; i--) {
    const e = G.enemies[i];
    e.y += G.speed * dt;
    e.wob += dt * 2;
    e.x += Math.sin(e.wob) * 10 * dt;

    if (e.y > H - 70) {
      G.enemies.splice(i, 1);
      hurt(18);
    }
  }

  // 粒子
  for (let i = G.boom.length - 1; i >= 0; i--) {
    const p = G.boom[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.05;
    p.life -= dt * 1.6;
    if (p.life <= 0) G.boom.splice(i, 1);
  }

  if (G.shake > 0) G.shake -= dt * 26;
}

function hurt(n) {
  G.hp = Math.max(0, G.hp - n);
  updateHud();
  if (G.hp <= 0) gameOver();
}

function draw(ts) {
  ctx.save();
  if (G.shake > 0.4) {
    ctx.translate((Math.random() - .5) * G.shake, (Math.random() - .5) * G.shake);
  }

  drawGrid();

  G.enemies.forEach(drawEnemy);

  // 子弹
  G.bullets.forEach(b => {
    if (b.big) {
      ctx.fillStyle = 'rgba(180,68,58,.9)';
      ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, 6.3); ctx.fill();
      ctx.fillStyle = 'rgba(180,68,58,.25)';
      ctx.beginPath(); ctx.arc(b.x, b.y, 11, 0, 6.3); ctx.fill();
      const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + 60);
      g.addColorStop(0, 'rgba(180,68,58,.45)');
      g.addColorStop(1, 'rgba(180,68,58,0)');
      ctx.fillStyle = g;
      ctx.fillRect(b.x - 2.5, b.y, 5, 60);
    } else {
      ctx.fillStyle = '#4E4A42';
      ctx.fillRect(b.x - 2, b.y, 4, 11);
    }
  });

  // 粒子
  G.boom.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.life > .6 ? '#B4443A' : '#C08A3E';
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 6.3); ctx.fill();
  });
  ctx.globalAlpha = 1;

  // 我方坦克
  const boost = ts < G.boostUntil;
  if (boost) {
    ctx.save();
    ctx.strokeStyle = 'rgba(74,122,82,.42)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(G.tankX, H - 96, 42 + Math.sin(ts / 90) * 3, 0, 6.3); ctx.stroke();
    ctx.restore();
  }
  drawTank(G.tankX, H - 96, '#3F5A46', '#2C3E31', 0);

  // 底部基地条
  ctx.fillStyle = 'rgba(63,90,70,.9)';
  ctx.fillRect(0, H - 46, W, 46);
  ctx.fillStyle = 'rgba(244,239,226,.5)';
  ctx.font = '11px "Cascadia Code",monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BASE  ' + Math.round(G.hp) + ' / 100', W / 2, H - 18);

  ctx.restore();
}

function loop(ts) {
  if (!G.running) return;
  if (!G.lastTs) G.lastTs = ts;
  const dt = Math.min(0.05, (ts - G.lastTs) / 1000);
  G.lastTs = ts;

  update(dt, ts);
  draw(ts);
  requestAnimationFrame(loop);
}

/* ---------------- 题目交互 ---------------- */

function currentQuestion() {
  if (G.qIdx >= G.pool.length) {
    // 题库用完，重新洗牌
    G.pool = BANK.map((_, i) => i);
    for (let i = G.pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [G.pool[i], G.pool[j]] = [G.pool[j], G.pool[i]];
    }
    G.qIdx = 0;
  }
  return BANK[G.pool[G.qIdx]];
}

function renderQuestion() {
  const q = currentQuestion();
  G.answered = false;

  document.getElementById('qno').textContent = '第 ' + (G.right + G.wrong + 1) + ' 题';
  document.getElementById('qtext').innerHTML = q.q;
  document.getElementById('exp').innerHTML = '<span class="lb">解析</span>　答题后显示';

  const box = document.getElementById('opts');
  box.innerHTML = '';
  const keys = ['A', 'B', 'C', 'D'];
  q.o.forEach((text, i) => {
    const el = document.createElement('button');
    el.className = 'opt';
    el.innerHTML = '<span class="k">' + keys[i] + '</span><span>' + text + '</span>';
    el.onclick = () => answer(i);
    box.appendChild(el);
  });
}

function answer(idx) {
  if (G.answered || !G.running) return;
  G.answered = true;

  const q = currentQuestion();
  const box = document.getElementById('opts');
  const nodes = Array.from(box.children);
  const ok = idx === q.a;

  nodes.forEach((el, i) => {
    if (i === q.a) el.classList.add('right');
    else if (i === idx) el.classList.add('wrong');
    else el.classList.add('dim');
    el.onclick = null;
  });

  document.getElementById('exp').innerHTML =
    '<span class="lb">解析</span>　' + q.e;

  if (ok) {
    G.right++;
    G.combo++;
    G.score += 10 + G.combo * 2;

    // 重炮：打掉最前面（y 最大）的敌人
    fire(true);
    G.boostUntil = performance.now() + 3000;

    if (G.combo >= 3) {
      showToast('连击 ×' + G.combo, 'good');
      G.enemies.forEach(e => { e.hp -= 20; });
      // 立即清理被清空血量的敌人
      G.enemies = G.enemies.filter(e => {
        if (e.hp <= 0) { boom(e.x, e.y, true); return false; }
        return true;
      });
    } else {
      showToast('命中', 'good');
    }
  } else {
    G.wrong++;
    G.combo = 0;
    addWrong(G.pool[G.qIdx]);

    // 敌人推进 + 掉血
    G.enemies.forEach(e => { e.y += 34; });
    hurt(9);
    showToast('错了', 'bad');
  }

  updateHud();

  setTimeout(() => {
    if (!G.running) return;
    G.qIdx++;
    renderQuestion();
  }, ok ? 900 : 1700);
}

function showToast(text, kind) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.className = 'toast on ' + kind;
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.className = 'toast ' + kind; }, 700);
}

function updateHud() {
  const pct = G.hp;
  const fill = document.getElementById('hpfill');
  fill.style.width = pct + '%';
  document.getElementById('hpbar').classList.toggle('low', pct <= 35);
  document.getElementById('scoreTag').textContent = G.score + ' 分';
  document.getElementById('stRight').textContent = G.right;
  document.getElementById('stWrong').textContent = G.wrong;
  document.getElementById('stBank').textContent = wrongCount();
  document.getElementById('comboTag').textContent = G.combo >= 2 ? '连击 ×' + G.combo : '';
}

/* ---------------- 开始 / 结束 ---------------- */

function start() {
  reset();
  document.getElementById('ovStart').classList.remove('on');
  document.getElementById('ovOver').classList.remove('on');
  renderQuestion();

  G.running = true;
  G.lastTs = 0;
  G.lastFire = 0;
  G.lastSpawn = 0;
  requestAnimationFrame(loop);
}

function gameOver() {
  G.running = false;

  document.getElementById('finalScore').textContent = G.score + ' 分';
  const total = G.right + G.wrong;
  const acc = total ? Math.round(G.right / total * 100) : 0;
  document.getElementById('finalStat').textContent =
    '答对 ' + G.right + ' / 共 ' + total + ' 题　正确率 ' + acc + '%';
  document.getElementById('ovOver').classList.add('on');

  updateHud();
}

/* ---------------- 键盘 ---------------- */

document.addEventListener('keydown', e => {
  if (!G.running) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(); }
    return;
  }
  const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
  if (e.key in map) {
    e.preventDefault();
    answer(map[e.key]);
  }
});

/* ---------------- 启动 ---------------- */

/* 调试钩子：供自动化测试读取正确答案 */
window.__answerOf = () => currentQuestion().a;
window.__stateOf = () => ({ hp: G.hp, right: G.right, wrong: G.wrong, score: G.score });

document.getElementById('btnStart').onclick = start;
document.getElementById('btnAgain').onclick = start;

reset();
drawGrid();
drawTank(W / 2, H - 96, '#3F5A46', '#2C3E31', 0);
document.getElementById('stBank').textContent = wrongCount();
