import { motion } from 'framer-motion'
import CharacterImage from './CharacterImage'

/**
 * EndingPage — 恋爱测试结果页
 *
 * 顶部：匹配度大数字
 * 三段式：
 * 1. 你的恋爱人格 — 人格类型名 + 维度条
 * 2. 你的奶龙 — 角色图片 + 专属评价
 * 3. 最终结局 — 结局标题 + 描述 + 寄语
 */

const typeStyle = {
  good: { badge: '💛 美好结局', badgeBg: 'bg-accent/15 text-accent' },
  special: { badge: '🌟 隐藏结局', badgeBg: 'bg-purple-200/40 text-purple-600' },
  neutral: { badge: '🍃 未完待续', badgeBg: 'bg-text-light/10 text-text-light' },
  bad: { badge: '🌑 隐藏结局', badgeBg: 'bg-purple-200/40 text-purple-600' },
}

function getStyle(ending, matchScore) {
  if (matchScore === 100 || matchScore === 0) return typeStyle.special
  return typeStyle[ending.type] || typeStyle.neutral
}

function matchLabel(score) {
  if (score === 100) return '完美匹配'
  if (score >= 80) return '高度契合'
  if (score >= 60) return '比较合拍'
  if (score >= 40) return '还需磨合'
  if (score === 0) return '完全错频'
  return '差异较大'
}

const sectionVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, delay: 0.3 + i * 0.2, ease: 'easeOut' },
  }),
}

