/* ============================================================
   渲染引擎
   多科目版：从 URL 的 ?s= 读科目 id，默认 ds。
   数据在 data/*.js 里，每个科目一个文件。
   ============================================================ */

/* ---------- 基础工具 ---------- */

function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function inline(s){
  if(s == null) return '';
  let h = escHtml(s);
  h = h.replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>');
  h = h.replace(/==([^=]+?)==/g, '<span class="hl">$1</span>');
  h = h.replace(/`([^`]+?)`/g, '<code class="i">$1</code>');
  h = h.replace(/\[(\d)\]/g, '<span class="mk">$1</span>');
  return h;
}

const KW = /\b(int|void|char|float|double|bool|if|else|while|for|return|struct|typedef|NULL|true|false|free|malloc|sizeof|new|delete|const|static|unsigned|long|short|break|continue|class|public|private|P|V|wait|signal)\b/g;

function hlLine(line){
  return escHtml(line).replace(KW, '<span class="kw">$1</span>');
}

function highlight(code){
  return String(code).split('\n').map(line => {
    const t = line.trim();
    if(t.startsWith('//')) return '<span class="cm">' + escHtml(line) + '</span>';
    const i = line.indexOf('//');
    if(i >= 0){
      return hlLine(line.slice(0, i)) + '<span class="cm">' + escHtml(line.slice(i)) + '</span>';
    }
    return hlLine(line);
  }).join('\n');
}

/* ---------- 当前科目 ---------- */

let CUR = null;
let PREFIX = 'ds:';

const store = {
  get(k, dft){
    try{
      const v = localStorage.getItem(PREFIX + k);
      return v == null ? dft : JSON.parse(v);
    }catch(e){ return dft; }
  },
  set(k, v){
    try{ localStorage.setItem(PREFIX + k, JSON.stringify(v)); }catch(e){}
  }
};

function subjUrl(id){
  return 'index.html?s=' + id;
}
function noteUrl(id, sid){
  return 'note.html?s=' + (sid || CUR.subject.id) + '&id=' + id;
}

/* ---------- 块渲染 ---------- */

function renderBlock(b){
  switch(b.t){
    case 'p':    return '<p>' + inline(b.x) + '</p>';
    case 'h3':   return '<h3>' + inline(b.x) + '</h3>';
    case 'def':  return '<div class="def"><p>' + inline(b.x) + '</p></div>';
    case 'pit':  return '<div class="sticky"><b>坑：</b>' + inline(b.x) + '</div>';
    case 'note': return '<div class="sticky' + (b.tone === 'blue' ? ' blue' : '') + '">' + inline(b.x) + '</div>';

    case 'formula':
      return '<div class="formula">' + inline(b.x) + (b.cap ? '<span class="fcap">' + inline(b.cap) + '</span>' : '') + '</div>';

    /* 例题：题干 + 解析，数学和专业课都能用 */
    case 'example':
      return '<div class="example">'
        + '<div class="ex-q"><span class="ex-tag">例</span>' + inline(b.q) + '</div>'
        + '<div class="ex-a"><span class="ex-tag alt">解</span>' + inline(b.a) + '</div>'
        + (b.cap ? '<div class="ex-cap">' + inline(b.cap) + '</div>' : '')
        + '</div>';

    /* 对照：左原文右译文，英语长难句用 */
    case 'pair':
      return '<div class="pair">'
        + '<div class="pair-side"><span class="pair-tag">' + inline(b.ltag || '原文') + '</span>' + inline(b.left) + '</div>'
        + '<div class="pair-side"><span class="pair-tag alt">' + inline(b.rtag || '译文') + '</span>' + inline(b.right) + '</div>'
        + '</div>'
        + (b.cap ? '<div class="pair-cap">' + inline(b.cap) + '</div>' : '');

    /* 时间线：政治史纲用 */
    case 'timeline':
      return '<div class="timeline">' + b.items.map(it =>
        '<div class="tl-item"><span class="tl-time">' + inline(it.time) + '</span>'
        + '<span class="tl-text">' + inline(it.text) + '</span></div>').join('') + '</div>'
        + (b.cap ? '<div class="tab-cap">' + inline(b.cap) + '</div>' : '');

    case 'ul': return '<ul class="pen">' + b.x.map(i => '<li>' + inline(i) + '</li>').join('') + '</ul>';
    case 'ol': return '<ol class="pen">' + b.x.map(i => '<li>' + inline(i) + '</li>').join('') + '</ol>';

    case 'code':
      return '<div class="code-sheet"><span class="tag-line">' + (b.lang || 'code') + '</span>'
        + '<pre>' + highlight(b.x) + '</pre></div>'
        + (b.cap ? '<div class="code-cap">' + inline(b.cap) + '</div>' : '');

    case 'table':
      return '<table><thead><tr>'
        + b.head.map(h => '<th>' + inline(h) + '</th>').join('')
        + '</tr></thead><tbody>'
        + b.rows.map(r => '<tr>' + r.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('')
        + '</tbody></table>'
        + (b.cap ? '<div class="tab-cap">' + inline(b.cap) + '</div>' : '');

    case 'fig':
      return '<figure>' + b.x + '<figcaption>' + inline(b.cap) + '</figcaption></figure>';

    case 'terms':
      return '<div class="terms">' + b.rows.map(r =>
        '<div class="row"><div class="t">' + inline(r[0]) + '</div>'
        + '<div class="d">' + inline(r[1]) + '</div></div>').join('') + '</div>';

    case 'exam':  return '<div class="exam"><p>' + inline(b.x) + '</p></div>';

    case 'quote':
      return '<blockquote class="quote">' + inline(b.x)
        + (b.by ? '<span class="by">—— ' + inline(b.by) + '</span>' : '') + '</blockquote>';

    default: return '';
  }
}

/* ---------- 目录工具 ---------- */

function flatSections(){
  const out = [];
  CUR.chapters.forEach(c => {
    c.sections.forEach(s => out.push(Object.assign({}, s, { chapter: c })));
  });
  return out;
}

function isDone(id){ return !!CUR.pages[id]; }

function chapterStats(c){
  return {
    total: c.sections.length,
    done: c.sections.filter(s => isDone(s.id)).length
  };
}

function overallStats(){
  let total = 0, done = 0;
  CUR.chapters.forEach(c => {
    const s = chapterStats(c);
    total += s.total;
    done += s.done;
  });
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

/* 全站统计（用于科目切换） */
function subjectStats(S){
  let t = 0, d = 0;
  S.chapters.forEach(c => c.sections.forEach(s => {
    t++;
    if(S.pages[s.id]) d++;
  }));
  return { total: t, done: d };
}

/* ---------- 书脊 ---------- */

function renderSpine(activeId){
  const ul = document.getElementById('toc');
  if(!ul) return;

  // 书脊标题、卷标、便签，跟着科目走
  const S = CUR.subject;
  const st = overallStats();
  const titleEl = document.querySelector('.hand-title');
  if(titleEl){
    const n = S.name;
    titleEl.innerHTML = '<a href="index.html" title="回全部科目"><span>' + n.slice(0, 2) + '</span>' + n.slice(2) + '</a>';
  }
  const tapeEl = document.querySelector('.tape');
  if(tapeEl) tapeEl.textContent = S.code + ' · ' + CUR.chapters.length + ' 章';

  const memoEl = document.getElementById('memo');
  if(memoEl){
    memoEl.innerHTML = st.done === st.total
      ? st.total + ' 节全写完了。<br>复习按章过，<br>别从头顺读。'
      : '写完 ' + st.done + ' / ' + st.total + ' 节。<br>还剩 ' + (st.total - st.done) + ' 节，<br>按章推进。';
  }

  const cur = activeId ? flatSections().find(s => s.id === activeId) : null;
  const curNo = cur ? cur.chapter.no : null;

  ul.innerHTML = CUR.chapters.map(c => {
    const st = chapterStats(c);
    const on = c.no === curNo;
    let html = '<li><a href="' + subjUrl(CUR.subject.id) + '#ch-' + c.no + '"' + (on ? ' class="on"' : '') + '>'
      + '<span class="n">' + c.no + '</span>' + c.name
      + '<span class="pct">' + st.done + '/' + st.total + '</span></a></li>';

    if(on){
      html += '<li><ul class="sub-toc">' + c.sections.map(s => {
        const done = isDone(s.id);
        const cls = s.id === activeId ? 'on' : (done ? '' : 'todo');
        const href = done ? ' href="' + noteUrl(s.id) + '"' : '';
        return '<li><a' + href + ' class="' + cls + '">'
          + '<span class="sn">' + s.no + '</span>' + s.name + '</a></li>';
      }).join('') + '</ul></li>';
    }
    return html;
  }).join('');
}

/* ---------- 科目切换 ---------- */

function renderSubjTabs(){
  const box = document.getElementById('subjTabs');
  if(!box) return;
  const all = window.SUBJECTS || {};
  const ids = ['ds', 'coa', 'os', 'net'];
  box.innerHTML = ids.filter(id => all[id]).map(id => {
    const S = all[id];
    const st = subjectStats(S);
    const on = id === CUR.subject.id;
    return '<a href="' + subjUrl(id) + '"' + (on ? ' class="on"' : '') + '>'
      + S.subject.name + '<em>' + st.done + '/' + st.total + '</em></a>';
  }).join('');
}

/* ---------- 首页：全科总览 ---------- */

const SUBJ_ORDER = ['ds', 'coa', 'os', 'net', 'math', 'en', 'pol'];
const SUBJ_KIND = { ds: '408 专业课', coa: '408 专业课', os: '408 专业课', net: '408 专业课', math: '公共课 · 数学一', en: '公共课 · 英语一', pol: '公共课 · 政治' };

function renderPortalSpine(){
  const ul = document.getElementById('toc');
  if(!ul) return;
  const ALL = window.SUBJECTS || {};
  const ids = SUBJ_ORDER.filter(id => ALL[id]);

  const titleEl = document.querySelector('.hand-title');
  if(titleEl) titleEl.innerHTML = '考研<span>笔记</span>';
  const tapeEl = document.querySelector('.tape');
  if(tapeEl) tapeEl.textContent = '408 · 七科';

  let total = 0, done = 0;
  ids.forEach(id => { const s = subjectStats(ALL[id]); total += s.total; done += s.done; });
  const memoEl = document.getElementById('memo');
  if(memoEl) memoEl.innerHTML = '全会 ' + total + ' 节，<br>已写 ' + done + ' 节。<br>先啃专业课。';

  ul.innerHTML = ids.map((id, i) => {
    const S = ALL[id];
    const st = subjectStats(S);
    return '<li><a href="' + subjUrl(id) + '"><span class="n">' + String(i + 1).padStart(2, '0') + '</span>'
      + S.subject.name + '<span class="pct">' + st.done + '/' + st.total + '</span></a></li>';
  }).join('');
}

function renderPortal(){
  const ALL = window.SUBJECTS || {};
  const ids = SUBJ_ORDER.filter(id => ALL[id]);

  renderPortalSpine();

  let total = 0, done = 0;
  ids.forEach(id => { const s = subjectStats(ALL[id]); total += s.total; done += s.done; });
  const pct = total ? Math.round(done / total * 100) : 0;

  function subjCard(id){
    const S = ALL[id];
    const st = subjectStats(S);
    const p = st.total ? Math.round(st.done / st.total * 100) : 0;
    const full = st.done === st.total && st.total > 0;
    return '<a class="subj-card' + (full ? ' full' : '') + '" href="' + subjUrl(id) + '">'
      + '<div class="sc-top"><span class="sc-tag">' + SUBJ_KIND[id] + '</span>'
      + '<span class="sc-num">' + st.done + '/' + st.total + '</span></div>'
      + '<h3>' + S.subject.name + '</h3>'
      + '<p>' + S.chapters.map(c => c.name).slice(0, 4).join(' · ') + '</p>'
      + '<div class="sc-bar"><i style="width:' + p + '%"></i></div>'
      + '</a>';
  }

  const proCards = ids.slice(0, 4).map(subjCard).join('');
  const pubCards = ids.slice(4).map(subjCard).join('');

  document.getElementById('main').innerHTML =
    '<div class="portal">'
    + '<div class="subj-tabs" id="subjTabs" hidden></div>'
    + '<div class="home-kicker">408 · 计算机科学与技术（学硕）</div>'
    + '<h1>计算机考研<em>全科笔记</em></h1>'
    + '<p class="intro">学硕初试考四门：政治、英语一、数学一、408。这里把七科按各自大纲整理成同一套笔记——同一套排版、同一个进度条、同一个复习节奏。</p>'
    + '<div class="sign">—— 更新于 2026.11.16</div>'

    + '<div class="strip">'
    + '<div><div class="num">' + done + '<small>/ ' + total + ' 节</small></div>'
    + '<div class="lbl">已写完</div></div>'
    + '<div class="bar"><i style="width:' + pct + '%"></i></div>'
    + '<div><div class="num">' + pct + '<small>%</small></div>'
    + '<div class="lbl">总进度</div></div>'
    + '</div>'

    + '<a class="game-banner" href="game.html">'
    + '<span class="gb-icon">◈</span>'
    + '<span class="gb-text"><b>坦克防线</b><em>边守边答题，答错敌人推进</em></span>'
    + '<span class="gb-go">开战 →</span>'
    + '</a>'

    + '<div class="portal-sec"><span class="ps-num">A</span>408 专业课<span class="ps-note">150 分，四门合卷</span></div>'
    + '<div class="subj-grid">' + proCards + '</div>'

    + '<div class="portal-sec"><span class="ps-num">B</span>公共课<span class="ps-note">各 100 分，单独成卷</span></div>'
    + '<div class="subj-grid">' + pubCards + '</div>'

    + '<p class="disclaimer">所有章节按 408 及全国统考大纲编排，具体年份可能微调，以你手上的大纲为准。笔记里的「考法」按题型归纳，不是真题原文。</p>'
    + '</div>';

  document.title = '计算机考研 · 全科笔记';

  const topL = document.querySelector('.page-top .l');
  if(topL){
    topL.innerHTML = MENU_BTN
      + '<span>计算机科学与技术</span><span class="sep">·</span><span>七科</span>';
    setupMenu();
  }
}

/* ---------- 首页：某科目录 ---------- */

function renderHome(){
  const S = CUR.subject;
  const st = overallStats();

  renderSpine(null);
  renderSubjTabs();

  const last = store.get('last', null);
  const lastSec = last ? flatSections().find(s => s.id === last) : null;
  const resume = (lastSec && isDone(lastSec.id))
    ? '<a class="resume" href="' + noteUrl(lastSec.id) + '">'
      + '<span class="rl">继续上次</span>'
      + '<span class="rt">' + lastSec.no + '　' + lastSec.name + '</span>'
      + '<span class="ra">→</span></a>'
    : '';

  const blocks = CUR.chapters.map(c => {
    const cs = chapterStats(c);
    const rows = c.sections.map(s => {
      const done = isDone(s.id);
      return '<a class="sec ' + (done ? 'done' : 'todo') + '"'
        + (done ? ' href="' + noteUrl(s.id) + '"' : '')
        + ' data-text="' + escHtml(s.no + ' ' + s.name) + '">'
        + '<span class="no">' + s.no + '</span>'
        + '<span class="nm">' + s.name + '</span>'
        + '<span class="st">' + (done ? '✓' : '·') + '</span></a>';
    }).join('');

    return '<section class="ch-block" id="ch-' + c.no + '">'
      + '<div class="ch-head">'
      + '<span class="ch-roman">' + c.roman + '</span>'
      + '<h2>' + c.name + '</h2>'
      + '<span class="ch-sub">' + c.sub + '</span>'
      + '<span class="cnt">' + cs.done + ' / ' + cs.total + '</span>'
      + '</div>'
      + '<div class="sec-list">' + rows + '</div>'
      + '</section>';
  }).join('');

  document.getElementById('main').innerHTML =
    '<div class="home">'
    + '<div class="subj-tabs" id="subjTabs"></div>'
    + '<div class="home-kicker">' + S.code + ' · ' + S.exam + '</div>'
    + '<h1>' + S.name + '<em>' + S.label + '</em></h1>'
    + '<p class="intro">' + S.intro + '</p>'
    + '<div class="sign">—— 更新于 ' + S.updated + '</div>'

    + '<div class="strip">'
    + '<div><div class="num">' + st.done + '<small>/ ' + st.total + ' 节</small></div>'
    + '<div class="lbl">已写完</div></div>'
    + '<div class="bar"><i style="width:' + st.pct + '%"></i></div>'
    + '<div><div class="num">' + st.pct + '<small>%</small></div>'
    + '<div class="lbl">总进度</div></div>'
    + '</div>'

    + resume

    + '<div class="searchbar">'
    + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>'
    + '<input id="q" type="search" autocomplete="off" placeholder="搜索本册 ' + st.total + ' 节标题">'
    + '<span class="qcnt" id="qcnt"></span>'
    + '</div>'

    + '<div id="chapters">' + blocks + '</div>'
    + '<div class="noresult" id="noresult" hidden>没有匹配的节。</div>'

    + '<p class="disclaimer">' + S.disclaimer + '</p>'
    + '</div>';

  document.title = S.name + ' · ' + S.label;

  // 顶部条：科目名 + 章数 + 回总览
  const topL = document.querySelector('.page-top .l');
  if(topL){
    topL.innerHTML = MENU_BTN
      + '<a class="back" href="index.html">← 全部科目</a>'
      + '<span class="sep">·</span>'
      + '<span class="tname">' + S.name + '</span><span class="sep">·</span>'
      + '<span>' + CUR.chapters.length + ' 章 ' + st.total + ' 节</span>';
    setupMenu();
  }

  renderSubjTabs();
  setupSearch();
}

function setupSearch(){
  const q = document.getElementById('q');
  const cnt = document.getElementById('qcnt');
  const none = document.getElementById('noresult');
  if(!q) return;

  function run(){
    const key = q.value.trim().toLowerCase();
    let hit = 0;
    document.querySelectorAll('.ch-block').forEach(block => {
      let visible = 0;
      block.querySelectorAll('.sec').forEach(sec => {
        const t = (sec.dataset.text || '').toLowerCase();
        const ok = !key || t.indexOf(key) >= 0;
        sec.style.display = ok ? '' : 'none';
        if(ok) visible++;
      });
      block.style.display = visible ? '' : 'none';
      hit += visible;
    });
    cnt.textContent = key ? hit + ' 节' : '';
    none.hidden = !(key && hit === 0);
  }

  q.addEventListener('input', run);
  q.addEventListener('keydown', e => { if(e.key === 'Escape'){ q.value = ''; run(); q.blur(); } });
}

/* ---------- 笔记页 ---------- */

function renderNote(id){
  const S = CUR.subject;
  renderSpine(id);

  const all = flatSections();
  const idx = all.findIndex(s => s.id === id);
  const sec = idx >= 0 ? all[idx] : null;
  const page = CUR.pages[id];
  const main = document.getElementById('main');

  const crumb = document.getElementById('crumb');
  if(crumb && sec){
    crumb.innerHTML = '<a class="back" href="' + subjUrl(S.id) + '">← 目录</a>'
      + '<span class="sep">·</span>'
      + '<span class="cr">' + sec.chapter.roman + '、' + sec.chapter.name + '</span>'
      + '<span class="sep">/</span>'
      + '<span class="now">' + sec.no + ' ' + sec.name + '</span>';
  }

  if(page){
    store.set('last', id);
    const read = store.get('read', []);
    if(read.indexOf(id) < 0){ read.push(id); store.set('read', read); }
  }

  if(!page){
    main.innerHTML = '<div class="note"><div class="note-body">'
      + '<div class="empty"><div class="big">这一节还没写</div>'
      + '<p>' + (sec ? sec.no + '　' + sec.name : id) + '<br>大纲里已经留了位置，内容待补。</p>'
      + '<p class="ehint"><a href="' + subjUrl(S.id) + '">← 回目录</a>'
      + (idx >= 0 && all[idx - 1] && isDone(all[idx-1].id)
          ? '<a href="' + noteUrl(all[idx-1].id) + '">看上一节</a>' : '')
      + '</p></div></div></div>';
    document.title = '待写 · ' + S.name;
    return;
  }

  const nav = page.sections.map((s, i) =>
    '<a href="#s' + (i + 1) + '">' + (i + 1) + '　' + s.h + '</a>'
  ).join('');

  const body = page.sections.map((s, i) => {
    const num = page.no + '.' + (i + 1);
    return '<h2 class="sec" id="s' + (i + 1) + '"><span class="n">' + num + '</span>' + s.h + '</h2>'
      + s.blocks.map(renderBlock).join('');
  }).join('');

  const margin = (page.margin || []).map(m =>
    '<div class="margin-note"><span class="no">' + m.n + '</span>' + inline(m.x) + '</div>'
  ).join('');

  const summary = page.summary ? '<div class="summary">'
    + '<div class="lb">SUMMARY · 这一页记住三件事</div>'
    + '<ol>' + page.summary.map(s => '<li>' + inline(s) + '</li>').join('') + '</ol>'
    + '</div>' : '';

  const refs = page.source
    ? '<div class="refs"><span class="rl">参考</span>' + inline(page.source) + '</div>'
    : '';

  const prev = idx > 0 ? all[idx - 1] : null;
  const next = (idx >= 0 && idx < all.length - 1) ? all[idx + 1] : null;

  function pager(s, label, side){
    if(!s) return '<span></span>';
    const done = isDone(s.id);
    const cls = side === 'r' ? ' class="r"' : '';
    const text = '<small>' + label + '</small>' + s.no + '　' + s.name;
    if(!done){
      return '<a' + cls + ' style="opacity:.4;cursor:default">' + text
        + '<em class="todo-tip">待写</em></a>';
    }
    const hid = side === 'r' ? ' id="nextLink"' : ' id="prevLink"';
    return '<a' + cls + hid + ' href="' + noteUrl(s.id) + '" data-href="' + noteUrl(s.id) + '">'
      + text + '</a>';
  }

  main.innerHTML = '<div class="note">'
    + '<div class="note-body">'
    + '<div class="note-head">'
    + '<div class="stamp">考研重点</div>'
    + '<div class="ch">' + S.name + '　·　' + sec.chapter.roman + '、' + sec.chapter.name + '　·　' + page.no + '　·　' + page.en + '</div>'
    + '<h1>' + page.title + '</h1>'
    + '<div class="lead">' + inline(page.lead) + '</div>'
    + '<div class="tags">' + (page.tags || []).map(t => '<span>' + t + '</span>').join('')
    + '<span>' + page.min + ' min</span></div>'
    + '</div>'
    + '<nav class="sec-nav" id="secNav">' + nav + '</nav>'
    + body
    + refs
    + summary
    + '<div class="pager">' + pager(prev, '上一节', '') + pager(next, '下一节', 'r') + '</div>'
    + '<div class="keys">← → 翻节　·　Esc 回目录</div>'
    + '</div>'
    + '<div class="margin-col">' + margin + '</div>'
    + '</div>';

  document.title = page.title + ' · ' + S.name;

  setupSecNav();
  setupKeys();
}

function setupSecNav(){
  const nav = document.getElementById('secNav');
  if(!nav) return;
  const links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  const heads = links.map(a => document.querySelector(a.getAttribute('href')));
  if(!links.length) return;

  function onScroll(){
    let cur = 0;
    heads.forEach((h, i) => {
      if(h && h.getBoundingClientRect().top <= 150) cur = i;
    });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(!t) return;
    const y = t.getBoundingClientRect().top + window.scrollY - 18;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }));
}

function setupKeys(){
  document.addEventListener('keydown', e => {
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if(e.key === 'ArrowLeft'){
      const a = document.getElementById('prevLink');
      if(a) location.href = a.dataset.href;
    } else if(e.key === 'ArrowRight'){
      const a = document.getElementById('nextLink');
      if(a) location.href = a.dataset.href;
    } else if(e.key === 'Escape'){
      location.href = subjUrl(CUR.subject.id);
    }
  });
}

/* 共用的目录开关按钮 */
const MENU_BTN = '<button class="menu-btn" id="menuBtn" title="收起 / 展开目录">'
  + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  + '<span class="mb-text">章节</span></button>';

function setupMenu(){
  const btn = document.getElementById('menuBtn');
  const mask = document.getElementById('mask');
  const spine = document.querySelector('.spine');
  if(!btn || !spine || !mask) return;

  const narrow = () => window.matchMedia('(max-width: 980px)').matches;

  function closeDrawer(){ spine.classList.remove('open'); mask.classList.remove('on'); }

  btn.addEventListener('click', () => {
    if(narrow()){
      spine.classList.toggle('open');
      mask.classList.toggle('on');
    } else {
      const off = document.body.classList.toggle('spine-off');
      try{ localStorage.setItem('ui:spine', off ? 'off' : 'on'); }catch(e){}
    }
  });

  mask.addEventListener('click', closeDrawer);
  spine.addEventListener('click', e => { if(e.target.closest('a')) closeDrawer(); });
}

/* 恢复上次的收起状态 */
function restoreSpine(){
  try{
    if(localStorage.getItem('ui:spine') === 'off') document.body.classList.add('spine-off');
  }catch(e){}
}

/* ---------- 启动 ---------- */

window.addEventListener('DOMContentLoaded', () => {
  const ALL = window.SUBJECTS;
  if(!ALL || !Object.keys(ALL).length){
    document.getElementById('main').innerHTML =
      '<div class="empty"><div class="big">数据没加载上</div>'
      + '<p>检查 data/ 目录下的 js 文件是否都在，路径对不对。</p></div>';
    return;
  }

  const params = new URLSearchParams(location.search);
  const want = params.get('s');
  const page = document.body.dataset.page;

  setupMenu();
  restoreSpine();

  // 没有 ?s= 的首页 = 全科总览
  if(page === 'home' && !want){
    renderPortal();
    return;
  }

  CUR = ALL[want] || ALL.ds || ALL[Object.keys(ALL)[0]];
  PREFIX = CUR.subject.id + ':';

  if(page === 'home'){
    renderHome();
    if(location.hash){
      const el = document.querySelector(location.hash);
      if(el) el.scrollIntoView({ block: 'start' });
    }
  } else if(page === 'note'){
    const id = params.get('id');
    const first = CUR.chapters[0] && CUR.chapters[0].sections[0];
    renderNote(id || (first ? first.id : ''));
  }
});
