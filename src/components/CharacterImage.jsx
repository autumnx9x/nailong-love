import { useState, useEffect } from 'react'
import NailongAvatar from './NailongAvatar'
import { getCharacterImage } from '../utils/characterImages'

export default function CharacterImage({
  character,
  emotion = 'idle',
  size = 200,
  animate = false,
  variant = 'plain',
  className = '',
}) {
  const imageUrl = getCharacterImage(character.id, emotion)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [imageUrl])

  // 没有 PNG → SVG 降级
  if (!imageUrl || failed) {
    return (
      <div className={className}>
        <NailongAvatar {...character.avatar} size={size} />
      </div>
    )
  }

  // 有 PNG → 直接渲染
  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt={character.name}
        style={{
          width: size,
          height: 'auto',
          objectFit: 'contain',
        }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
