import { default as TraitList } from '@/components/Traits'
import { TraitItem } from '@/api/resources/shared/trait'

export function Traits({ traits }: { traits?: TraitItem[] }) {
  if (!traits || traits.length <= 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="h4">Traits</h4>
      <TraitList
        items={traits.map(({ name, value, percent }) => ({
          name,
          value,
          percent: percent.toString()
        }))}
      ></TraitList>
    </div>
  )
}
