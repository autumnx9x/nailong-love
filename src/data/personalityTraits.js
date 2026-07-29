/**
 * personalityTraits.js — 恋爱人格维度系统
 *
 * 六维人格：
 *   empathy       — 情绪共鸣
 *   expression    — 情感表达
 *   stability     — 稳定需求
 *   adventure     — 探索欲
 *   insight       — 理解能力
 *   independence  — 独立程度
 *
 * 功能：
 * 1. 6 维度定义 + 角色理想分
 * 2. 维度分 → 人格类型推导
 * 3. 奶龙对用户人格的专属评价
 */

// ==========================================
// 维度定义
// ==========================================
export const DIMENSIONS = {
  empathy: {
    id: 'empathy',
    label: '情绪共鸣',
    emoji: '💛',
    description: '你天生能感受他人的情绪，用共情连接彼此。',
  },
  expression: {
    id: 'expression',
    label: '情感表达',
    emoji: '💬',
    description: '你擅长用语言和行动表达内心的情感。',
  },
  stability: {
    id: 'stability',
    label: '稳定需求',
    emoji: '🏠',
    description: '你重视关系的安全感和持久的陪伴。',
  },
  adventure: {
    id: 'adventure',
    label: '探索欲',
    emoji: '🧭',
    description: '你对新鲜体验充满好奇，喜欢和爱人一起冒险。',
  },
  insight: {
    id: 'insight',
    label: '理解能力',
    emoji: '🔍',
    description: '你善于洞察表面之下的真相，读懂未说出口的话。',
  },
  independence: {
    id: 'independence',
    label: '独立程度',
    emoji: '🌿',
    description: '你在爱中保持自我，相信独立让关系更健康。',
  },
}

// ==========================================
// 角色理想人格分（用于匹配度计算）
// 每个维度的值域：0-10
// ==========================================
export const CHARACTER_IDEALS = {
  warm: {
    // 暖心奶龙：高共鸣、高稳定、中表达、低冒险、中洞察、低独立
    empathy: 9,
    expression: 6,
    stability: 8,
    adventure: 2,
    insight: 5,
    independence: 3,
  },
  tsundere: {
    // 傲娇奶龙：中低共鸣、低表达、中稳定、低冒险、高洞察、高独立
    empathy: 4,
    expression: 2,
    stability: 6,
    adventure: 3,
    insight: 8,
    independence: 7,
  },
  adventure: {
    // 冒险奶龙：中低共鸣、高表达、低稳定、高冒险、中低洞察、中独立
    empathy: 4,
    expression: 8,
    stability: 2,
    adventure: 9,
    insight: 4,
    independence: 5,
  },
  mystery: {
    // 神秘奶龙：中共鸣、低表达、中稳定、低冒险、高洞察、高独立
    empathy: 5,
    expression: 2,
    stability: 6,
    adventure: 3,
    insight: 9,
    independence: 8,
  },
}

// ==========================================
// 人格类型推导
// ==========================================

/**
 * 根据维度得分推导人格类型
 * @param {{ [dimId: string]: number }} scores
 * @returns {{ personalityType: string, topDimensions: string[], dimensions: object[] }}
 */
export function derivePersonality(scores) {
  const sorted = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])

  const top2 = sorted.slice(0, 2).map(([id]) => id)
  const personalityType = getTypeName(top2)

  const dimensions = sorted.map(([id, score]) => ({
    ...DIMENSIONS[id],
    score,
    percentage: Math.round((score / 24) * 100), // 24 = 8题 × 3分 理论满分
  }))

  return {
    personalityType,
    topDimensions: top2,
    topDimension: dimensions[0] || DIMENSIONS.empathy,
    dimensions,
  }
}

const TYPE_NAMES = {
  'empathy,expression': '温暖表达型',
  'empathy,stability': '安稳守护型',
  'empathy,adventure': '温柔冒险家',
  'empathy,insight': '深度共情型',
  'empathy,independence': '温柔独立型',
  'expression,stability': '坚定浪漫型',
  'expression,adventure': '热烈探索型',
  'expression,insight': '坦诚洞察型',
  'expression,independence': '自由表达型',
  'stability,adventure': '安稳冒险者',
  'stability,insight': '沉静守护型',
  'stability,independence': '独立港湾型',
  'adventure,insight': '探索观察者',
  'adventure,independence': '自由流浪者',
  'insight,independence': '冷静观察型',
}

