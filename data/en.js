/* ============================================================
   英语一 · 考研 —— 数据文件
   编号前缀统一用 en-
   ============================================================ */

window.SUBJECTS = window.SUBJECTS || {};

window.SUBJECTS.en = {

  subject: {
    id: 'en',
    name: '英语一',
    label: '考研笔记',
    code: '201',
    exam: '全国硕士研究生招生考试 · 英语一',
    intro: '英语一没有「知识点」可背，只有「能力」可练。所以这套笔记不抄语法书，只拆三件事：句子怎么读、题目怎么定位、作文怎么写得像人话。',
    updated: '2026.11.16',
    disclaimer: '章节按英语一考试大纲编排，题型分值以最新大纲为准。'
  },

  chapters: [
    {
      no: '01', roman: '一', name: '基础能力',
      sub: '题型 · 词汇 · 长难句 · 语法',
      sections: [
        { id: 'en-format',  no: '1.1', name: '题型与分值分布' },
        { id: 'en-vocab',   no: '1.2', name: '核心词汇怎么背' },
        { id: 'en-longsent', no: '1.3', name: '长难句分析' },
        { id: 'en-grammar', no: '1.4', name: '必须补的语法体系' },
        { id: 'en-reading-logic', no: '1.5', name: '阅读的底层逻辑' }
      ]
    },
    {
      no: '02', roman: '二', name: '阅读理解',
      sub: '六类题型，占 40 分',
      sections: [
        { id: 'en-main',   no: '2.1', name: '主旨大意题' },
        { id: 'en-detail', no: '2.2', name: '细节事实题' },
        { id: 'en-infer',  no: '2.3', name: '推理判断题' },
        { id: 'en-attitude', no: '2.4', name: '态度观点题' },
        { id: 'en-word',   no: '2.5', name: '词义句意题' },
        { id: 'en-example', no: '2.6', name: '例证题' }
      ]
    },
    {
      no: '03', roman: '三', name: '其他题型',
      sub: '完型 · 新题型 · 翻译',
      sections: [
        { id: 'en-cloze',   no: '3.1', name: '完型填空' },
        { id: 'en-newtype', no: '3.2', name: '新题型' },
        { id: 'en-translate', no: '3.3', name: '翻译' },
        { id: 'en-paper',   no: '3.4', name: '真题怎么用' }
      ]
    },
    {
      no: '04', roman: '四', name: '写作',
      sub: '小作文 · 大作文 · 句式',
      sections: [
        { id: 'en-write-a', no: '4.1', name: '小作文：应用文' },
        { id: 'en-write-b', no: '4.2', name: '大作文：图画作文' },
        { id: 'en-template', no: '4.3', name: '模板与反模板' },
        { id: 'en-sentence', no: '4.4', name: '高分句式' },
        { id: 'en-timing',  no: '4.5', name: '时间分配与考场策略' }
      ]
    }
  ],

  pages: {

    /* ==================== 1.3 长难句分析 ==================== */
    'en-longsent': {
      no: '1.3',
      title: '长难句分析',
      en: 'Long Sentence Analysis',
      lead: '长难句不是「单词不认识」，而是「结构看不出来」。抓住三件事就够了：找主干、切从句、定位修饰。',
      tags: ['找主干', '切从句', '修饰后置'],
      updated: '2026.11.16',
      min: 12,
      source: '考研英语大纲 · 阅读理解部分',

      sections: [
        {
          h: '为什么读不懂',
          blocks: [
            { t: 'p', x: '长难句难在三件事：**修饰后置**、**从句嵌套**、**插入语打断**。中文习惯「定语在前」，英文习惯「定语在后」，所以一看到 `of`、`which`、`who` 就开始绕。' },
            { t: 'p', x: '解决顺序固定四步：' },
            { t: 'ol', x: [
              '**找谓语动词**——一个句子只有一个主谓语，其他都是从句或非谓语。',
              '**定主干**——主谓宾是谁，先不管修饰。',
              '**切从句**——看到 that / which / who / when 就切一刀，看它修饰谁。',
              '**回填修饰**——把切下来的部分塞回主干，理解完整意思。'
            ]},
            { t: 'p', x: '这四步做完，句子就变成了「主干 + 几个挂件」。挂件再多，主干只有一条。' }
          ]
        },
        {
          h: '拆一个真题级的长句',
          blocks: [
            { t: 'pair',
              ltag: '原文',
              left: 'The idea that plants have some degree of consciousness first took root in the early 2000s, when research suggested that plants could respond to stimuli in ways that seemed purposeful.',
              rtag: '译文',
              right: '植物具有某种程度意识的想法最早在 2000 年代初扎根，当时有研究表明植物能以看似有目的的方式对刺激作出反应。',
              cap: '主干：The idea took root. 剩下全是挂件。'
            },
            { t: 'p', x: '拆解过程：' },
            { t: 'ul', x: [
              '**主干**：`The idea ... took root`（这个想法扎根了）。',
              '**同位语从句**：`that plants have some degree of consciousness` 解释 idea 是什么。',
              '**时间状语**：`in the early 2000s`。',
              '**定语从句**：`when research suggested ...` 修饰 2000s（那个时候）。',
              '**宾语从句**：`that plants could respond to stimuli` 是 suggested 的内容。',
              '**方式状语**：`in ways that seemed purposeful` 说明怎么 respond。',
              '**定语从句**：`that seemed purposeful` 修饰 ways。'
            ]},
            { t: 'p', x: '一个 30 词的句子，切出来是「1 个主干 + 6 个挂件」。考试不要求你分析到这么细，但**必须能一眼看出主干在哪**——因为题目问的往往是主干，选项的干扰项来自挂件。' },
            { t: 'exam', x: '阅读题的干扰项有个固定套路：**把挂件里的信息当成主干**。比如原文说「研究表明 A」，选项说「A 是事实」——少掉了「研究表明」这个限定，就成了错的。'
            }
          ]
        },
        {
          h: '三种最常见的结构',
          blocks: [
            { t: 'table', head: ['结构', '标志', '怎么读'], rows: [
              ['**定语从句后置**', 'which / that / who 紧跟在名词后', '先跳过从句读主干，再回头看修饰谁'],
              ['**插入语**', '两个逗号或破折号夹一段', '**直接跳过**，它不影响主干'],
              ['**倒装**', '否定词开头、only 开头', '还原成正常语序再读']
            ], cap: '表 1-3　插入语最好认：两个逗号之间、去掉后句子依然完整，就是插入语。'
            },
            { t: 'p', x: '插入语是性价比最高的技巧——**看到两个逗号直接跳过**，句子立刻短一半。很多考生逐词翻译，就是被插入语带偏了。' },
            { t: 'pit', x: '不要「逐词翻译成中文再理解」。中文和英文的语序不同，逐词翻译会把句子拆散。正确做法是**先按英文结构理解，再整体转成中文**。'
            }
          ]
        }
      ],

      margin: [
        { n: '1', x: '一个句子只有一个谓语动词（不算从句里的）。找到它，主干就出来了。' },
        { n: '2', x: '插入语用两个逗号或两个破折号夹住，去掉后句子依然通顺。' }
      ],

      summary: [
        '**四步走：找谓语 → 定主干 → 切从句 → 回填修饰**。',
        '**插入语直接跳过**，它是长难句里最容易被识别的干扰。',
        '**干扰项常把挂件当主干**，做题时回到原文看修饰关系。'
      ]
    }

  }
};
