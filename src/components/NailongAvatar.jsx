/**
 * NailongAvatar — 奶龙角色 SVG 组件
 *
 * 统一世界观下的可爱奶龙形象。
 *
 * Props:
 * - bodyColor:   身体主色
 * - bellyColor:  肚皮颜色
 * - accentColor: 角 / 装饰色
 * - cheekColor:  腮红色
 * - eyeColor:    眼睛颜色
 * - expression:  'mystery' | 'tsundere' | 'excited' | 'warm' | 'happy' | 'shy' | 'default'
 * - pose:        'hand-on-heart' | 'arms-crossed' | 'waving' | 'holding-flower' | 'reaching-out' | 'standing'
 * - showHearts:  是否显示漂浮爱心装饰
 * - showStars:   是否显示漂浮星星装饰
 * - showStardust: 是否显示星尘粒子（神秘奶龙专属）
 * - size:        尺寸（px）
 */

/* ===== 高光偏移常量 ===== */
const SHINE_BIG = { cx: 4, cy: -3, r: 5 }
const SHINE_SMALL = { cx: -3, cy: 3, r: 2.5 }
const STAR_SHINE = { cx: -7, cy: -7, r: 3.5 }

/* ===== 表情 — 嘴巴路径 ===== */
const MOUTHS = {
  default: 'M 88 115 Q 100 122 112 115',
  happy: 'M 85 112 Q 100 130 115 112',
  shy: 'M 92 116 Q 100 112 108 116',
  warm: 'M 87 114 Q 100 125 113 114',
  excited: 'M 86 110 Q 100 120 114 110', // 上弯弧 — 下面用椭圆填充做张嘴笑
  tsundere: 'M 91 116 Q 95 113 100 118 Q 105 113 109 116', // 傲娇嘟嘴 — 小波浪形
  mystery: 'M 90 116 Q 100 120 110 116', // 神秘浅笑 — 几乎看不出，安静从容
}

/* ===== 表情 — 眼部微调 ===== */
const EYE_MODS = {
  default: { bottomFlat: false, extraSparkle: false },
  happy: { bottomFlat: false, extraSparkle: false },
  shy: { bottomFlat: false, extraSparkle: false },
  warm: { bottomFlat: true, extraSparkle: false },
  excited: { bottomFlat: false, extraSparkle: true }, // 星星高光
  tsundere: { bottomFlat: false, extraSparkle: false, lookAway: true, eyebrows: true, puffedCheeks: true },
  mystery: { bottomFlat: false, extraSparkle: false, halfLidded: true, gazeSoft: true },
}

/* ==========================================
   小花束
   ========================================== */
function FlowerBouquet({ scale = 1 }) {
  return (
    <g transform={`translate(18, 130) scale(${scale})`}>
      <path
        d="M 0 0 Q -14 18 -10 32 Q 0 38 10 32 Q 14 18 0 0"
        fill="#FFF8F0" stroke="#F0DCC8" strokeWidth="0.6"
      />
      <path d="M -8 28 L -6 12 M 8 28 L 6 12" stroke="#E8D0B8" strokeWidth="0.5" />
      <ellipse cx="-3" cy="26" rx="4" ry="2.5" fill="#FFB7B7" />
      <ellipse cx="3" cy="26" rx="4" ry="2.5" fill="#FFB7B7" />
      <circle cx="0" cy="26" r="2" fill="#FF8C8C" />
      <g transform="translate(-6, 6)">
        {[0,60,120,180,240,300].map(d => (
          <ellipse key={d} cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD6E7" transform={`rotate(${d})`} />
        ))}
        <circle cx="0" cy="0" r="2.5" fill="#FFE8A0" />
      </g>
      <g transform="translate(5, 2)">
        {[0,72,144,216,288].map(d => (
          <ellipse key={d} cx="0" cy="-3" rx="2" ry="3.5" fill="white" transform={`rotate(${d})`} />
        ))}
        <circle cx="0" cy="0" r="2" fill="#FFE8A0" />
      </g>
      <g transform="translate(0, -4)">
        {[0,60,120,180,240,300].map(d => (
          <ellipse key={d} cx="0" cy="-3" rx="2.2" ry="3.5" fill="#FFF4C8" transform={`rotate(${d})`} />
        ))}
        <circle cx="0" cy="0" r="2.2" fill="#FFB347" />
      </g>
      <ellipse cx="-10" cy="14" rx="5" ry="2.5" fill="#C8E8C0" transform="rotate(-25,-10,14)" />
      <ellipse cx="10" cy="14" rx="5" ry="2.5" fill="#C8E8C0" transform="rotate(25,10,14)" />
      <ellipse cx="-5" cy="18" rx="4" ry="2" fill="#B8DDB0" transform="rotate(-15,-5,18)" />
      <ellipse cx="7" cy="18" rx="4" ry="2" fill="#B8DDB0" transform="rotate(15,7,18)" />
    </g>
  )
}

