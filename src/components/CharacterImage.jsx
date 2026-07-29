import { getCharacterImage } from '../utils/characterImages'

export default function CharacterImage({
  character,
  emotion = 'idle',
  size = 200,
  priority = false,
  className = '',
}) {
  const imageUrl = getCharacterImage(character.id, emotion)

  if (!imageUrl) return null

  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt={character.name}
        width={size}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: size,
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  )
}
