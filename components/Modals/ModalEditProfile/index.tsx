import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import InfiniteScroll from 'react-infinite-scroller'
import classNames from 'classnames'
import { useAuth } from '@/contexts/auth'
import { Icon, Button, Loading } from '@/components'
import Modal from '@/components/Modals/Modal'
import styles from './styles.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { profileGetQueryKey } from '@/api/resources/profile/get'
import { useGetUserMedia } from '@/api/resources/user/media/get'
import { useSetUserMediaMutation } from '@/api/resources/user/media/set'
import { sendGTMEvent } from '@next/third-parties/google'
import { ButtonLink } from '@/components/Button'

const AVATAR_LIST_WRAPPER_ID = 'avatar-list-wrapper'

const ModalEditProfile = ({ profileMedia, account, open, onClose }) => {
  const [selectedAsset, setSelectedAsset] = useState(profileMedia)
  const { fetchUser } = useAuth()
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetUserMedia({
    media_type: 'avatar'
  })
  const queryClient = useQueryClient()

  // @ts-expect-error
  const { items } = data || {}
  const dataLength = items?.length

  const { mutate: setUserMediaMutation, isLoading: updating } =
    useSetUserMediaMutation(
      {
        media_type: 'avatar',
        media_id: selectedAsset.id
      },
      {
        onSuccess: async () => {
          await fetchUser()
          queryClient.invalidateQueries(profileGetQueryKey(account)).then()
          onClose(selectedAsset)

          sendGTMEvent({
            event: 'avatar_change'
          })
        }
      }
    )

  const handleClose = () => {
    setSelectedAsset(profileMedia)
    onClose()
  }

  const renderContent = () => {
    return (
      <div className="w-full p-3 md:p-0 flex-1 flex flex-col min-h-0">
        <div>
          <Button theme="clean" onClick={handleClose}>
            <Icon name="close" size={24} />
          </Button>
        </div>
        <div className="relative mt-[10px] mb-[18px]">
          <div className={styles.iconWrapper}>
            {selectedAsset && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={selectedAsset?.size3_url}
                  alt={'user selected avatar'}
                />
              </>
            )}
          </div>
        </div>
        <div className="h4 font-black text-white text-left md:text-center">
          Select an Avatar
        </div>
        <div className="mt-1 font-medium text-gray-200 text-left md:text-center">
          Select an avatar to set as your profile picture (PFP).
        </div>

        {!!dataLength && (
          <div
            id={AVATAR_LIST_WRAPPER_ID}
            className="rounded-[48px] bg-gray-800 overflow-auto my-3 mx-0 flex-1 max-h-[288px] min-h-[144px]"
          >
            <InfiniteScroll
              className="!overflow-visible"
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={
                <div className="relative h-5 w-full">
                  <Loading size="medium" />
                </div>
              }
              useWindow={false}
              getScrollParent={() =>
                document.getElementById(AVATAR_LIST_WRAPPER_ID)
              }
            >
              <ul className="grid grid-cols-3 gap-2 p-2 w-full">
                {items.map((asset, index) => (
                  <li key={index}>
                    <button
                      className={classNames(styles.asset, {
                        [styles.isSelected]: asset.id === selectedAsset?.id
                      })}
                      disabled={asset.is_locked}
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <img
                          src={asset.size3_url}
                          alt={`avatar - ${asset.id}`}
                        />
                      </>
                      {asset.is_locked && (
                        <Popup
                          className="lock-profile-media-tooltip"
                          trigger={() => (
                            <div className={styles.locked}>
                              <Icon
                                className={styles.locked__icon}
                                size={32}
                                name="lock"
                              />
                            </div>
                          )}
                          closeOnDocumentClick
                          // keepTooltipInside
                          position={['top center', 'top right', 'top left']}
                          on={['hover', 'focus']}
                        >
                          <div className="flex">
                            <Icon name="info" />
                            <div className="font-medium body-sm text-white ml-1">
                              This avatar is unlocked with purchase of a custom
                              Droppp address.
                            </div>
                          </div>
                        </Popup>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        )}
        <div className="flex gap-3">
          <ButtonLink
            className="w-full "
            theme="secondary"
            href="drop/93/droppp-monsters-series-1/shop/"
          >
            Shop More
          </ButtonLink>
          <Button
            className="w-full"
            loading={isLoading || updating}
            disabled={!selectedAsset}
            onClick={() => setUserMediaMutation()}
          >
            Apply
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      open={open}
      renderContent={renderContent}
      onClose={handleClose}
      shouldCloseOnOverlayClick={true}
      className={styles.modal}
    />
  )
}

export default ModalEditProfile