/* ==========================================
   小地图
   ========================================== */
function AdventureMap({ scale = 1 }) {
  return (
    <g transform={`translate(14, 136) scale(${scale})`}>
      {/* 地图纸 */}
      <rect x="-14" y="-10" width="28" height="22" rx="2" fill="#FFF8E8" stroke="#D4C4A8" strokeWidth="0.8" />
      {/* 折痕 */}
      <line x1="0" y1="-10" x2="0" y2="12" stroke="#E8D8C0" strokeWidth="0.6" />
      {/* 虚线路线 */}
      <path d="M -8 -4 Q -4 -2 0 -6 Q 4 -10 8 -2" fill="none" stroke="#FFB347" strokeWidth="1" strokeDasharray="2,1.5" />
      {/* X 标记终点 */}
      <g transform="translate(8, -2)">
        <line x1="-3" y1="-3" x2="3" y2="3" stroke="#FF6B6B" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="-3" y2="3" stroke="#FF6B6B" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* 小树图标 */}
      <g transform="translate(-10, -6)">
        <circle cx="0" cy="-3" r="2.5" fill="#C8E8B0" />
        <rect x="-0.8" y="-1" width="1.6" height="3" rx="0.5" fill="#D4A574" />
      </g>
      {/* 卷边 */}
      <path d="M 14 -8 Q 18 -8 18 -4" stroke="#D4C4A8" strokeWidth="0.6" fill="none" />
      <path d="M 14 10 Q 18 10 18 6" stroke="#D4C4A8" strokeWidth="0.6" fill="none" />
    </g>
  )
}

/* ==========================================
   小背包
   ========================================== */
function Backpack({ color = '#FFB347' }) {
  return (
    <g transform="translate(100, 132)">
      {/* 背包主体 */}
      <rect x="-24" y="-8" width="48" height="38" rx="8" fill={color} opacity="0.7" />
      {/* 背包口袋 */}
      <rect x="-16" y="2" width="32" height="16" rx="5" fill={color} opacity="0.5" />
      <rect x="-4" y="6" width="8" height="6" rx="2" fill={color} opacity="0.35" />
      {/* 背带 */}
      <path d="M -20 -8 Q -26 -18 -18 -26" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.55" fill="none" />
      <path d="M 20 -8 Q 26 -18 18 -26" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.55" fill="none" />
      {/* 顶扣 */}
      <circle cx="0" cy="-8" r="3" fill={color} opacity="0.6" />
    </g>
  )
}

/* ==========================================
   漂浮爱心
   ========================================== */
function FloatingHearts() {
  const hearts = [
    { x: 148, y: 30, s: 0.7, d: 0 },
    { x: 160, y: 55, s: 0.5, d: 0.5 },
    { x: 155, y: 78, s: 0.6, d: 1.0 },
    { x: 42, y: 40, s: 0.45, d: 0.3 },
    { x: 32, y: 22, s: 0.55, d: 0.8 },
  ]
  return (
    <g>
      {hearts.map((h, i) => (
        <g key={i} transform={`translate(${h.x}, ${h.y}) scale(${h.s})`}>
          <path
            d="M 0 5 C -6 -2 -12 2 -8 9 C -4 16 0 20 0 20 C 0 20 4 16 8 9 C 12 2 6 -2 0 5 Z"
            fill="#FFB7B7" opacity="0.5"
          >
            <animateTransform
              attributeName="transform" type="translate"
              values={`0,0; ${i % 2 === 0 ? 3 : -3},${-(3 + i)}; 0,0`}
              dur={`${3 + i * 0.8}s`} repeatCount="indefinite"
            />
          </path>
        </g>
      ))}
    </g>
  )
}

