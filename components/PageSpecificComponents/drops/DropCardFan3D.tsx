import classNames from 'classnames'
import RoundedBox from '@/components/RoundedBox'
import Field from '@/components/Field'
import Separator from '@/components/Separator'
import { isDev, isLocal } from '@/config'
import Toggle from '@/components/Toggle'
import { useState, useReducer, useEffect } from 'react'
import { findDropConfigById } from '@/config/drops'
import useBreakpoints from '@/hooks/useBreakpoints'
import CloudinaryAsset from '@/components/CloudinaryAsset'
import dynamic from 'next/dynamic'
import { MergedDrop } from '@/config/drops/schema'
import React from 'react'

const DropCardFan3dItem = dynamic(() => import('./DropCardFan3dItem'), {
  ssr: false
})

export interface ICardFanConfig {
  showWireframe: boolean
  slots: number
  slotsToWidthRatio: number
  offset: number
  parentPerspective: number
  parentMiddleAngleOffset: number
  parentRadius: number
  parentRotationX: number
  parentTranslateY: number
  parentTranslateZ: number
  cardRotationX: number
  cardOffsetY: number
}

const CARDFAN_CONFIG_DEFAULT_INIT: ICardFanConfig = {
  showWireframe: false,
  slots: 17,
  slotsToWidthRatio: 3,
  offset: 2.5,
  parentPerspective: 2212,
  parentMiddleAngleOffset: 0,
  parentRadius: 862,
  parentRotationX: -14,
  parentTranslateY: 206,
  parentTranslateZ: 560,
  cardRotationX: 0,
  cardOffsetY: 0 // 30
}

const CARDFAN_CONFIG_SMALL_INIT: ICardFanConfig = {
  showWireframe: false,
  slots: 18,
  slotsToWidthRatio: 3.15,
  offset: 2.5,
  parentPerspective: 2200,
  parentMiddleAngleOffset: 0,
  parentRadius: 375,
  parentRotationX: -14,
  parentTranslateY: 87,
  parentTranslateZ: 527,
  cardRotationX: 0,
  cardOffsetY: 0
}

function reducer(
  state: ICardFanConfig,
  action: { name: string; value: any }
): ICardFanConfig {
  if (action.name === 'all') {
    return { ...action.value }
  }
  return { ...state, [action.name]: action.value }
}

type Props = {
  drop: MergedDrop
  className?: string
  dropId: number
}

