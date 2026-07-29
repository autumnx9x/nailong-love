import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CharacterImage from './CharacterImage'
import questions from '../data/questions'

/**
 * StoryPage — 恋爱互动剧情页面
 *
 * 视觉层级（从上到下）：
 *   1. 进度条（轻量）
 *   2. 场景标题（视觉中心）
 *   3. 氛围文字（引人入景）
 *   4. 对话气泡 + 角色名 + 角色小图
 *   5. 回答选项按钮
 *
 * 逻辑层完全不动 —— 只优化布局和样式。
 */

const LABELS = ['A', 'B', 'C', 'D']

// ---- 场景氛围文字（纯展示，不改数据文件） ----
const ATMOSPHERE = {
  scene1: '今天，是你们第一次相遇的日子。微风刚好，阳光也刚好。',
  scene2: '第一次约会。心跳声大到——你怀疑 TA 也能听见。',
  scene3: 'TA 今天不太对劲。你能感觉到，有什么压在 TA 的心上。',
  scene4: '小小的摩擦发生了。恋爱不总是一帆风顺，不是吗？',
  scene5: '一个特别的日子。不用很大——但属于你们两个。',
  scene6: '误会像一层薄雾，笼罩在你们之间。需要有人先开口。',
  scene7: '有些话，藏了很久。是时候了——你感觉到空气中的重量。',
  scene8: '站在分岔路口。往左，还是往右？你们的未来从这里开始分叉。',
}

// ---- 场景副标题 ----
const SUBTITLES = {
  scene1: '命运的交汇点',
  scene2: '第一次心动，悄悄发生',
  scene3: '陪伴是最温暖的安慰',
  scene4: '磨合让彼此更靠近',
  scene5: '属于你们的小小仪式感',
  scene6: '信任是最勇敢的决定',
  scene7: '心意交汇的瞬间',
  scene8: '通往未来的第一个选择',
}

// ---- 场景装饰 emoji ----
const SCENE_EMOJI = {
  scene1: '💫',
  scene2: '💕',
  scene3: '🌧️',
  scene4: '🫧',
  scene5: '🎀',
  scene6: '🕊️',
  scene7: '💌',
  scene8: '🌅',
}

export default function StoryPage({
  character,
  scene,
  storyData,
  sceneIndex,
  totalScenes,
  onChoice,
}) {
  // ==========================================
  // 逻辑层（完全不动）
  // ==========================================
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const progress = ((sceneIndex + 1) / totalScenes) * 100
  const questionData = questions[scene.id]

  const handleChoice = (option, index) => {
    if (isTransitioning) return
    setSelectedIndex(index)
    setIsTransitioning(true)
    setTimeout(() => {
      onChoice(option.effects || {})
      setSelectedIndex(null)
      setIsTransitioning(false)
    }, 400)
  }

  if (!storyData || !questionData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-light text-sm">
        剧情加载中...
      </div>
    )
  }

  const atmosphere = ATMOSPHERE[scene.id] || ''
  const subtitle = SUBTITLES[scene.id] || scene.description
  const sceneEmoji = SCENE_EMOJI[scene.id] || '💫'

  // ==========================================
  // 展示层
  // ==========================================
  return (
    <motion.div
      className="flex flex-col min-h-screen px-4 py-6 max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ===== 1. 进度条 ===== */}
      <motion.div
        className="w-full mb-8"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: character.color }}
          >
            {sceneIndex + 1}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-white/40 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: character.color }}
              initial={{ width: `${(sceneIndex / totalScenes) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] text-text-light/30">{totalScenes}</span>
        </div>
      </motion.div>

      {/* ===== 2. 场景标题卡片（视觉重心） ===== */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
      >
        {/* 卡片背景 */}
        <div
          className="absolute inset-0 rounded-3xl opacity-[0.06]"
          style={{ backgroundColor: character.color }}
        />

        <div className="relative text-center px-4 py-6">
          {/* 装饰 emoji */}
          <motion.span
            className="inline-block text-3xl mb-3 select-none"
            animate={{ y: [-2, 2, -2], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {sceneEmoji}
          </motion.span>

          {/* 章节标签 */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-text-light/30 mb-3">
            chapter {sceneIndex + 1} of {totalScenes}
          </p>

          {/* 场景标题 — 最大字号，视觉焦点 */}
          <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold text-text-primary mb-3 leading-[1.15] tracking-tight">
            {scene.title}
          </h2>

          {/* 副标题 — 角色主题色 */}
          <p
            className="text-base md:text-lg font-semibold"
            style={{ color: character.color }}
          >
            {subtitle}
          </p>

          {/* 装饰分割线 */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-6 h-px rounded-full" style={{ backgroundColor: character.color, opacity: 0.3 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: character.color, opacity: 0.5 }} />
            <div className="w-6 h-px rounded-full" style={{ backgroundColor: character.color, opacity: 0.3 }} />
          </div>
        </div>
      </motion.div>

      {/* ===== 3. 氛围文字 ===== */}
      <motion.p
        className="text-center text-[13px] text-text-light/50 leading-relaxed mb-8 max-w-[85%] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {atmosphere}
      </motion.p>

      {/* ===== 4. 对话气泡 ===== */}
      <motion.div
        key={`dialogue-${scene.id}`}
        className="relative w-full mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* 对话气泡本体 */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg">
          {/* 上尖角 */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 rotate-45"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />

          <AnimatePresence mode="wait">
            <motion.p
              key={scene.id}
              className="text-[15px] md:text-base text-text-primary leading-relaxed text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {storyData.dialogue}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ===== 左下角奶龙装饰 ===== */}
      <motion.div
        className="fixed bottom-20 left-4 z-10 pointer-events-none select-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CharacterImage character={character} emotion="idle" size={70} />
      </motion.div>

      {/* ===== 5. 回答选项 ===== */}
      <motion.div
        className="w-full space-y-3 mt-auto pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <p className="text-[10px] text-text-light/30 text-center mb-2 tracking-widest uppercase">
          选择你的回应
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={`choices-${scene.id}`}
            className="space-y-2.5"
          >
            {questionData.options.map((option, i) => {
              const isSelected = selectedIndex === i

              return (
                <motion.button
                  key={`${scene.id}-opt-${i}`}
                  onClick={() => handleChoice(option, i)}
                  disabled={isTransitioning}
                  className={`w-full px-5 py-4 rounded-2xl text-left text-sm font-medium
                    transition-all cursor-pointer flex items-center gap-3
                    ${isSelected
                      ? 'bg-accent text-white shadow-lg shadow-accent/25 scale-[0.97]'
                      : 'bg-white/55 hover:bg-white/80 text-text-primary shadow-sm hover:shadow-md'
                    }
                    ${isTransitioning && !isSelected ? 'opacity-25' : 'opacity-100'}
                  `}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.35 }}
                  whileHover={!isTransitioning ? { scale: 1.02, x: 3 } : {}}
                  whileTap={!isTransitioning ? { scale: 0.97 } : {}}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: isSelected
                        ? 'rgba(255,255,255,0.3)'
                        : character.color,
                    }}
                  >
                    {LABELS[i]}
                  </span>
                  <span className="flex-1 leading-snug">{option.text}</span>
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
