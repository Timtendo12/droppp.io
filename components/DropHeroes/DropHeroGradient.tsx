import { HeroGradient } from '@/config/drops/schema'

interface Props {
  gradient: HeroGradient
}

const DropHeroGradient = ({ gradient }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, ${gradient.stop1}, ${gradient.stop2})`,
        opacity: `${gradient.opacity}%`,
        height: `${gradient.heightPercent}%`,
        mixBlendMode: gradient.blendMode
      }}
      className={`absolute top-0 left-0 right-0`}
    ></div>
  )
}

export default DropHeroGradient