export default function EndingPage({ result, character, onRestart, onHome }) {
  if (!result || !result.ending) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-light text-sm">
        加载结果中...
      </div>
    )
  }

  const { ending, matchScore, personalityType, topDimension, dimensions, evaluation } = result
  const style = getStyle(ending, matchScore)

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-5 py-8 bg-gradient-to-b from-cream/30 via-pink/15 to-bg/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* ===== 顶部：匹配度大数字 ===== */}
      <motion.div
        className="text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.badgeBg}`}>
          {style.badge}
        </span>

        {/* 匹配度环形展示 */}
        <motion.div
          className="relative w-28 h-28 mx-auto my-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.15 }}
        >
          {/* 背景圆环 */}
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f0e8d8" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none"
              stroke={character.color} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: (2 * Math.PI * 42) * (1 - matchScore / 100) }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
          {/* 中间数字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-3xl font-extrabold"
              style={{ color: character.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {matchScore}%
            </motion.span>
          </div>
        </motion.div>

        <p className="text-sm text-text-light font-medium">
          {matchLabel(matchScore)}
        </p>
        <h2 className="text-lg text-text-primary/60 mt-4">
          恋爱测试结果
        </h2>
      </motion.div>

      {/* ========================================== */}
      {/* 第一部分：你的恋爱人格 */}
      {/* ========================================== */}
      <motion.div
        className="w-full max-w-sm bg-white/60 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-md mb-4"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{topDimension?.emoji || '💛'}</span>
          <h3 className="text-sm font-semibold text-text-primary/70 tracking-wide">
            你的恋爱人格
          </h3>
        </div>

        {/* 人格类型名 */}
        <p
          className="text-2xl md:text-3xl font-bold text-center mb-1"
          style={{ color: character.color }}
        >
          {personalityType}
        </p>

        {/* 人格代码 */}
        {dimensions && dimensions.length >= 2 && (
          <p className="text-xs text-text-light/40 text-center mb-4 tracking-widest uppercase">
            {dimensions[0]?.id?.slice(0, 3)}-{dimensions[1]?.id?.slice(0, 3)}
          </p>
        )}

        {/* 最高维度描述 */}
        {topDimension && (
          <p className="text-xs md:text-sm text-text-light text-center mb-5 leading-relaxed">
            {topDimension.description}
          </p>
        )}

        {/* 维度条形图 */}
        {dimensions && dimensions.length > 0 && (
          <div className="space-y-2">
            {dimensions.slice(0, 4).map((dim) => (
              <div key={dim.id} className="flex items-center gap-2">
                <span className="text-xs w-4 text-center">{dim.emoji}</span>
                <span className="text-xs text-text-light w-16 flex-shrink-0">
                  {dim.label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: character.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[10px] text-text-light/60 w-8 text-right">
                  {dim.score}/8
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ========================================== */}
      {/* 第二部分：你的奶龙 */}
      {/* ========================================== */}
      <motion.div
        className="w-full max-w-sm bg-white/60 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-md mb-4"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="flex items-center gap-2 mb-4">
          <CharacterImage
            character={character}
            emotion="idle"
            size={36}
            animate={false}
            variant="plain"
          />
          <h3 className="text-sm font-semibold text-text-primary/70 tracking-wide">
            你的奶龙
          </h3>
        </div>

        {/* 角色图片 — 根据匹配结果展示对应奶龙 PNG */}
        <div className="flex justify-center mb-4">
          <CharacterImage
            character={character}
            emotion="idle"
            size={180}
            animate={true}
            variant="plain"
          />
        </div>

        {/* 奶龙名称 */}
        <p className="text-lg font-bold text-text-primary text-center mb-3">
          {character.name}
        </p>

        {/* 奶龙评价 */}
        <div
          className="relative rounded-2xl p-4 text-center"
          style={{ background: `${character.color}12` }}
        >
          {/* 小对话三角 */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
            style={{ background: `${character.color}12` }}
          />
          <p className="text-sm md:text-base text-text-primary leading-relaxed italic">
            「{evaluation}」
          </p>
        </div>
      </motion.div>

      {/* ========================================== */}
      {/* 第三部分：最终结局 */}
      {/* ========================================== */}
      <motion.div
        className="w-full max-w-sm bg-white/60 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-md mb-8"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📖</span>
          <h3 className="text-sm font-semibold text-text-primary/70 tracking-wide">
            最终结局
          </h3>
        </div>

        <p className="text-lg md:text-xl font-bold text-text-primary text-center mb-4">
          {ending.title}
        </p>

        <p className="text-sm md:text-base text-text-primary leading-relaxed whitespace-pre-line text-center mb-4">
          {ending.description}
        </p>

        <p className="text-xs text-text-light/50 italic text-center mb-3">
          {ending.message}
        </p>

        {/* 角色总结语 */}
        {character.theme?.summary && (
          <div
            className="rounded-2xl px-4 py-3 text-center"
            style={{ background: `${character.color}0D` }}
          >
            <p className="text-xs text-text-light/50 mb-1">
              {character.name} · {character.theme.label}
            </p>
            <p
              className="text-sm font-medium leading-relaxed"
              style={{ color: character.color }}
            >
              {character.theme.summary}
            </p>
          </div>
        )}
      </motion.div>

      {/* ===== 操作按钮 ===== */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <motion.button
          onClick={onRestart}
          className="flex-1 px-8 py-3.5 rounded-full text-white font-semibold shadow-lg cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${character.color}, ${character.colorSecondary || character.color})`,
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 8px 25px ${character.color}66` }}
          whileTap={{ scale: 0.95 }}
        >
          再测一次
        </motion.button>

        <motion.button
          onClick={onHome}
          className="flex-1 px-8 py-3.5 rounded-full font-semibold text-text-primary bg-white/55 backdrop-blur-sm border-2 border-cream shadow-sm cursor-pointer"
          whileHover={{ scale: 1.03, borderColor: character.color }}
          whileTap={{ scale: 0.96 }}
        >
          选择其他奶龙
        </motion.button>
      </motion.div>

      {/* 底部温柔结语 */}
      <motion.p
        className="mt-8 text-xs text-text-light/30 text-center max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        每一段恋爱都是独一无二的。
        <br />
        无论匹配度高低，愿你在真实的世界里，
        <br />
        遇到那个懂你温柔的人 💛
      </motion.p>
    </motion.div>
  )
}
