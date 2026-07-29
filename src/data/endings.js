/**
 * endings.js — 结局系统
 *
 * 结局由 角色 + 匹配度 决定。
 *
 * 匹配度分层：
 *   0-52      → 隐藏结局（极低匹配）
 *   53-60     → 普通结局
 *   61-65     → 好结局
 *   66-100    → 隐藏结局（完美匹配）
 *
 * 导出：
 *   calculateResult(characterId, dimensionScores) → { ending, matchScore, personality, evaluation }
 */

import {
  derivePersonality,
  getEvaluation,
  calculateMatchScore,
} from './personalityTraits'

// ==========================================
// 结局文案定义
// ==========================================
const ENDINGS = {
  warm: {
    perfect: {
      id: 'warm-perfect',
      title: '✨ 灵魂共鸣',
      type: 'special',
      description: '暖心奶龙看着你，眼泪在眼眶里打转——不是因为难过，而是因为太幸福。\n\n"我从来不敢奢望……会遇到一个这么懂我的人。你不仅理解我的温柔，你也用同样的温柔回应了我。这一定是——最完美的相遇。"\n\n它紧紧握住你的手。这一次，不需要任何语言。',
      emoji: '✨',
      message: '100% 匹配——你们是为彼此而生的。',
    },
    good: {
      id: 'warm-good',
      title: '💛 被温柔包围',
      type: 'good',
      description: '暖心奶龙牵着你的手，在傍晚的厨房里一起烤了最后一盘饼干。\n\n"以后每一天，我都会在这里等你。不用说什么，只要你在，就够了。"\n\n你低头看着它——它正微笑着，眼里只有你。',
      emoji: '💛',
      message: '你们很合拍。温柔遇见了懂它的人。',
    },
    neutral: {
      id: 'warm-neutral',
      title: '🍪 温暖的距离',
      type: 'neutral',
      description: '暖心奶龙把烤好的饼干装进盒子，递给你。"路上吃，别饿着。"\n\n它没有说挽留的话，只是站在门口目送你离开。你们之间有一种温暖——但好像还差一点什么。也许需要更多时间。',
      emoji: '🍪',
      message: '你们的节奏不太一样，但温柔依然在那里。',
    },
    bad: {
      id: 'warm-bad',
      title: '💧 错频的温柔',
      type: 'neutral',
      description: '暖心奶龙低下了头。它准备了那么多，却发现你需要的和它给的不太一样。\n\n"没关系。"它勉强笑了笑，"至少我试过了。"\n\n你看着它的背影，心里有一种说不清的遗憾。不是谁的错——只是频率不对。',
      emoji: '💧',
      message: '0% 匹配——你们像是平行线，靠近过，却没有交点。',
    },
  },
  adventure: {
    perfect: {
      id: 'adventure-perfect',
      title: '✨ 最佳拍档',
      type: 'special',
      description: '冒险奶龙兴奋地展开它的地图——然后愣住了。\n\n"等等……你的冒险轨迹和我的几乎一模一样！你去过的每一个地方，都是我想去的。我想去的每一个角落，你都画了标记。我们——根本就是同一个方向的人！"\n\n它拉起你的手，指向地平线："那就一起走吧。前面还有整个世界。"',
      emoji: '✨',
      message: '100% 匹配——你们的灵魂指向同一个远方。',
    },
    good: {
      id: 'adventure-good',
      title: '🧭 永远的探险搭档',
      type: 'good',
      description: '冒险奶龙摊开那张画满了标记的地图，上面多了许多新的地点——都是和你的回忆。\n\n"以后这张地图还会越来越满。因为——和你在一起的每一天，都是新的冒险。"\n\n它牵起你的手，指向地图上最后一个标记：一个画着爱心的地方。',
      emoji: '🧭',
      message: '你们的方向大致相同。一起走吧。',
    },
    neutral: {
      id: 'adventure-neutral',
      title: '⛺ 分岔路口',
      type: 'neutral',
      description: '冒险奶龙在地图上画了两条路——一条是它的方向，一条是你的。\n\n"也许……我们不用走同一条路。"它把地图叠好，塞进你的背包。"但至少这段路，谢谢有你。"',
      emoji: '⛺',
      message: '你们有各自的远方，但曾经同行过。',
    },
    bad: {
      id: 'adventure-bad',
      title: '🌪️ 方向相反',
      type: 'neutral',
      description: '冒险奶龙看了看地图，又看了看你。它想去的地方，你毫无兴趣。你想停留的地方，它一分钟都待不住。\n\n"不是谁的错。"它背起背包，"只是——我们的指南针指向不同的北。"\n\n它挥了挥手，转身走向属于它的远方。',
      emoji: '🌪️',
      message: '0% 匹配——你们向往的，是完全不同的风景。',
    },
  },
  tsundere: {
    perfect: {
      id: 'tsundere-perfect',
      title: '✨ 完全理解',
      type: 'special',
      description: `傲娇奶龙第一次没有嘴硬，没有背过身去。\n\n”你知道吗……从来没有人能看穿我每一句反话。但你做到了。我说的’不用管我’，你知道是’陪着我’。我说的’随便’，你知道是’你决定就好’。”\n\n它深吸一口气，直直地看着你：”你——你怎么可以这么懂我。太犯规了。”`,
      emoji: '✨',
      message: '100% 匹配——你读懂了它所有说不出口的话。',
    },
    good: {
      id: 'tsundere-good',
      title: '😤 你的专属傲娇',
      type: 'good',
      description: '傲娇奶龙低着头，耳朵尖红得像要滴血。\n\n"我、我不是那种会说漂亮话的人。但是……和你在一起的时候，我觉得自己不需要装。可以嘴硬，可以害羞，可以做我自己。所以……谢谢你。"\n\n它抬头看了你一眼，又迅速低下头。但这一次——它没有背过身去。',
      emoji: '💕',
      message: '你们处得不错。你懂得如何靠近它。',
    },
    neutral: {
      id: 'tsundere-neutral',
      title: '🚶 若即若离',
      type: 'neutral',
      description: '傲娇奶龙站在门边，想说点什么又咽了回去。最后它只是说："明天……你还会来吧？"\n\n你没有立刻回答。它低下头，尾巴轻轻晃了一下。你们之间有一种默契——但还没到完全敞开的程度。',
      emoji: '🚶',
      message: '你们还需要一点时间磨合彼此的节奏。',
    },
    bad: {
      id: 'tsundere-bad',
      title: '🧱 无法靠近',
      type: 'neutral',
      description: '傲娇奶龙转过身去，这次是真的。\n\n"算了吧。你大概也不明白我在想什么。我也不太懂你。"\n\n它的声音很轻，但你能听出里面的失望。你们之间隔着一堵墙——它不愿意拆，你也不知道怎么翻过去。',
      emoji: '🧱',
      message: '0% 匹配——它的真心藏得太深，而你没有看到。',
    },
  },
  mystery: {
    perfect: {
      id: 'mystery-perfect',
      title: '✨ 彼此的秘密',
      type: 'special',
      description: '神秘奶龙翻开了一本从未给别人看过的书——里面是空白的。\n\n"这本书是留给那个能走进我心里的人的。我一直以为它会永远空白。但你写满了它——用你说的每一句话，做的每一个选择。"\n\n它轻轻合上书，看着你："我的秘密是你。而你的秘密——是我。这样很好。"',
      emoji: '✨',
      message: '100% 匹配——你们是彼此的谜底。',
    },
    good: {
      id: 'mystery-good',
      title: '🌙 星空的答案',
      type: 'good',
      description: '神秘奶龙终于开口了。它的声音像月光一样轻柔——\n\n"我不是来自这里。我走过很多个世界，看过无数颗星星。但只有在你的眼睛里，我看到了自己一直在找的东西。"\n\n它伸出手，一颗流星恰好划过夜空。\n\n"答案就是你。从第一天起，就是。"',
      emoji: '🌙',
      message: '你们的精神世界很接近。它愿意为你开口。',
    },
    neutral: {
      id: 'mystery-neutral',
      title: '🌠 尚未说完的故事',
      type: 'neutral',
      description: '神秘奶龙轻轻合上了那本书。"还有一些故事……下次再告诉你。"\n\n它望着远方，眼里有星光，也有一丝不确定。你们之间有一些连接——但还不够深，不够让它完全信任。',
      emoji: '🌠',
      message: '它在观察。你们的故事还在酝酿中。',
    },
    bad: {
      id: 'mystery-bad',
      title: '🔒 无法解锁',
      type: 'neutral',
      description: '神秘奶龙把书收了起来。它的表情很平静，但你看到了——它眼里的光暗了一瞬。\n\n"不是每个人都需要了解彼此的全部。我们也许……只是过客。"\n\n它转身离开。那本书，你永远不知道里面写了什么。',
      emoji: '🔒',
      message: '0% 匹配——它的世界对你关上了门。',
    },
  },
}

