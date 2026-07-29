import { motion } from 'framer-motion'
import characters from '../data/characters'
import CharacterImage from './CharacterImage'

/**
 * CharacterSelect — 选择你的恋爱对象
 *
 * 2×2 田字格。每张卡片是一个等待被选择的奶龙。
 * 视觉重点：奶龙形象 > 姓名 > 性格标签 > 心动对白
 */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { y: 30, opacity: 0, scale: 0.96 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export default function CharacterSelect({ onSelect }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-3 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 页面标题 */}
      <motion.div
        className="text-center mb-6 md:mb-8"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          选择你的奶龙
        </h2>
        <p className="text-sm md:text-base text-text-light">
          每一只奶龙，都有属于自己的温柔
        </p>
      </motion.div>

      {/* 2×2 田字格 */}
      <motion.div
        className="grid grid-cols-2 gap-3 md:gap-5 w-full max-w-md md:max-w-lg"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {characters.map((char) => (
          <motion.div
            key={char.id}
            variants={item}
            whileHover={{ y: -6, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(char)}
            className="relative flex flex-col items-center bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl pt-5 pb-4 px-3 shadow-sm hover:shadow-lg cursor-pointer select-none border-2 border-transparent hover:border-cream transition-all duration-300 overflow-hidden group"
          >
            {/* 顶部主题色装饰条 */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full transition-all duration-300 group-hover:w-16"
              style={{ backgroundColor: char.color }}
            />

            {/* 悬浮时出现微爱心 */}
            <motion.span
              className="absolute top-3 right-3 text-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 select-none pointer-events-none"
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♡
            </motion.span>

            {/* ===== 奶龙形象 — 视觉主体 ===== */}
            <div className="relative w-full flex justify-center mb-2 mt-1">
              <CharacterImage
                character={char}
                emotion="idle"
                size={110}
                priority
              />
            </div>

            {/* 角色名称 + 心动标签 */}
            <div className="text-center mb-1.5">
              <h3 className="text-base md:text-lg font-bold text-text-primary">
                {char.name}
              </h3>
              <span
                className="inline-block text-[10px] md:text-xs px-2.5 py-0.5 rounded-full text-white/85 mt-1"
                style={{ backgroundColor: char.color }}
              >
                {char.loveStyle}
              </span>
            </div>

            {/* 心动对白 */}
            <p className="text-[12px] md:text-sm text-text-light/70 text-center leading-relaxed italic px-1">
              「{char.tagline}」
            </p>

            {/* 选择暗示 */}
            <motion.div
              className="mt-3 flex items-center gap-1 text-[10px] tracking-wider opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{ color: char.color }}
            >
              <span>点击遇见 TA</span>
              <span>→</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
