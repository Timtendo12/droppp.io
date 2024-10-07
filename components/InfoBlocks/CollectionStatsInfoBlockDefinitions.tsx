import { InfoBlockDefinition } from './InfoBlock'

type Item = {
  mint_count?: number
  owned_count?: number
  collected_count?: number
  holders_count?: number
  remaining_count?: number
  burned_count?: number
}

const collectionStatsInfoBlockDefinitions = (
  item: Item,
  showOwnedStat: boolean = false
): InfoBlockDefinition[] => {
  const {
    mint_count,
    owned_count,
    collected_count = 0,
    holders_count = 0,
    remaining_count = 0,
    burned_count = 0
  } = item

  let definitions: InfoBlockDefinition[] = []

  if (showOwnedStat) {
    definitions.push({
      label: 'Owned',
      value: {
        type: 'numeric',
        value: owned_count
      }
    })
  }

  definitions.push(
    {
      label: 'Collected',
      value: {
        type: 'fraction',
        value: {
          numerator: collected_count,
          denominator: mint_count
        }
      }
    },
    {
      label: 'Holders',
      value: {
        type: 'numeric',
        value: holders_count
      }
    },
    {
      label: 'Remaining',
      value: {
        type: 'numeric',
        value: remaining_count
      }
    },
    {
      label: 'Burned',
      value: {
        type: 'numeric',
        value: burned_count
      }
    }
  )

  return definitions
}

export default collectionStatsInfoBlockDefinitions