// ==========================================
// 结局选择逻辑
// ==========================================

function selectEnding(characterId, matchScore) {
  const charEndings = ENDINGS[characterId]
  if (!charEndings) {
    const first = Object.values(ENDINGS)[0]
    return first.neutral
  }

  if (matchScore >= 66) return charEndings.perfect
  if (matchScore <= 52) return charEndings.bad
  if (matchScore >= 61) return charEndings.good
  if (matchScore >= 31) return charEndings.neutral
  return charEndings.bad
}

// ==========================================
// 主入口
// ==========================================

/**
 * @param {string} characterId
 * @param {{ [dimId: string]: number }} dimensionScores — 6 维度累计分
 * @returns {{ ending, matchScore, personalityType, topDimension, dimensions, evaluation }}
 */
export function calculateResult(characterId, dimensionScores) {
  const matchScore = calculateMatchScore(dimensionScores, characterId)
  const ending = selectEnding(characterId, matchScore)
  const personality = derivePersonality(dimensionScores)
  const evaluation = getEvaluation(characterId, personality.topDimension?.id)

  return {
    ending,
    matchScore,
    personalityType: personality.personalityType,
    topDimension: personality.topDimension,
    dimensions: personality.dimensions,
    evaluation,
  }
}

export default ENDINGS
