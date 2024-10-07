import { DROP_HERO_TYPES } from '@/enum'
import DropMonstersHero from './DropMonstersHero'
import DropMonstersLandingHero from './DropMonstersLandingHero'
import DropStandardHero from './DropStandardHero'
import DropStandardLandingHero from './DropStandardLandingHero'

interface IDropHeroFactory {
  drop: any
  type?: string
}

const DropHeroFactory = ({
  drop,
  type = DROP_HERO_TYPES.STANDARD
}: IDropHeroFactory) => {
  if (type === DROP_HERO_TYPES.STANDARD) {
    switch (drop.dropHeroComponent) {
      case 'DropMonstersHero':
        return <DropMonstersHero drop={drop} />
      default:
        return <DropStandardHero drop={drop} />
    }
  } else {
    switch (drop.dropLandingHeroComponent) {
      case 'DropMonstersLandingHero':
        return <DropMonstersLandingHero drop={drop} />
      default:
        return <DropStandardLandingHero drop={drop} />
    }
  }
}

export default DropHeroFactory
