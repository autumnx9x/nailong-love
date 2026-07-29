/**
 * matchCalculator.js — 匹配度计算工具
 *
 * 根据用户的 6 维人格分数与选定奶龙的角色特征，
 * 计算恋爱匹配度（0-100）。
 *
 * 算法：
 *   1. 将用户 userTraits 归一化到 0-10 范围
 *   2. 与角色理想分逐维计算差值
 *   3. matchScore = 100 - averageDifference × 10
 *
 * 六维人格：
 *   empathy       — 情绪共鸣
 *   expression    — 情感表达
 *   stability     — 稳定需求
 *   adventure     — 探索欲
 *   insight       — 理解能力
 *   independence  — 独立程度
 */

// ==========================================
// 角色理想人格分（0-10）
// ==========================================
const CHARACTER_IDEALS = {
  warm: {
    // 暖心奶龙：高共鸣、高稳定、中表达
    empathy: 9,
    expression: 6,
    stability: 8,
    adventure: 2,
    insight: 5,
    independence: 3,
  },
  tsundere: {
    // 傲娇奶龙：高洞察、高独立、低表达
    empathy: 4,
    expression: 2,
    stability: 6,
    adventure: 3,
    insight: 8,
    independence: 7,
  },
  adventure: {
    // 冒险奶龙：高冒险、高表达、低稳定
    empathy: 4,
    expression: 8,
    stability: 2,
    adventure: 9,
    insight: 4,
    independence: 5,
  },
  mystery: {
    // 神秘奶龙：高洞察、高独立、低表达
    empathy: 5,
    expression: 2,
    stability: 6,
    adventure: 3,
    insight: 9,
    independence: 8,
  },
}

const DIMENSIONS = [
  'empathy',
  'expression',
  'stability',
  'adventure',
  'insight',
  'independence',
]

// userTraits 理论最高分（8 题 × 每题最多 3 分分配到某维度）
const MAX_USER_SCORE = 24

/**
 * 归一化用户分到 0-10
 */
function normalize(userTraits) {
  const normalized = {}
  DIMENSIONS.forEach((dim) => {
    normalized[dim] = Math.min(
      10,
      Math.round(((userTraits[dim] || 0) / MAX_USER_SCORE) * 10)
    )
  })
  return normalized
}

/**
 * @param {object} userTraits — 用户 8 题累计的 6 维分
 * @param {string} characterId — 角色 ID
 * @returns {number} 匹配度 0-100
 */
export function calculateMatch(userTraits, characterId) {
  const ideal = CHARACTER_IDEALS[characterId]
  if (!ideal) return 50

  const normalized = normalize(userTraits)

  let totalDifference = 0
  DIMENSIONS.forEach((dim) => {
    totalDifference += Math.abs(normalized[dim] - ideal[dim])
  })

  // maxDifference = 6维度 × 10 = 60
  const maxDifference = DIMENSIONS.length * 10
  const matchScore = Math.round(100 - (totalDifference / maxDifference) * 100)

  return Math.max(0, Math.min(100, matchScore))
}

/**
 * @param {number} matchScore — 匹配度
 * @returns {'perfect'|'good'|'neutral'|'bad'}
 */
export function getMatchTier(matchScore) {
  if (matchScore === 100) return 'perfect'
  if (matchScore === 0) return 'bad'
  if (matchScore >= 61) return 'good'
  if (matchScore >= 31) return 'neutral'
  return 'bad'
}

export { CHARACTER_IDEALS, DIMENSIONS }
