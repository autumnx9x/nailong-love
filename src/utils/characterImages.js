/**
 * 角色图片加载工具
 *
 * 直接静态 import 所有 PNG，不用 glob，确保 100% 可靠。
 */

import warmIdle from '../assets/characters/warm/idle.png'
import adventureIdle from '../assets/characters/adventure/idle.png'
import tsundereIdle from '../assets/characters/tsundere/idle.png'
import mysteryIdle from '../assets/characters/mystery/idle.png'

const IMAGE_MAP = {
  warm: { idle: warmIdle },
  adventure: { idle: adventureIdle },
  tsundere: { idle: tsundereIdle },
  mystery: { idle: mysteryIdle },
}

/**
 * @param {string} charId
 * @param {string} emotion
 * @returns {string | null}
 */
export function getCharacterImage(charId, emotion = 'idle') {
  const char = IMAGE_MAP[charId]
  if (!char) return null
  if (char[emotion]) return char[emotion]
  if (emotion !== 'idle' && char.idle) return char.idle
  return null
}

export default getCharacterImage
