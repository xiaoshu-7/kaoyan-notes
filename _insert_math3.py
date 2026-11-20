# -*- coding: utf-8 -*-
import io, re
p = 'game.html'
s = io.open(p, encoding='utf-8').read()
n = 0
def rep(a, b, label=''):
    global s, n
    if a in s:
        s = s.replace(a, b, 1); n += 1
    else:
        print('✗ ' + (label or a[:60]))

entries = io.open('_tmp_math3.js', encoding='utf-8').read().rstrip(',')
start = s.index('const BANK = [')
end = s.index('\n];', start)
before = s[:end].rstrip()
s = (before + ',\n' + entries + s[end:]) if not before.endswith(',') else (s[:end] + '\n' + entries + s[end:])
n += 1

rep("const SUBJ_CH3 = {",
"""const SUBJ_CH3 = {
  math: [
    {n:1,  waves:8,  types:['drone'], map:'fortress', mods:[], bank:'M11',
     traits:['multi','rapid','armor']},
    {n:2,  waves:8,  types:['drone'], map:'cross', mods:['rush'], bank:'M11',
     traits:['multi','rapid','armor']},
    {n:3,  waves:9,  types:['drone','shooter'], map:'rooms', mods:[], bank:'M12',
     traits:['multi','rapid','armor','pierce'], newEnemy:'shooter'},
    {n:4,  waves:9,  types:['drone','shooter'], map:'fortress', mods:['iron'], bank:'M12',
     traits:['multi','rapid','armor','pierce','regen']},
    {n:5,  waves:0,  types:['drone','shooter'], map:'ring', mods:[], bank:['M11','M12'],
     goal:'survive', survive:4500,
     traits:['multi','rapid','armor','pierce','regen','speed']},
    {n:6,  waves:10, types:['drone','shooter','ordered'], map:'cross', mods:['frenzy'], bank:'M13',
     traits:['multi','rapid','armor','pierce','regen','speed','crit'], newEnemy:'charger'},
    {n:7,  waves:10, types:['drone','shooter','charger'], map:'rooms', mods:['elite'], bank:'M14',
     traits:['multi','rapid','armor','pierce','regen','speed','crit','bounce']},
    {n:8,  waves:10, types:['drone','shooter','charger'], map:'fortress', mods:[], bank:'M15',
     goal:'escort',
     traits:['multi','rapid','armor','pierce','regen','speed','crit','bounce','thorns']},
    {n:9,  waves:11, types:['drone','shooter','charger','split'], map:'arena', mods:['rush','iron'],
     bank:['M13','M14','M15'],
     traits:['multi','rapid','armor','pierce','regen','speed','crit','bounce','thorns','orbit']},
    {n:10, waves:12, types:['drone','shooter','charger','tank'], map:'fortress', mods:[], boss:true, bossType:'ordered',
     bank:['M11','M12','M13','M14','M15'],
     traits:['multi','rapid','armor','pierce','regen','speed','crit','bounce','thorns','orbit','chain','steal'],
     newEnemy:'tank'}
  ],""", '数学第3章')

