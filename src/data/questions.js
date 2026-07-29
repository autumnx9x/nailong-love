/**
 * questions.js — 8 个场景下的共用恋爱选择问题
 *
 * 所有奶龙共享同一套问题。
 * 每个选项对 6 个维度进行计分（每个选项总分 3 分，分配在 1-3 个维度上）。
 *
 * 六维人格：
 *   empathy       — 情绪共鸣（你有多容易感受对方情绪）
 *   expression    — 情感表达（你是否主动表达感情）
 *   stability     — 稳定需求（你对关系稳定性的重视程度）
 *   adventure     — 探索欲（你对新鲜感和冒险的渴望）
 *   insight       — 理解能力（你多擅长看穿表面、理解本质）
 *   independence  — 独立程度（你在关系中保持自我的倾向）
 */

const questions = {
  scene1: {
    question: '第一次遇到让你心动的对象，你最自然的反应是？',
    options: [
      { text: '主动关心对方，让对方感到温暖', effects: { empathy: 2, expression: 1 } },
      { text: '先观察，找到合适的时机再靠近', effects: { insight: 2, independence: 1 } },
      { text: '直接邀请 TA 一起去做有趣的事', effects: { adventure: 2, expression: 1 } },
      { text: '安静等待，看对方是否会先注意到你', effects: { independence: 2, stability: 1 } },
    ],
  },
  scene2: {
    question: '约会时，你更倾向于哪种方式？',
    options: [
      { text: '精心准备每一个细节，让对方感到被重视', effects: { empathy: 2, stability: 1 } },
      { text: '随性而行，享受旅途中的意外和惊喜', effects: { adventure: 2, expression: 1 } },
      { text: '观察对方的反应，根据 TA 的状态调整节奏', effects: { insight: 2, empathy: 1 } },
      { text: '保持轻松自然，给彼此留足够的空间', effects: { independence: 2, stability: 1 } },
    ],
  },
  scene3: {
    question: '当对方情绪低落时，你会怎么做？',
    options: [
      { text: '安静陪在身边，用行动传递"我在"', effects: { empathy: 2, stability: 1 } },
      { text: '带 TA 出门散心，用新鲜事物转移注意力', effects: { adventure: 2, expression: 1 } },
      { text: '试着理解 TA 为什么难过，帮 TA 理清思路', effects: { insight: 2, empathy: 1 } },
      { text: '给 TA 一些独处的时间，等 TA 准备好了再聊', effects: { independence: 2, insight: 1 } },
    ],
  },
  scene4: {
    question: '你们发生了第一次矛盾，你的处理方式是？',
    options: [
      { text: '先安抚情绪，再慢慢沟通问题所在', effects: { empathy: 2, stability: 1 } },
      { text: '直接说出你的真实感受，不拐弯抹角', effects: { expression: 2, insight: 1 } },
      { text: '试着站在对方的角度理解 TA 为什么生气', effects: { insight: 2, empathy: 1 } },
      { text: '先冷静一下，等双方情绪平复了再谈', effects: { independence: 2, stability: 1 } },
    ],
  },
  scene5: {
    question: '特殊纪念日到了，你更喜欢怎么庆祝？',
    options: [
      { text: '亲手制作礼物，用行动表达你的心意', effects: { empathy: 2, expression: 1 } },
      { text: '安排一场充满惊喜的特别旅程', effects: { adventure: 2, expression: 1 } },
      { text: '写一封长信，把平时说不出口的话写下来', effects: { insight: 2, empathy: 1 } },
      { text: '简单过就好，重要的是两个人在一起的日常', effects: { stability: 2, independence: 1 } },
    ],
  },
  scene6: {
    question: '面对误会，你的第一反应通常是？',
    options: [
      { text: '主动找对方沟通，不想让误会影响感情', effects: { expression: 2, empathy: 1 } },
      { text: '先弄清楚事情的来龙去脉，再决定怎么回应', effects: { insight: 2, stability: 1 } },
      { text: '给对方时间和空间，相信时间会证明一切', effects: { independence: 2, stability: 1 } },
      { text: '坦诚说出你听到的和感受到的，一起面对', effects: { expression: 2, insight: 1 } },
    ],
  },
  scene7: {
    question: '当关系到了需要确认的阶段，你倾向于？',
    options: [
      { text: '用心准备一场告白，把感情说得清清楚楚', effects: { expression: 2, empathy: 1 } },
      { text: '不需要仪式感，彼此心照不宣就够了', effects: { independence: 2, stability: 1 } },
      { text: '确认之前先认真思考：你们真的适合彼此吗', effects: { insight: 2, stability: 1 } },
      { text: '把选择权交给对方，尊重 TA 的节奏和决定', effects: { empathy: 2, independence: 1 } },
    ],
  },
  scene8: {
    question: '面对未来，你更看重什么？',
    options: [
      { text: '无论发生什么，彼此扶持一起走下去', effects: { stability: 2, empathy: 1 } },
      { text: '一起去探索未知，未来本身就是一场冒险', effects: { adventure: 2, expression: 1 } },
      { text: '不断深入了解彼此，在理解中慢慢成长', effects: { insight: 2, stability: 1 } },
      { text: '保持各自的独立和追求，在自由中相爱', effects: { independence: 2, expression: 1 } },
    ],
  },
}

export default questions
