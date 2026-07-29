import { motion } from 'framer-motion'
import heroPng from '../assets/characters/hero.png'

/**
 * StartPage - 游戏首页
 *
 * 视觉：大面积留白、中央奶龙展示、淡入 + 漂浮动画
 */

const floatingStars = [
  { left: '10%', top: '15%', delay: 0 },
  { left: '85%', top: '10%', delay: 0.8 },
  { left: '15%', top: '75%', delay: 1.4 },
  { left: '80%', top: '80%', delay: 2.0 },
  { left: '50%', top: '8%', delay: 0.4 },
]

export default function StartPage({ onStart }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* 背景浮动装饰 */}
      {floatingStars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none select-none opacity-30"
          style={{ left: s.left, top: s.top }}
          animate={{ y: [-5, 5, -5], rotate: [0, 8, 0] }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        >
          {i % 2 === 0 ? '✨' : '💫'}
        </motion.div>
      ))}

      {/* 奶龙展示区 */}
      <motion.div
        className="relative mb-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      >
        {/* 外层光晕 */}
        <div className="absolute -inset-8 rounded-full bg-cream/40 blur-3xl" />
        <div className="absolute -inset-4 rounded-full bg-pink/20 blur-2xl" />

        {/* 首页奶龙展示 — hero.png */}
        <motion.div
          className="relative w-44 h-52 sm:w-56 sm:h-64 md:w-64 md:h-72 flex items-center justify-center"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={heroPng}
            alt="奶龙"
            loading="eager"
            fetchpriority="high"
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>

        {/* 小爱心 */}
        <motion.span
          className="absolute -top-1 -right-2 text-2xl select-none pointer-events-none"
          animate={{ y: [-4, 4, -4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💛
        </motion.span>
      </motion.div>

      {/* 标题 */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-primary mb-3 tracking-wider text-center leading-tight"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
      >
        和奶龙谈一场恋爱
      </motion.h1>

      {/* 游戏介绍 */}
      <motion.p
        className="text-sm md:text-base text-text-light/70 mb-4 text-center max-w-xs leading-relaxed"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
      >
        四只可爱的奶龙，八段心动的情景。
        <br />
        回答恋爱问题，发现你的恋爱人格，
        <br />
        找到与你最契合的那个 TA。
      </motion.p>

      {/* 副标题 */}
      <motion.p
        className="text-base md:text-xl text-text-light mb-12 text-center max-w-sm leading-relaxed"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
      >
        一场只属于你的奶龙恋爱故事。
      </motion.p>

      {/* 开始按钮 */}
      <motion.button
        onClick={onStart}
        className="relative px-12 py-4 text-lg md:text-xl font-semibold text-white rounded-full shadow-lg cursor-pointer select-none overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #C8A882 0%, #B8956E 100%)',
        }}
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.06, boxShadow: '0 10px 35px rgba(200,168,130,0.45)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
      >
        {/* 流光效果 */}
        <motion.div
          className="absolute inset-0 bg-white/20 -skew-x-12"
          animate={{ x: ['-150%', '150%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <span className="relative z-10">开始游戏</span>
      </motion.button>

      {/* 底部提示 */}
      <motion.p
        className="mt-12 pb-8 text-xs text-text-light/40 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        无需注册 · 即刻开始
      </motion.p>
    </motion.div>
  )
}