/* ==========================================
   漂浮星星
   ========================================== */
function FloatingStars() {
  const stars = [
    { x: 152, y: 28, s: 0.8, d: 0 },
    { x: 165, y: 52, s: 0.55, d: 0.4 },
    { x: 158, y: 75, s: 0.65, d: 0.9 },
    { x: 40, y: 35, s: 0.5, d: 0.2 },
    { x: 28, y: 18, s: 0.6, d: 0.7 },
    { x: 172, y: 40, s: 0.45, d: 1.2 },
  ]
  return (
    <g>
      {stars.map((s, i) => (
        <g key={i} transform={`translate(${s.x}, ${s.y}) scale(${s.s})`}>
          <path
            d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
            fill="#FFD4A0" opacity="0.55"
          >
            <animateTransform
              attributeName="transform" type="translate"
              values={`0,0; ${i % 2 === 0 ? 2.5 : -2.5},${-(2.5 + i * 0.6)}; 0,0`}
              dur={`${2.5 + i * 0.7}s`} repeatCount="indefinite"
            />
          </path>
        </g>
      ))}
    </g>
  )
}

/* ==========================================
   星尘粒子 — 神秘奶龙专属
   微小、缓慢、安静的光点
   ========================================== */
function Stardust() {
  const dust = [
    { x: 50, y: 145, r: 1.2, d: 0 },
    { x: 148, y: 150, r: 1.0, d: 0.6 },
    { x: 30, y: 75, r: 0.8, d: 1.1 },
    { x: 170, y: 80, r: 1.1, d: 0.3 },
    { x: 95, y: 35, r: 0.9, d: 1.5 },
    { x: 140, y: 25, r: 0.7, d: 0.9 },
    { x: 55, y: 55, r: 0.85, d: 1.8 },
    { x: 175, y: 120, r: 0.75, d: 2.0 },
  ]
  return (
    <g>
      {dust.map((d, i) => (
        <g key={i} transform={`translate(${d.x}, ${d.y})`}>
          {/* 星尘十字光 */}
          <circle cx="0" cy="0" r={d.r} fill="#E8DCF8" opacity="0.35">
            <animateTransform
              attributeName="transform" type="translate"
              values={`0,0; ${i % 3 === 0 ? -2 : i % 3 === 1 ? 2 : 0},${-(1.5 + i * 0.35)}; 0,0`}
              dur={`${4 + i * 0.6}s`} repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.15;0.45;0.15" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </g>
  )
}

/* ==========================================
   主组件
   ========================================== */
export default function NailongAvatar({
  bodyColor = '#FFF4D6',
  bellyColor = '#FFFFFF',
  accentColor = '#FFB347',
  cheekColor = '#FFD6E7',
  eyeColor = '#3D2B1F',
  expression = 'default',
  pose = 'standing',
  showHearts = false,
  showStars = false,
  showStardust = false,
  size = 200,
}) {
  const mouthPath = MOUTHS[expression] || MOUTHS.default
  const eyeMod = EYE_MODS[expression] || EYE_MODS.default

  const leftEyeX = 68
  const rightEyeX = 132
  const eyeY = 85
  const eyeR = 15

  const isExcited = expression === 'excited'
  const isTsundere = expression === 'tsundere'
  const isMystery = expression === 'mystery'

  // 傲娇瞥眼：瞳孔向右偏移
  const pupilShiftX = eyeMod.lookAway ? 5 : 0
  const pupilShiftY = eyeMod.lookAway ? -1 : 0

  // 神秘奶龙：眼睛微微向下凝视
  const gazeDownY = eyeMod.gazeSoft ? 2 : 0

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFEF5" />
          <stop offset="50%" stopColor={bodyColor} />
          <stop offset="100%" stopColor="#F0DFBC" />
        </radialGradient>
        <radialGradient id="headGrad" cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="white" />
          <stop offset="50%" stopColor={bodyColor} />
          <stop offset="100%" stopColor="#F0DFBC" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#FEF9EE" />
        </radialGradient>
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(180,160,130,0.25)" />
          <stop offset="100%" stopColor="rgba(180,160,130,0)" />
        </radialGradient>
        <radialGradient id="shineGrad" cx="50%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* ========== 装饰粒子 ========== */}
      {showHearts && <FloatingHearts />}
      {showStars && <FloatingStars />}
      {showStardust && <Stardust />}

      {/* ========== 地面阴影 ========== */}
      <ellipse cx="100" cy="238" rx="68" ry="8" fill="url(#shadowGrad)" />

      {/* ========== 尾巴 ========== */}
      <path
        d="M 148 178 Q 180 190 184 172 Q 188 152 170 145 Q 156 140 148 160"
        fill="url(#bodyGrad)" stroke="#F0DFBC" strokeWidth="0.5"
      />
      <path d="M 164 160 Q 176 152 180 164" fill={accentColor} opacity="0.3" />

      {/* ========== 背包（身体后面） ========== */}
      {pose === 'waving' && <Backpack color={accentColor} />}

      {/* ========== 后脚 ========== */}
      <ellipse cx="70" cy="224" rx="23" ry="11" fill="url(#bodyGrad)" />
      <ellipse cx="130" cy="224" rx="23" ry="11" fill="url(#bodyGrad)" />
      <ellipse cx="70" cy="227" rx="14" ry="6" fill={accentColor} opacity="0.18" />
      <ellipse cx="130" cy="227" rx="14" ry="6" fill={accentColor} opacity="0.18" />

      {/* ========== 身体 ========== */}
      <ellipse cx="100" cy="170" rx="70" ry="60" fill="url(#bodyGrad)" />

      {/* ========== 肚皮 ========== */}
      <ellipse cx="100" cy="176" rx="46" ry="40" fill="url(#bellyGrad)" />

      {/* ========== 手臂 ========== */}
      {pose === 'arms-crossed' ? (
        // 双手抱胸 — 在身体前方交叉
        <g>
          <ellipse cx="70" cy="168" rx="40" ry="14" fill="url(#bodyGrad)" transform="rotate(8,70,168)" />
          <ellipse cx="130" cy="164" rx="40" ry="14" fill="url(#bodyGrad)" transform="rotate(-8,130,164)" />
          <ellipse cx="118" cy="158" rx="8" ry="5" fill={accentColor} opacity="0.15" />
          <ellipse cx="82" cy="170" rx="8" ry="5" fill={accentColor} opacity="0.15" />
        </g>
      ) : pose === 'hand-on-heart' ? (
        // 手贴心口 — 左手自然垂放，右手轻贴心口
        <g>
          {/* 左手 — 自然垂放 */}
          <ellipse cx="38" cy="172" rx="16" ry="22" fill="url(#bodyGrad)" transform="rotate(-15,38,172)" />
          <ellipse cx="38" cy="182" rx="8" ry="5" fill={accentColor} opacity="0.18" />
          {/* 右手 — 轻贴心口 */}
          <ellipse cx="140" cy="158" rx="14" ry="18" fill="url(#bodyGrad)" transform="rotate(25,140,158)" />
          {/* 手掌贴在胸口 */}
          <ellipse cx="128" cy="148" rx="9" ry="7" fill="url(#bodyGrad)" transform="rotate(10,128,148)" />
          <ellipse cx="128" cy="148" rx="5" ry="3.5" fill={accentColor} opacity="0.15" />
        </g>
      ) : (
        <>
          {/* ========== 左手 ========== */}
          {pose === 'holding-flower' ? (
            <g>
              <ellipse cx="32" cy="160" rx="14" ry="20" fill="url(#bodyGrad)" transform="rotate(-30,32,160)" />
              <FlowerBouquet scale={1} />
            </g>
          ) : pose === 'reaching-out' ? (
            <g>
              <ellipse cx="36" cy="155" rx="15" ry="22" fill="url(#bodyGrad)" transform="rotate(-35,36,155)" />
              <ellipse cx="22" cy="138" rx="9" ry="8" fill="url(#bodyGrad)" />
              <ellipse cx="22" cy="138" rx="5" ry="4" fill={accentColor} opacity="0.15" />
            </g>
          ) : pose === 'waving' ? (
            <g>
              <ellipse cx="36" cy="162" rx="14" ry="19" fill="url(#bodyGrad)" transform="rotate(-22,36,162)" />
              <AdventureMap scale={1} />
            </g>
          ) : (
            <g>
              <ellipse cx="38" cy="172" rx="16" ry="22" fill="url(#bodyGrad)" transform="rotate(-15,38,172)" />
              <ellipse cx="38" cy="182" rx="8" ry="5" fill={accentColor} opacity="0.18" />
            </g>
          )}

          {/* ========== 右手 ========== */}
          {pose === 'reaching-out' ? (
            <g>
              <ellipse cx="164" cy="148" rx="15" ry="24" fill="url(#bodyGrad)" transform="rotate(40,164,148)" />
              <ellipse cx="180" cy="130" rx="9" ry="8" fill="url(#bodyGrad)" />
              <ellipse cx="180" cy="130" rx="5" ry="4" fill={accentColor} opacity="0.15" />
            </g>
          ) : pose === 'waving' ? (
            <g>
              <ellipse cx="168" cy="142" rx="13" ry="26" fill="url(#bodyGrad)" transform="rotate(50,168,142)" />
              <ellipse cx="184" cy="110" rx="10" ry="8" fill="url(#bodyGrad)" transform="rotate(15,184,110)" />
              <ellipse cx="184" cy="110" rx="5" ry="3.5" fill={accentColor} opacity="0.15" />
            </g>
          ) : (
            <g>
              <ellipse cx="162" cy="172" rx="16" ry="22" fill="url(#bodyGrad)" transform="rotate(15,162,172)" />
              <ellipse cx="162" cy="182" rx="8" ry="5" fill={accentColor} opacity="0.18" />
            </g>
          )}
        </>
      )}

      {/* ========== 头部 ========== */}
      <circle cx="100" cy="85" r="58" fill="url(#headGrad)" />

      {/* ========== 小角 ========== */}
      <path d="M 62 35 Q 55 10 68 8 Q 76 6 74 23" fill={accentColor} opacity="0.55" />
      <path d="M 138 35 Q 145 10 132 8 Q 124 6 126 23" fill={accentColor} opacity="0.55" />

      {/* ========== 耳朵 ========== */}
      <ellipse cx="48" cy="52" rx="14" ry="10" fill="url(#bodyGrad)" transform="rotate(-20,48,52)" />
      <ellipse cx="48" cy="52" rx="8" ry="5" fill={accentColor} opacity="0.22" transform="rotate(-20,48,52)" />
      <ellipse cx="152" cy="52" rx="14" ry="10" fill="url(#bodyGrad)" transform="rotate(20,152,52)" />
      <ellipse cx="152" cy="52" rx="8" ry="5" fill={accentColor} opacity="0.22" transform="rotate(20,152,52)" />

      {/* ========== 腮红 ========== */}
      <ellipse
        cx="56" cy="102"
        rx={eyeMod.puffedCheeks ? 17 : 15}
        ry={eyeMod.puffedCheeks ? 11 : 9}
        fill={cheekColor}
        opacity={eyeMod.puffedCheeks ? 0.6 : 0.5}
      />
      <ellipse
        cx="144" cy="102"
        rx={eyeMod.puffedCheeks ? 17 : 15}
        ry={eyeMod.puffedCheeks ? 11 : 9}
        fill={cheekColor}
        opacity={eyeMod.puffedCheeks ? 0.6 : 0.5}
      />

      {/* ========== 左眼 ========== */}
      {/* 傲娇眉毛 */}
      {eyeMod.eyebrows && (
        <path
          d={`M ${leftEyeX - eyeR - 2} ${eyeY - eyeR - 2} Q ${leftEyeX} ${eyeY - eyeR - 7} ${leftEyeX + eyeR} ${eyeY - eyeR - 1}`}
          stroke={eyeColor} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55"
        />
      )}
      <circle cx={leftEyeX} cy={eyeY + gazeDownY} r={eyeR} fill={eyeColor} />
      {eyeMod.halfLidded && (
        // 半闭眼睑 — 静谧沉思感
        <path
          d={`M ${leftEyeX - eyeR - 2} ${eyeY + gazeDownY - 1}
              Q ${leftEyeX - eyeR / 2} ${eyeY + gazeDownY - eyeR + 3} ${leftEyeX} ${eyeY + gazeDownY - eyeR + 5}
              Q ${leftEyeX + eyeR / 2} ${eyeY + gazeDownY - eyeR + 3} ${leftEyeX + eyeR + 2} ${eyeY + gazeDownY - 1}
              L ${leftEyeX + eyeR + 2} ${eyeY + gazeDownY - eyeR - 4}
              Q ${leftEyeX} ${eyeY + gazeDownY - eyeR - 8} ${leftEyeX - eyeR - 2} ${eyeY + gazeDownY - eyeR - 4} Z`}
          fill={bodyColor} opacity="0.72"
        />
      )}
      {eyeMod.bottomFlat && (
        <path
          d={`M ${leftEyeX - eyeR} ${eyeY + 3} Q ${leftEyeX} ${eyeY + eyeR} ${leftEyeX + eyeR} ${eyeY + 3}`}
          stroke="white" strokeWidth="1" fill="white" opacity="0.12"
        />
      )}
      <circle cx={leftEyeX + SHINE_BIG.cx + pupilShiftX} cy={eyeY + SHINE_BIG.cy + pupilShiftY + gazeDownY} r={SHINE_BIG.r} fill="white" />
      <circle cx={leftEyeX + SHINE_SMALL.cx + pupilShiftX} cy={eyeY + SHINE_SMALL.cy + pupilShiftY + gazeDownY} r={SHINE_SMALL.r} fill="white" />
      {/* 兴奋时的星星高光 */}
      {eyeMod.extraSparkle && (
        <path
          d={`M ${leftEyeX + STAR_SHINE.cx} ${eyeY + STAR_SHINE.cy - STAR_SHINE.r}
             L ${leftEyeX + STAR_SHINE.cx + 1} ${eyeY + STAR_SHINE.cy - 1.5}
             L ${leftEyeX + STAR_SHINE.cx + STAR_SHINE.r} ${eyeY + STAR_SHINE.cy - 1}
             L ${leftEyeX + STAR_SHINE.cx + 1.5} ${eyeY + STAR_SHINE.cy + 1}
             L ${leftEyeX + STAR_SHINE.cx + 2} ${eyeY + STAR_SHINE.cy + STAR_SHINE.r}
             L ${leftEyeX + STAR_SHINE.cx} ${eyeY + STAR_SHINE.cy + 1.5}
             L ${leftEyeX + STAR_SHINE.cx - 2} ${eyeY + STAR_SHINE.cy + STAR_SHINE.r}
             L ${leftEyeX + STAR_SHINE.cx - 1.5} ${eyeY + STAR_SHINE.cy + 1}
             L ${leftEyeX + STAR_SHINE.cx - STAR_SHINE.r} ${eyeY + STAR_SHINE.cy - 1}
             L ${leftEyeX + STAR_SHINE.cx - 1} ${eyeY + STAR_SHINE.cy - 1.5} Z`}
          fill="white" opacity="0.8"
        />
      )}

      {/* ========== 右眼 ========== */}
      {/* 傲娇眉毛 */}
      {eyeMod.eyebrows && (
        <path
          d={`M ${rightEyeX - eyeR - 1} ${eyeY - eyeR - 2} Q ${rightEyeX} ${eyeY - eyeR - 7} ${rightEyeX + eyeR + 2} ${eyeY - eyeR - 1}`}
          stroke={eyeColor} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55"
        />
      )}
      <circle cx={rightEyeX} cy={eyeY + gazeDownY} r={eyeR} fill={eyeColor} />
      {eyeMod.halfLidded && (
        <path
          d={`M ${rightEyeX - eyeR - 2} ${eyeY + gazeDownY - 1}
              Q ${rightEyeX - eyeR / 2} ${eyeY + gazeDownY - eyeR + 3} ${rightEyeX} ${eyeY + gazeDownY - eyeR + 5}
              Q ${rightEyeX + eyeR / 2} ${eyeY + gazeDownY - eyeR + 3} ${rightEyeX + eyeR + 2} ${eyeY + gazeDownY - 1}
              L ${rightEyeX + eyeR + 2} ${eyeY + gazeDownY - eyeR - 4}
              Q ${rightEyeX} ${eyeY + gazeDownY - eyeR - 8} ${rightEyeX - eyeR - 2} ${eyeY + gazeDownY - eyeR - 4} Z`}
          fill={bodyColor} opacity="0.72"
        />
      )}
      {eyeMod.bottomFlat && (
        <path
          d={`M ${rightEyeX - eyeR} ${eyeY + 3} Q ${rightEyeX} ${eyeY + eyeR} ${rightEyeX + eyeR} ${eyeY + 3}`}
          stroke="white" strokeWidth="1" fill="white" opacity="0.12"
        />
      )}
      <circle cx={rightEyeX + SHINE_BIG.cx + pupilShiftX} cy={eyeY + SHINE_BIG.cy + pupilShiftY + gazeDownY} r={SHINE_BIG.r} fill="white" />
      <circle cx={rightEyeX + SHINE_SMALL.cx + pupilShiftX} cy={eyeY + SHINE_SMALL.cy + pupilShiftY + gazeDownY} r={SHINE_SMALL.r} fill="white" />
      {eyeMod.extraSparkle && (
        <path
          d={`M ${rightEyeX + STAR_SHINE.cx} ${eyeY + STAR_SHINE.cy - STAR_SHINE.r}
             L ${rightEyeX + STAR_SHINE.cx + 1} ${eyeY + STAR_SHINE.cy - 1.5}
             L ${rightEyeX + STAR_SHINE.cx + STAR_SHINE.r} ${eyeY + STAR_SHINE.cy - 1}
             L ${rightEyeX + STAR_SHINE.cx + 1.5} ${eyeY + STAR_SHINE.cy + 1}
             L ${rightEyeX + STAR_SHINE.cx + 2} ${eyeY + STAR_SHINE.cy + STAR_SHINE.r}
             L ${rightEyeX + STAR_SHINE.cx} ${eyeY + STAR_SHINE.cy + 1.5}
             L ${rightEyeX + STAR_SHINE.cx - 2} ${eyeY + STAR_SHINE.cy + STAR_SHINE.r}
             L ${rightEyeX + STAR_SHINE.cx - 1.5} ${eyeY + STAR_SHINE.cy + 1}
             L ${rightEyeX + STAR_SHINE.cx - STAR_SHINE.r} ${eyeY + STAR_SHINE.cy - 1}
             L ${rightEyeX + STAR_SHINE.cx - 1} ${eyeY + STAR_SHINE.cy - 1.5} Z`}
          fill="white" opacity="0.8"
        />
      )}

      {/* ========== 嘴巴 ========== */}
      {isExcited ? (
        // 兴奋张嘴笑：上弧 + 张开椭圆
        <g>
          <path
            d={mouthPath}
            stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <ellipse cx="100" cy="120" rx="9" ry="6" fill="#5D3A2E" opacity="0.85" />
          {/* 小舌头 */}
          <ellipse cx="100" cy="123" rx="5" ry="3" fill="#F08C8C" opacity="0.6" />
        </g>
      ) : (
        <path
          d={mouthPath}
          stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      )}

      {expression === 'shy' && (
        <>
          <path d="M 86 118 L 82 122" stroke={eyeColor} strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
          <path d="M 114 118 L 118 122" stroke={eyeColor} strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
        </>
      )}

      {/* ========== 头顶高光 ========== */}
      <ellipse cx="100" cy="52" rx="32" ry="20" fill="url(#shineGrad)" opacity="0.5" />

      {/* ========== 身体高光 ========== */}
      <ellipse cx="80" cy="138" rx="28" ry="22" fill="url(#shineGrad)" opacity="0.28" />
    </svg>
  )
}