rep("""    {id:'cm-20', title:'直线与平面平行', src:'MATH10', body:'方向向量 ⊥ 法向量（点积 0），且直线上的点不在平面上。'}
  ],""",
"""    {id:'cm-20', title:'直线与平面平行', src:'MATH10', body:'方向向量 ⊥ 法向量（点积 0），且直线上的点不在平面上。'},
    {id:'cm-21', title:'常见分布速记', src:'MATH11', body:'二项 np, np(1−p)；泊松 λ, λ；均匀 (a+b)/2, (b−a)²/12；指数 1/λ, 1/λ²。'},
    {id:'cm-22', title:'密度函数', src:'MATH11', body:'非负且积分为 1。单点概率为 0，概率是区间上的积分。'},
    {id:'cm-23', title:'不相关 ≠ 独立', src:'MATH12', body:'独立必不相关，反之不然。但二维正态是例外（等价）。'},
    {id:'cm-24', title:'和的方差', src:'MATH12', body:'独立时 D(X+Y) = D(X)+D(Y)。一般要加 2Cov。'},
    {id:'cm-25', title:'方差性质', src:'MATH13', body:'D(aX+b) = a²D(X)。常数不影响，系数要平方。'},
    {id:'cm-26', title:'相关系数', src:'MATH13', body:'ρ ∈ [−1,1]，只衡量线性关系。|ρ|=1 完全线性。'},
    {id:'cm-27', title:'大数定律 vs CLT', src:'MATH14', body:'前者说「收敛到期望」，后者说「趋于正态」。'},
    {id:'cm-28', title:'CLT 的 n', src:'MATH14', body:'经验上 n ≥ 30 时，和的分布已接近正态（不论原分布）。'},
    {id:'cm-29', title:'样本方差分母', src:'MATH15', body:'n−1 而不是 n，才能无偏（贝塞尔校正）。'},
    {id:'cm-30', title:'无偏 vs 有效', src:'MATH15', body:'无偏：期望等于参数。有效：无偏中方差最小。'}
  ],""", '数学卡片')

io.open(p, 'w', encoding='utf-8').write(s)
print('game: 成功 ' + str(n) + ' 处')

h = io.open('hub.html', encoding='utf-8').read()
m = 0
def reph(a, b, label=''):
    global h, m
    if a in h:
        h = h.replace(a, b, 1); m += 1
    else:
        print('✗ hub: ' + (label or a[:50]))

new_bank = re.search(r'const BANK = \[[\s\S]*?\n\];', s).group(0)
st = h.index('const BANK = ['); i = h.index('[', st); depth = 0
for j in range(i, len(h)):
    if h[j] == '[': depth += 1
    elif h[j] == ']':
        depth -= 1
        if depth == 0: en = j + 1; break
en = h.index(';', en) + 1
h = h[:st] + new_bank + h[en:]; m += 1

h = re.sub(r'const BANK_LEN = [0-9]+;', 'const BANK_LEN = 1181;', h, count=1); m += 1

reph("         {no:2, name:'第二章 高数深入', ready:true}],",
     "         {no:2, name:'第二章 高数深入', ready:true},\n         {no:3, name:'第三章 概率统计', ready:true}],", '数学章节3')

reph("  M6:'多元微分', M7:'多重积分', M8:'无穷级数', M9:'微分方程', M10:'空间解析几何',",
     "  M6:'多元微分', M7:'多重积分', M8:'无穷级数', M9:'微分方程', M10:'空间解析几何',\n  M11:'随机变量', M12:'多维随机变量', M13:'数字特征', M14:'大数定律与CLT', M15:'数理统计',", 'TAG_M11')

reph("  {id:10, name:'数学一（第二章）', tags:['M6','M7','M8','M9','M10'], subj:'math'},",
     "  {id:10, name:'数学一（第二章）', tags:['M6','M7','M8','M9','M10'], subj:'math'},\n  {id:23, name:'数学一（第三章）', tags:['M11','M12','M13','M14','M15'], subj:'math'},", 'BANK_CHAPS_MATH3')

io.open('hub.html', 'w', encoding='utf-8').write(h)
print('hub: 成功 ' + str(m) + ' 处')

sub = io.open('subjects.html', encoding='utf-8').read()
old = "{id:'math',name:'数学一',        icon:'∑', col:'#ffa94d', chapters:2, ready:true,  desc:'极限、导数、积分、多元、级数、微分方程'},"
new = "{id:'math',name:'数学一',        icon:'∑', col:'#ffa94d', chapters:3, ready:true,  desc:'高数、线代、概率统计（完整三章）'},"
if old in sub:
    sub = sub.replace(old, new, 1)
    io.open('subjects.html', 'w', encoding='utf-8').write(sub)
    print('subjects: 数学 3 章')
else:
    print('✗ subjects 未命中')
