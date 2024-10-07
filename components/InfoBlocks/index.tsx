import { range } from 'lodash'
import InfoBlock, {
  InfoBlockAppearance,
  InfoBlockDefinition
} from './InfoBlock'
import { classNames } from '@/util/tailwindHelpers'

type Props = {
  definitions: InfoBlockDefinition[]
  blocksPerRow?: number
  className?: string
  blockAppearance?: InfoBlockAppearance
}

const InfoBlocks = ({
  definitions,
  blocksPerRow = 2,
  className,
  blockAppearance
}: Props): JSX.Element => {
  let groups = group(definitions, blocksPerRow)

  if (groups.length <= 0) return

  return (
    <div className={classNames('flex flex-col flex-1 gap-2', className)}>
      {groups.map((group, rowIndex) => {
        return (
          <div className="flex flex-1 gap-2" key={`infoblock-row-${rowIndex}`}>
            {group.map((item, columnIndex) => {
              return (
                <InfoBlock
                  label={item.label}
                  value={item.value}
                  style={group.length > 1 ? 'grouped' : 'solo'}
                  key={`infoblock-row-${rowIndex}-col-${columnIndex}`}
                  appearance={blockAppearance}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const group = <T,>(items: T[], itemsPerGroup: number): T[][] => {
  let rows = Math.ceil(items.length / itemsPerGroup)

  let groups = range(0, rows).map(row => {
    const startIndex = row * itemsPerGroup
    const itemsInGroup = Math.min(items.length - startIndex, itemsPerGroup)

    return range(startIndex, startIndex + itemsInGroup).map(
      index => items[index]
    )
  })

  return groups
}

export default InfoBlocks
