import { getCharacterImage } from '../utils/characterImages'

export default function CharacterImage({
  character,
  emotion = 'idle',
  size = 200,
  className = '',
}) {
  const imageUrl = getCharacterImage(character.id, emotion)

  if (!imageUrl) {
    return null
  }

  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt={character.name}
        width={size}
        height={size}
        loading="lazy"
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
