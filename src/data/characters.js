/**
 * 奶龙角色数据
 *
 * 四个恋爱对象，统一基础形象（黄色圆润身体、大黑眼睛、幼态比例），
 * 不同人格 + 不同主题色。
 *
 * 字段说明：
 * - id: 唯一标识，对应 assets/characters/ 下的子目录名
 * - name: 角色名称
 * - tagline: 角色代表对白（显示在卡片和详情页）
 * - personality: 性格关键词数组
 * - description: 详细角色介绍
 * - color: 主题色
 * - colorSecondary: 辅助渐变色
 * - emoji: 表情符号占位（未来替换为图片后仍可保留作为 fallback）
 * - avatar: NailongAvatar 组件的 props（bodyColor, accentColor, cheekColor, expression）
 * - images: 图片路径对象（相对于 src/assets/characters/{id}/）
 */

const characters = [
  {
    id: 'warm',
    name: '暖心奶龙',
    tagline: '我会一直陪着你。',
    loveStyle: '温柔陪伴型',
    personality: ['温柔', '细心', '治愈', '可靠'],
    description:
      '暖心奶龙是奶龙小镇上最受欢迎的存在。它总是第一个发现别人不开心，然后悄悄递上一杯热可可，或是一个温暖的拥抱。它的话不多，但每一句都能说到你心里。和它在一起，就像裹着一条刚晒过太阳的毛毯——安心、温暖、不想离开。',
    color: '#C8A882',
    colorSecondary: '#E0D0BC',
    emoji: '💛',
    theme: {
      label: '温柔治愈',
      keywords: ['陪伴', '温暖', '细腻', '守护'],
      summary: '你的温柔，值得被最细腻的心珍藏。',
    },
    avatar: {
      bodyColor: '#F5EDE0',
      accentColor: '#C8A882',
      cheekColor: '#FFD6E7',
      expression: 'warm',
      pose: 'holding-flower',
      showHearts: true,
    },
    images: {
      idle: '',
      happy: '',
      shy: '',
    },
  },
  {
    id: 'adventure',
    name: '冒险奶龙',
    tagline: '准备好和我去看看更大的世界了吗？',
    loveStyle: '自由探索型',
    personality: ['勇敢', '活泼', '好奇', '自由'],
    description:
      '冒险奶龙永远背着一个比它还大的背包，里面装满了地图、指南针和吃不光的零食。它相信每一天都是冒险的开始——哪怕只是在街角发现一家新的蛋糕店。它会拉着你的手跑向未知，一边跑一边喊："快点快点！世界那么大，不跑着看就来不及了！"',
    color: '#9BAEBF',
    colorSecondary: '#CDDAE5',
    emoji: '🧭',
    theme: {
      label: '自由探索',
      keywords: ['冒险', '新鲜', '自由', '活力'],
      summary: '世界很大，但有你在的方向，就是最美的远方。',
    },
    avatar: {
      bodyColor: '#F5EDE0',
      accentColor: '#9BAEBF',
      cheekColor: '#FFD6E7',
      expression: 'excited',
      pose: 'waving',
      showStars: true,
    },
    images: {
      idle: '',
    },
  },
  {
    id: 'tsundere',
    name: '傲娇奶龙',
    tagline: '哼，我才不是特意来找你的。',
    loveStyle: '嘴硬心软型',
    personality: ['嘴硬', '害羞', '可爱', '慢热'],
    description:
      '傲娇奶龙总是背对着你说话，但尾巴会不自觉地晃来晃去。它嘴上说着"随便你""才不在乎"，可每次你遇到麻烦，第一个冲过来的总是它。它脸红的次数大概比说话还多——尤其是在你夸它可爱的时候。攻略它的过程，就是你一点点发现它藏在别扭外表下的温柔。',
    color: '#C49B9B',
    colorSecondary: '#E0CDCD',
    emoji: '😤',
    theme: {
      label: '反差可爱',
      keywords: ['傲娇', '慢热', '真心', '惊喜'],
      summary: '嘴硬的人，把最柔软的心留给了最懂他的人。',
    },
    avatar: {
      bodyColor: '#F5EDE0',
      accentColor: '#C49B9B',
      cheekColor: '#FFC4C4',
      expression: 'tsundere',
      pose: 'arms-crossed',
      showHearts: true,
    },
    images: {
      idle: '',
    },
  },
  {
    id: 'mystery',
    name: '神秘奶龙',
    tagline: '你真的想知道我的秘密吗？',
    loveStyle: '慢热神秘型',
    personality: ['安静', '神秘', '观察', '深情'],
    description:
      '神秘奶龙总是一个人坐在小镇边缘的山丘上，望着远方。没有人知道它从哪里来，也没有人知道它在想什么。但如果你鼓起勇气走近，你会发现它的眼睛里藏着整个星空。它不轻易开口，但一旦你走进它的世界——你会发现，那份被藏起来的深情，比任何人都要炽烈。',
    color: '#B0A0C4',
    colorSecondary: '#D8D0E8',
    emoji: '🌙',
    theme: {
      label: '沉静深情',
      keywords: ['神秘', '观察', '深情', '宿命'],
      summary: '最深情的秘密，是在每一个平行世界里都选择了你。',
    },
    avatar: {
      bodyColor: '#F5EDE0',
      accentColor: '#B0A0C4',
      cheekColor: '#E8DCF8',
      expression: 'mystery',
      pose: 'hand-on-heart',
      showStardust: true,
    },
    images: {
      idle: '',
    },
  },
]

export default characters
