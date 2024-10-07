import classNames from 'classnames'
import React from 'react'
import Slider from 'react-slick'
import useBreakpoints from '../../hooks/useBreakpoints'
import { Button } from '..'
import styles from './styles.module.scss'
import Tag from '../Tag'
import useUpdateInventoryQuery from '@/hooks/useUpdateInventoryQuery'
import { parseQueryParameter } from '@/util/queryHelpers'
import { isEmpty } from 'lodash'

const lookupFilterName = (key: string, filter: string, options: any) => {
  const option = options[key]

  switch (key) {
    case 'collections':
      return option.find(option => option.drop_id === filter)?.drop_name
    case 'traits':
      return option.find(option => option.id === +filter)?.value
    default:
      return filter
  }
}

interface Props {
  options: any
}

const InventoryFilterSummary = ({ options }: Props) => {
  const { isMobile } = useBreakpoints()
  const { update, query } = useUpdateInventoryQuery()

  // The order defined here is the order by which filters will display in the bar.
  const filters = new Map()
  filters.set('owners', 'Owner')
  filters.set('collections', 'Collection')
  filters.set('rarities', 'Rarity')
  filters.set('cardids', 'Card ID')
  filters.set('variants', 'Variant')
  filters.set('traits', 'Trait')

  const raritiesNeedingLabel = new Set(['cardids'])

  const hasFilter = [...filters.keys()].reduce(
    (has, key) => has || !!query[key]?.length,
    false
  )

  if (isMobile || !(hasFilter || query.search)) return

  const renderFilters = () => {
    return [...filters.keys()].map(key => {
      const values = [
        ...parseQueryParameter(query[key]).reduce((set, value) => {
          if (!isEmpty(value)) set.add(value)
          return set
        }, new Set<string>())
      ]

      return values.map(value => {
        const label =
          `${raritiesNeedingLabel.has(key) ? `${filters.get(key)} ` : ''}` +
          lookupFilterName(key, value, options)

        return (
          <div key={value} className="pr-1">
            <Tag
              label={label}
              onClick={() =>
                update({
                  type: 'parameter',
                  parameter: key,
                  value: value.replace(/.*?:\s*/, ''),
                  action: 'toggle'
                })
              }
            />
          </div>
        )
      })
    })
  }

  return (
    <div className={classNames(styles.container, 'min-w-0')}>
      {query.search && (
        <div className={styles.searchWrapper}>"{query.search}"</div>
      )}
      <Slider
        className="overflow-auto flex-1"
        arrows={false}
        infinite={false}
        swipeToSlide
        variableWidth
      >
        {renderFilters()}
      </Slider>
      <div className={styles.btnReset}>
        <Button
          theme="clean"
          onClick={() =>
            update({
              type: 'reset',
              parameters: ['search', ...[...filters.keys()]]
            })
          }
        >
          RESET
        </Button>
      </div>
    </div>
  )
}

export default InventoryFilterSummary
