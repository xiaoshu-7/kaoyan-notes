/* ============================================================
   计算机组成原理 · 408 —— 数据文件
   编号前缀统一用 coa-（Computer Organization & Architecture）
   ============================================================ */

window.SUBJECTS = window.SUBJECTS || {};

window.SUBJECTS.coa = {

  subject: {
    id: 'coa',
    name: '计算机组成原理',
    label: '考研笔记',
    code: '408',
    exam: '计算机学科专业基础综合',
    intro: '组成原理是四科里最「硬」的一门，概念多、数字多、图也多。按「从下往上」的顺序组织：数字怎么表示、怎么存、怎么算、怎么控制。',
    updated: '2026.11.16',
    disclaimer: '章节按 408 考试大纲编排，具体年份可能微调，以你手上的大纲为准。'
  },

  chapters: [
    {
      no: '01', roman: '一', name: '计算机系统概述',
      sub: '组成 · 性能指标 · 层次结构',
      sections: [
        { id: 'coa-overview', no: '1.1', name: '计算机的发展与组成' },
        { id: 'coa-perf',     no: '1.2', name: '计算机性能指标' },
        { id: 'coa-layer',    no: '1.3', name: '计算机的层次结构' }
      ]
    },
    {
      no: '02', roman: '二', name: '数据的表示和运算',
      sub: '数制 · 定点数 · 浮点数 · ALU · 校验',
      sections: [
        { id: 'coa-number',  no: '2.1', name: '数制与编码' },
        { id: 'coa-fixed',   no: '2.2', name: '定点数的表示与运算' },
        { id: 'coa-float',   no: '2.3', name: '浮点数的表示与运算' },
        { id: 'coa-alu',     no: '2.4', name: '算术逻辑单元 ALU' },
        { id: 'coa-check',   no: '2.5', name: '数据的校验' }
      ]
    },
    {
      no: '03', roman: '三', name: '存储系统',
      sub: '主存 · 连接 · Cache · 虚拟存储',
      sections: [
        { id: 'coa-mem-overview', no: '3.1', name: '存储系统概述' },
        { id: 'coa-main-mem',     no: '3.2', name: '主存储器' },
        { id: 'coa-mem-connect',  no: '3.3', name: '主存与 CPU 的连接' },
        { id: 'coa-cache',        no: '3.4', name: 'Cache' },
        { id: 'coa-virtual-mem',  no: '3.5', name: '虚拟存储器' }
      ]
    },
    {
      no: '04', roman: '四', name: '指令系统',
      sub: '格式 · 寻址 · 类型 · CISC/RISC',
      sections: [
        { id: 'coa-instr-format', no: '4.1', name: '指令格式' },
        { id: 'coa-addressing',   no: '4.2', name: '寻址方式' },
        { id: 'coa-instr-type',   no: '4.3', name: '指令类型' },
        { id: 'coa-risc',         no: '4.4', name: 'CISC 与 RISC' }
      ]
    },
    {
      no: '05', roman: '五', name: '中央处理器',
      sub: '结构 · 数据通路 · 控制器 · 流水线',
      sections: [
        { id: 'coa-cpu-struct', no: '5.1', name: 'CPU 的功能与结构' },
        { id: 'coa-datapath',   no: '5.2', name: '指令周期与数据通路' },
        { id: 'coa-control',    no: '5.3', name: '控制器' },
        { id: 'coa-pipeline',   no: '5.4', name: '流水线' },
        { id: 'coa-interrupt',  no: '5.5', name: '异常与中断' }
      ]
    },
    {
      no: '06', roman: '六', name: '总线',
      sub: '分类 · 仲裁 · 操作',
      sections: [
        { id: 'coa-bus-basic', no: '6.1', name: '总线概述' },
        { id: 'coa-bus-ops',   no: '6.2', name: '总线仲裁与操作' }
      ]
    },
    {
      no: '07', roman: '七', name: '输入/输出系统',
      sub: '接口 · 设备 · 三种 I/O 方式',
      sections: [
        { id: 'coa-io-basic',  no: '7.1', name: 'I/O 系统概述' },
        { id: 'coa-device',    no: '7.2', name: '外部设备' },
        { id: 'coa-io-method', no: '7.3', name: 'I/O 方式' }
      ]
    }
  ],

  pages: {
  }
};