function getTypeName(top2) {
  const key = top2.slice(0, 2).sort().join(',')
  return TYPE_NAMES[key] || DIMENSIONS[top2[0]]?.label + '型' || '均衡型'
}

// ==========================================
// 匹配度计算
// ==========================================

/**
 * @param {{ [dimId: string]: number }} userScores — 用户 8 题维度累计分
 * @param {string} characterId
 * @returns {number} 匹配度 0-100
 */
export function calculateMatchScore(userScores, characterId) {
  const ideal = CHARACTER_IDEALS[characterId]
  if (!ideal) return 50

  const dims = Object.keys(DIMENSIONS)
  const maxTotalScore = 24 // 8题 × 3分/题 = 理论满分

  // 归一化用户分到 0-10
  const normalized = {}
  dims.forEach((d) => {
    normalized[d] = Math.min(10, Math.round(((userScores[d] || 0) / maxTotalScore) * 10))
  })

  // 计算与角色理想分的绝对距离
  let totalDistance = 0
  let maxDistance = 0
  dims.forEach((d) => {
    const dist = Math.abs(normalized[d] - ideal[d])
    totalDistance += dist
    maxDistance += 10 // 每维度最大差 10
  })

  const match = Math.round(100 - (totalDistance / maxDistance) * 100)
  return Math.max(0, Math.min(100, match))
}

// ==========================================
// 奶龙对用户人格的评价
// ==========================================
const EVALUATIONS = {
  warm: {
    empathy: '你比我更懂得共情。和你在一起，我感觉自己被真正理解了。',
    expression: '你的坦率让我学会更勇敢地表达。谢谢你带给我这份勇气。',
    stability: '你的稳重是我最安心的港湾。和你在一起，我不再害怕未来。',
    adventure: '你让我看到，温柔的人也可以有一颗冒险的心。',
    insight: '你能看穿我所有的担心——然后轻轻地化解它们。',
    independence: '你给我空间做自己，这反而让我更想靠近你。',
  },
  tsundere: {
    empathy: '你总能读懂我嘴硬背后的真实想法。这让我又害羞又安心。',
    expression: '你这么直接……让我怎么继续嘴硬啊。不过，我不讨厌。',
    stability: '你的坚定让我觉得——可以不用每天担心你会离开。',
    adventure: '我才不是为了你才尝试新事物的。……好吧，有一点点是因为你。',
    insight: '你理解我为什么说不出口。从来没有人这样耐心地等过我。',
    independence: '你不黏人，但每次回来都会让我心跳加速。这很不公平。',
  },
  adventure: {
    empathy: '我习惯了往前跑，是你让我学会偶尔回头看看身边的人。',
    expression: '你的热情和我一样！我们是最合拍的探险搭档。',
    stability: '我以为安稳很无聊——直到你让我明白它可以很温暖。',
    adventure: '一起去更大的世界吧！有你在，哪里都是目的地。',
    insight: '你看穿了我的不安——我其实害怕停下来。谢谢你理解。',
    independence: '你也有自己的方向。这很棒——我们可以并肩走，不用谁等谁。',
  },
  mystery: {
    empathy: '我不常说出口，但你的温暖我一直能感受到。像月光一样安静。',
    expression: '你的表达让我觉得自己也可以慢慢打开。虽然还需要一点时间。',
    stability: '我以为自己习惯独处。直到你让我觉得——有人在等，也不错。',
    adventure: '你对外界的好奇让我想起自己最初的样子。我们一起探索吧。',
    insight: '你懂我为什么沉默。这比千言万语都珍贵。',
    independence: '你有你的世界，我有我的。但我们在彼此的世界里都有位置。',
  },
}

export function getEvaluation(characterId, topDimensionId) {
  const charEval = EVALUATIONS[characterId]
  if (!charEval) return '和你在一起的每一天，都是我生命里最特别的日子。'
  return charEval[topDimensionId] || Object.values(charEval)[0]
}
