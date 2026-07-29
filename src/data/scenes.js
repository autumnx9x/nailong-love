/**
 * scenes.js — 8 个固定恋爱情景
 *
 * 所有奶龙共享同一套场景结构。
 * StoryPage 按 sceneIndex 顺序读取。
 *
 * 字段：
 * - id:          唯一标识（对应 characterStories / questions 的 key）
 * - title:       场景名称
 * - description: 场景简介（展示在 StoryPage 标题下方）
 */

const scenes = [
  {
    id: 'scene1',
    title: '第一次相遇',
    description: '恋爱故事开始的第一刻',
  },
  {
    id: 'scene2',
    title: '第一次约会',
    description: '心跳加速的初次约会',
  },
  {
    id: 'scene3',
    title: '对方情绪低落',
    description: '当 TA 需要你的安慰',
  },
  {
    id: 'scene4',
    title: '第一次矛盾',
    description: '小摩擦中的彼此磨合',
  },
  {
    id: 'scene5',
    title: '特殊纪念日',
    description: '属于你们的特别日子',
  },
  {
    id: 'scene6',
    title: '面对误会',
    description: '信任与沟通的考验',
  },
  {
    id: 'scene7',
    title: '关系确认',
    description: '心意的交汇与确认',
  },
  {
    id: 'scene8',
    title: '未来选择',
    description: '通往未来的分岔路口',
  },
]

export default scenes
