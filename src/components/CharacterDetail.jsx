import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import CharacterImage from './CharacterImage'

/**
 * CharacterDetail - 角色详情页
 *
 * 大尺寸奶龙图片 + 性格关键词 + 详细介绍 + 代表对白
 * 移动端：右滑返回
 */

export default function CharacterDetail({ character, onConfirm, onBack }) {
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const opacity = useTransform(x, [0, 200], [1, 0.5])
  const scale = useTransform(x, [0, 200], [1, 0.92])

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100 || info.velocity.x > 400) {
      onBack()
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-5 py-8 overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* 可拖拽容器 */}
      <motion.div
        ref={constraintsRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        style={{ x, opacity, scale }}
        onDragEnd={handleDragEnd}
        className="flex flex-col items-center w-full max-w-sm cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {/* 滑动提示 */}
        <motion.p
          className="text-xs text-text-light/30 mb-3 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          ← 右滑可返回选择 →
        </motion.p>

        {/* ===== 角色大图 — 视觉中心 ===== */}
        <motion.div
          className="relative mb-5"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 18,
            delay: 0.1,
          }}
        >
          {/* 角色主题光晕 */}
          <div
            className="absolute -inset-8 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: character.color }}
          />

          <CharacterImage
            character={character}
            emotion="idle"
            size={240}
            animate={true}
            variant="plain"
          />
        </motion.div>

        {/* 角色名称 */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-text-primary mb-3"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {character.name}
        </motion.h2>

        {/* 性格关键词 */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {character.personality.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full text-xs md:text-sm font-medium text-white/90"
              style={{ backgroundColor: character.color }}
            >
              {trait}
            </span>
          ))}
        </motion.div>

        {/* 恋爱预告 */}
        <motion.div
          className="w-full mb-4 text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xs text-text-light/50 mb-1 tracking-wider">恋爱预告</p>
          <p className="text-sm md:text-base text-text-primary leading-relaxed">
            {character.loveStyle === '温柔陪伴型' && '一段被温柔包裹的旅程。TA 会用细腻的关怀，让你每天都感到被爱和安心。'}
            {character.loveStyle === '自由探索型' && '一段充满惊喜的冒险。TA 会拉着你的手跑向未知，每一天都有新的风景。'}
            {character.loveStyle === '嘴硬心软型' && '一段慢热的攻防战。TA 嘴上说着不在意，行动却处处都是喜欢你的证据。'}
            {character.loveStyle === '慢热神秘型' && '一段安静又深刻的故事。TA 不轻易开口，但一旦走进 TA 的世界，你会发现独一无二的深情。'}
          </p>
        </motion.div>

        {/* 角色详细介绍 */}
        <motion.div
          className="bg-white/55 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-md mb-6 w-full"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <p className="text-sm md:text-base text-text-primary leading-relaxed">
            {character.description}
          </p>
        </motion.div>

        {/* 代表对白 */}
        <motion.p
          className="text-lg md:text-xl text-text-light italic mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          「{character.tagline}」
        </motion.p>
      </motion.div>

      {/* 底部按钮组 */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        <motion.button
          onClick={() => onConfirm(character)}
          className="flex-1 px-8 py-3.5 rounded-full text-white font-semibold text-base md:text-lg shadow-lg cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${character.color}, ${character.colorSecondary || character.color})`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 10px 30px ${character.color}66`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          确定选择 TA
        </motion.button>

        <motion.button
          onClick={onBack}
          className="px-8 py-3.5 rounded-full font-medium text-sm md:text-base text-text-primary bg-white/55 backdrop-blur-sm border-2 border-cream shadow-sm cursor-pointer"
          whileHover={{ scale: 1.03, borderColor: character.color }}
          whileTap={{ scale: 0.96 }}
        >
          返回选择
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
