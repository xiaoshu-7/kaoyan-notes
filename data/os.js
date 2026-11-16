/* ============================================================
   操作系统 · 408 —— 数据文件
   编号前缀统一用 os-
   ============================================================ */

window.SUBJECTS = window.SUBJECTS || {};

window.SUBJECTS.os = {

  subject: {
    id: 'os',
    name: '操作系统',
    label: '考研笔记',
    code: '408',
    exam: '计算机学科专业基础综合',
    intro: '操作系统这门课的主线是「管理资源」：管 CPU（进程调度）、管内存（分页分段）、管文件（目录与磁盘）、管设备（I/O 与磁盘调度）。每章都在回答同一个问题——怎么分、怎么抢、怎么不死锁。',
    updated: '2026.11.16',
    disclaimer: '章节按 408 考试大纲编排，具体年份可能微调，以你手上的大纲为准。'
  },

  chapters: [
    {
      no: '01', roman: '一', name: '操作系统概述',
      sub: '概念 · 发展 · 运行环境',
      sections: [
        { id: 'os-concept', no: '1.1', name: '操作系统的基本概念' },
        { id: 'os-history', no: '1.2', name: '操作系统的发展与分类' },
        { id: 'os-env',     no: '1.3', name: '操作系统的运行环境' }
      ]
    },
    {
      no: '02', roman: '二', name: '进程与线程',
      sub: '状态 · 调度 · 同步 · 死锁',
      sections: [
        { id: 'os-process',  no: '2.1', name: '进程与线程' },
        { id: 'os-schedule', no: '2.2', name: '处理机调度' },
        { id: 'os-sync',     no: '2.3', name: '同步与互斥' },
        { id: 'os-semaphore', no: '2.4', name: '信号量与管程' },
        { id: 'os-deadlock', no: '2.5', name: '死锁' },
        { id: 'os-ipc',      no: '2.6', name: '进程通信与线程实现' }
      ]
    },
    {
      no: '03', roman: '三', name: '内存管理',
      sub: '连续分配 · 分页 · 分段 · 虚拟内存',
      sections: [
        { id: 'os-mem-basic',  no: '3.1', name: '内存管理基础' },
        { id: 'os-mem-contig', no: '3.2', name: '连续分配管理' },
        { id: 'os-paging',     no: '3.3', name: '分页管理' },
        { id: 'os-segment',    no: '3.4', name: '分段与段页式' },
        { id: 'os-virtual',    no: '3.5', name: '虚拟内存与页面置换' }
      ]
    },
    {
      no: '04', roman: '四', name: '文件管理',
      sub: '文件 · 物理结构 · 目录 · 磁盘',
      sections: [
        { id: 'os-file-basic', no: '4.1', name: '文件系统基础' },
        { id: 'os-file-alloc', no: '4.2', name: '文件的物理结构' },
        { id: 'os-dir',        no: '4.3', name: '目录与文件共享' },
        { id: 'os-fs-impl',    no: '4.4', name: '文件系统实现与磁盘' }
      ]
    },
    {
      no: '05', roman: '五', name: '输入/输出管理',
      sub: 'I/O 层次 · 设备 · 磁盘调度',
      sections: [
        { id: 'os-io-basic',  no: '5.1', name: 'I/O 管理概述' },
        { id: 'os-io-layer',  no: '5.2', name: 'I/O 软件层次与设备' },
        { id: 'os-disk-sched', no: '5.3', name: '磁盘调度' }
      ]
    }
  ],

  pages: {
  }
};