function DropCardFan3D({ drop, className, dropId }: Props) {
  const {
    figures: { overview, quality }
  } = drop
  const { cardsFan, cloudinaryFolder } = findDropConfigById(dropId)
  const cloudinaryAssetPath = `drops/${cloudinaryFolder}/`
  const cards = cardsFan.cards.slice(0, 6)
  const { isMedium } = useBreakpoints()
  const [showControls, setShowControls] = useState(false)
  const [state, dispatch] = useReducer(reducer, CARDFAN_CONFIG_DEFAULT_INIT)

  useEffect(() => {
    if (isMedium === undefined) return
    dispatch({
      name: 'all',
      value: isMedium ? CARDFAN_CONFIG_DEFAULT_INIT : CARDFAN_CONFIG_SMALL_INIT
    })
  }, [isMedium])

  const figureAsset = overview || {
    type: 'image',
    source: 'grail-hero'
  }

  const figureQuality = quality ? quality : 75

  // @TODO - clean up this logic  - Josh Dobson
  // DEFAULT VALUES
  let figureWidth = isMedium ? 564 : 330
  let figureHeight = isMedium ? 564 : 330
  let maxFigureWidth = isMedium ? 564 : 330
  let minFigureWidth = 0

  if (overview?.dimensions) {
    if (overview.dimensions.minWidth) {
      if (typeof overview.dimensions.minWidth !== 'number') {
        minFigureWidth = isMedium
          ? overview.dimensions.minWidth.lg
          : overview.dimensions.minWidth.sm
      } else {
        minFigureWidth = overview.dimensions.minWidth
      }
    }

    if (overview.dimensions.maxWidth) {
      if (typeof overview.dimensions.maxWidth !== 'number') {
        maxFigureWidth = isMedium
          ? overview.dimensions.maxWidth.lg
          : overview.dimensions.maxWidth.sm
      } else {
        maxFigureWidth = overview.dimensions.maxWidth
      }
    }

    if (overview.dimensions.width) {
      if (typeof overview.dimensions.width !== 'number') {
        figureWidth = isMedium
          ? overview.dimensions.width.lg
          : overview.dimensions.width.sm
      } else {
        figureWidth = overview.dimensions.width
      }
    }

    if (overview.dimensions.height) {
      if (typeof overview.dimensions.height !== 'number') {
        figureHeight = isMedium
          ? overview.dimensions.height.lg
          : overview.dimensions.height.sm
      } else {
        figureHeight = overview.dimensions.height
      }
    }
  }

  return (
    <div className={classNames(className, 'transform-gpu pointer-events-none')}>
      <div className="relative">
        <div className="container">
          <div className="relative">
            <div
              style={{
                maxWidth: `${maxFigureWidth}px`,
                minHeight: 'var(--figureHeight, 496px)'
              }}
              className={classNames('mx-auto flex items-end')}
            >
              <div
                className={classNames(
                  'relative left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto',
                  {
                    'pointer-events-auto': isDev || isLocal
                  }
                )}
                style={{
                  aspectRatio: `${figureWidth}/${figureHeight}`,
                  minWidth: `${minFigureWidth}px`
                }}
                tabIndex={-1}
                onClick={() => setShowControls(val => !val)}
              >
                <CloudinaryAsset
                  cloudinaryFolder={cloudinaryAssetPath}
                  asset={figureAsset}
                  className="object-contain"
                  transformations={{
                    quality: figureQuality,
                    resize: {
                      width: figureWidth * 2
                    }
                  }}
                />
              </div>
            </div>

            {/* Carousel */}
            <div
              className="absolute inset-0 -z-[1] flex items-center justify-center pointer-events-none"
              style={{
                perspective: `${state.parentPerspective}px`
              }}
            >
              <DropCardFan3dItem
                cards={cards}
                path={cloudinaryAssetPath}
                {...state}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (isDev || isLocal) && (
        <RoundedBox className="fixed bottom-0 md:bottom-4 md:right-4 w-full md:w-[750px] grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800/95">
          <div className="flex flex-col gap-1">
            <h2 className="h4">Global</h2>
            <Separator />
            <Field name={'Wireframe'} label={`Wireframe`}>
              <Toggle
                className="ml-2"
                checked={state.showWireframe}
                onChange={e =>
                  dispatch({ name: 'showWireframe', value: e.target.checked })
                }
              />
            </Field>
            <Field name={'Slots'} label={`Slots : ${state.slots}`}>
              <input
                type="range"
                min="8"
                max="60"
                step="1"
                defaultValue={state.slots}
                className="w-full"
                onChange={e =>
                  dispatch({
                    name: 'slots',
                    value: Number(e.target.value)
                  })
                }
              />
            </Field>
            <Field
              name={'SlotWidth'}
              label={`Slot Width : ${state.slotsToWidthRatio}`}
            >
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                defaultValue={state.slotsToWidthRatio}
                className="w-full"
                onChange={e =>
                  dispatch({
                    name: 'slotsToWidthRatio',
                    value: Number(e.target.value)
                  })
                }
              />
            </Field>
            <Field
              name={'Perspective'}
              label={`Perspective : ${state.parentPerspective}`}
            >
              <input
                type="range"
                min="100"
                max="3000"
                step="1"
                defaultValue={state.parentPerspective}
                className="w-full"
                onChange={e =>
                  dispatch({
                    name: 'parentPerspective',
                    value: Number(e.target.value)
                  })
                }
              />
            </Field>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <h2 className="h4">Parent</h2>
            <Separator />
            <div className="grid md:grid-cols-2  gap-2">
              <Field name={'Radius'} label={`Radius : ${state.parentRadius}`}>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="1"
                  defaultValue={state.parentRadius}
                  className="w-full"
                  onChange={e =>
                    dispatch({
                      name: 'parentRadius',
                      value: Number(e.target.value)
                    })
                  }
                />
              </Field>
              <Field
                name={'Translate Y'}
                label={`Translate Y : ${state.parentTranslateY}`}
              >
                <input
                  type="range"
                  min="-1000"
                  max="1000"
                  step="1"
                  defaultValue={state.parentTranslateY}
                  className="w-full"
                  onChange={e =>
                    dispatch({
                      name: 'parentTranslateY',
                      value: Number(e.target.value)
                    })
                  }
                />
              </Field>
              <Field
                name={'Translate Z'}
                label={`Translate Z : ${state.parentTranslateZ}`}
              >
                <input
                  type="range"
                  min="-1000"
                  max="1000"
                  step="1"
                  defaultValue={state.parentTranslateZ}
                  className="w-full"
                  onChange={e =>
                    dispatch({
                      name: 'parentTranslateZ',
                      value: Number(e.target.value)
                    })
                  }
                />
              </Field>
              <Field
                name={'Rotate X'}
                label={`Rotate X : ${state.parentRotationX}`}
              >
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  defaultValue={state.parentRotationX}
                  className="w-full"
                  onChange={e =>
                    dispatch({
                      name: 'parentRotationX',
                      value: Number(e.target.value)
                    })
                  }
                />
              </Field>
              <Field
                name={'Middle Gap'}
                label={`Middle Gap : ${state.parentMiddleAngleOffset}`}
              >
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  defaultValue={state.parentMiddleAngleOffset}
                  className="w-full"
                  onChange={e =>
                    dispatch({
                      name: 'parentMiddleAngleOffset',
                      value: Number(e.target.value)
                    })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="h4">Cards</h2>
            <Separator />
            <Field
              name={'Rotate X'}
              label={`Rotate X : ${state.cardRotationX}`}
            >
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                defaultValue={state.cardRotationX}
                className="w-full"
                onChange={e =>
                  dispatch({
                    name: 'cardRotationX',
                    value: Number(e.target.value)
                  })
                }
              />
            </Field>
            <Field name={'Offset Y'} label={`Offset Y : ${state.cardOffsetY}`}>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                defaultValue={state.cardOffsetY}
                className="w-full"
                onChange={e =>
                  dispatch({
                    name: 'cardOffsetY',
                    value: Number(e.target.value)
                  })
                }
              />
            </Field>
          </div>
        </RoundedBox>
      )}
    </div>
  )
}

export default React.memo(DropCardFan3D)
