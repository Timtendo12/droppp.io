import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
  MutableRefObject,
  PropsWithChildren,
  FC,
  forwardRef
} from 'react'
import ReactModal from 'react-modal'
import styles from './styles.module.scss'
import { transformNumbersToRange } from '@/util/numberHelpers'
import { ButtonSize, ButtonTheme, IButtonProps } from '@/components/Button'
import { Button, Icon } from '@/components'
import { useWindowHeight } from '@/contexts/windowDimensions'
import { designSystem } from '@/util/tailwindHelpers'
import { ModalTheme } from '@/types/modal'
import { ModalCloseButton } from './ModalCloseButton'
import { flipLightDarkTheme } from '@/util/theme'
import ModalHeaderMedia, { ModalHeaderProps } from './ModalHeader'
import useIsSticky from '@/hooks/useIsSticky'
import classNames from 'classnames'

export interface ModalButtonProps {
  size?: ButtonSize
  theme?: ButtonTheme
  type?: IButtonProps['type']
  onClick: () => any
  label?: string
  loading?: boolean
  disabled?: boolean
}

export type ModalTitleProps = {
  header: ReactNode
  body: ReactNode
}

type ModalChildrenWrapper = FC<PropsWithChildren & { className?: string }>
export type ModalChildrenWrappers = {
  ModalBody: FC<PropsWithChildren & { className?: string; title?: string }>
  ModalFooter: ModalChildrenWrapper
  ModalHeaderMedia: FC<PropsWithChildren & ModalHeaderProps>
}

export type ModalChildren = ({
  ModalBody,
  ModalFooter,
  ModalHeaderMedia
}: ModalChildrenWrappers) => ReactNode

const TRANSLATE_MAX = 0
const TRANSLATE_MIN = 100

export const BASE_MODAL_SPACING = 24
export const MODAL_CLOSE_BUTTON_WIDTH = 24
export const MODAL_TRANSITION_LENGTH_MS = 350

export interface IModal {
  className?: string
  isCancelDisabled?: boolean
  isCloseDisabled?: boolean
  shouldHideHeader?: boolean
  spacing?: number
  theme?: ModalTheme
  onAfterClose?: () => void
  hide: () => void
  isOpen: boolean
  onRetreat?: () => void // when user wants to go back to previous view
  onCancel?: () => void // when user wants to cancel modal and potentially a flow
  shouldBlockActions?: boolean
  overlayClassName?: string
  titleClassName?: string
  children?: ModalChildren
  title?: ReactNode | ModalTitleProps
  subFooter?: ReactNode
  overlayHeaderOpaqueOnScroll?: boolean
  renderInlineTitle?: boolean
  viewId?: string
}

const isHeaderObject = (title: any): title is ModalTitleProps => {
  if (!title || typeof title === 'string') return false
  return 'header' in title
}

const Modal = ({
  className = '',
  theme = 'dark',
  shouldHideHeader = false,
  overlayHeaderOpaqueOnScroll = false,
  hide,
  onAfterClose,
  onRetreat,
  onCancel,
  shouldBlockActions = false,
  isCancelDisabled = false,
  isCloseDisabled = false,
  isOpen = false,
  children,
  overlayClassName = '',
  spacing = BASE_MODAL_SPACING,
  title,
  titleClassName,
  viewId = null
}: IModal) => {
  const windowHeight = useWindowHeight()
  const bodyTitle = isHeaderObject(title) ? title.body : title

  // Refs /////////////////////////////////////////////////////////////////

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const headerHeightRef = useRef<number>(0)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const scrollbarWidth = useRef<number>(0)

  // Helpers /////////////////////////////////////////////////////////////

  const getScrollbarWidth = (): number =>
    contentRef.current.parentElement.offsetWidth -
    contentRef.current.parentElement.clientWidth

  // Lifecycle ///////////////////////////////////////////////////////////

  useEffect(() => {
    if (!contentRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      const isContentTallerThanWindow =
        contentRef.current?.offsetHeight > windowHeight - spacing * 2

      if (isContentTallerThanWindow) {
        scrollbarWidth.current = getScrollbarWidth()
      } else if (!isContentTallerThanWindow) {
        scrollbarWidth.current = getScrollbarWidth()
      }
    })
    resizeObserver.observe(contentRef.current)
    return () => resizeObserver.disconnect() // clean up
  }, [contentRef.current])

  useEffect(() => {
    resetScroll()
  }, [viewId])

  // Event Handlers & Helpers ////////////////////////////////////////////

  const handleOnCancel = () => {
    onCancel?.()
    hide()
  }

  const resetScroll = () => {
    if (contentRef.current?.parentElement) {
      contentRef.current.parentElement.scroll({ top: 0 })
    }
  }

  // Render //////////////////////////////////////////////////////////////////////

  return (
    <ReactModal
      style={{
        overlay: {
          '--modalPadding': `${spacing}px`,
          '--modalBodyBottomPadding': `${spacing}px`,
          '--headerHeight': `${headerHeightRef.current}px`,
          '--maxWidth': '480px',
          '--modalTransitionInMs': MODAL_TRANSITION_LENGTH_MS,
          '--borderRadius': '24px',
          '--scrollbarWidth': `${scrollbarWidth.current}px`,
          '--closeButtonWidth': `${MODAL_CLOSE_BUTTON_WIDTH}px`,
          '--closeButtonTotalWidth': `calc(calc(${spacing}px * 2) + ${MODAL_CLOSE_BUTTON_WIDTH}px)`,
          '--bgColor': `${designSystem.colors['gray-850']}`,
          '--borderColor': `${designSystem.colors['gray-900']}`
        } as CSSProperties
      }}
      shouldCloseOnEsc={!(isCancelDisabled || isCloseDisabled)}
      shouldCloseOnOverlayClick={!(isCancelDisabled || isCloseDisabled)}
      contentRef={ref => {
        contentRef.current = ref
      }}
      overlayElement={(props, contentElement) => (
        <Overlay {...props} ref={overlayRef}>
          {contentElement}
        </Overlay>
      )}
      closeTimeoutMS={MODAL_TRANSITION_LENGTH_MS}
      onAfterOpen={e => e.contentEl.focus()}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
      className={classNames(className, styles.modal)}
      overlayClassName={classNames(styles.overlay, overlayClassName, {
        'pointer-events-none': shouldBlockActions
      })}
      onRequestClose={handleOnCancel}
    >
      {!shouldHideHeader && (
        <Header
          headerHeightRef={headerHeightRef}
          overlayRef={overlayRef}
          spacing={spacing}
          title={title}
          theme={theme}
          onRetreat={onRetreat}
          isCloseDisabled={isCloseDisabled}
          onCancel={onCancel}
          hide={hide}
        />
      )}

      {/* Body */}

      <main
        className={classNames(styles.content, {
          [styles.overlayHeader]: overlayHeaderOpaqueOnScroll
        })}
      >
        {children({
          ModalBody: ({ className, children }) => (
            <ModalBody
              className={className}
              title={bodyTitle}
              titleClassName={titleClassName}
            >
              {children}
            </ModalBody>
          ),
          ModalFooter,
          ModalHeaderMedia
        } as ModalChildrenWrappers)}
      </main>
    </ReactModal>
  )
}

const Overlay = forwardRef<HTMLDivElement, { children: ReactNode }>(
  function Overlay(props, ref) {
    return <div ref={ref} {...props} />
  }
)

const getHeight = (ref: MutableRefObject<HTMLDivElement>): number => {
  return ref?.current?.clientHeight || 0
}

const Header = ({
  overlayRef,
  title,
  theme,
  isCloseDisabled,
  onCancel,
  hide,
  onRetreat,
  headerHeightRef,
  spacing
}) => {
  const [titleTranslateY, setTitleTranslateY] = useState(100)
  const titleOpacityRef = useRef<number>(0)

  const headerRef = useRef<HTMLDivElement | null>(null)

  const headerTitle = isHeaderObject(title) ? title.header : title
  const isHeaderSticky = useIsSticky(headerRef, {
    threshold: 0.999,
    rootMargin: '-1px 0px -0px 0px'
  })
  const headerClassNames = classNames(styles.header, {
    [styles.headerRevealOnScroll]: isHeaderSticky
  })

  const handleScroll = e => {
    // SETUP /////////////////////////////////
    const scrollPos = e.target.scrollTop
    const isHeaderAtTop = scrollPos >= spacing
    const translateStart = spacing
    const translateEnd = headerHeightRef.current + spacing

    // TITLE - translate /////////////////////
    if (scrollPos > translateEnd && titleTranslateY !== TRANSLATE_MAX) {
      setTitleTranslateY(TRANSLATE_MAX)
    } else if (
      (scrollPos < translateStart && titleTranslateY !== TRANSLATE_MIN) ||
      // extra assurance that the title moves away
      (!isHeaderAtTop && titleTranslateY !== TRANSLATE_MIN)
    ) {
      setTitleTranslateY(TRANSLATE_MIN)
    } else if (scrollPos > translateStart && scrollPos < translateEnd) {
      setTitleTranslateY(
        Math.ceil(
          transformNumbersToRange(
            scrollPos,
            translateStart + spacing,
            translateEnd,
            TRANSLATE_MIN,
            TRANSLATE_MAX
          )
        )
      )
    }
    // TITLE - opacity ///////////////////////
    if (scrollPos > translateEnd && titleOpacityRef.current !== 1) {
      titleOpacityRef.current = 1
    } else if (scrollPos < translateStart && titleOpacityRef.current !== 0) {
      titleOpacityRef.current = 0
    } else if (scrollPos > translateStart && scrollPos < translateEnd) {
      const opacity = transformNumbersToRange(
        scrollPos,
        translateStart + spacing,
        translateEnd,
        0,
        1
      )
      titleOpacityRef.current = opacity
    }
  }

  // add listeners
  useEffect(() => {
    if (!overlayRef.current) return
    overlayRef.current.addEventListener('scroll', handleScroll)

    return () => {
      if (!overlayRef.current) return
      overlayRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [overlayRef.current])

  // set header height
  useEffect(() => {
    if (!headerRef.current) return
    headerHeightRef.current = getHeight(headerRef)
    overlayRef.current.style.setProperty(
      '--headerHeight',
      `${headerHeightRef.current}px`
    )
  }, [headerRef.current])

  return (
    <header ref={headerRef} className={headerClassNames}>
      <ModalCloseButton
        theme={flipLightDarkTheme(theme)}
        isSticky={isHeaderSticky}
        isDisabled={isCloseDisabled}
        onClick={() => {
          onCancel?.()
          hide()
        }}
      />
      {headerTitle && (
        <h1
          className={classNames(styles.header_title, 'font-black uppercase')}
          style={
            {
              '--titleTranslateY': `${titleTranslateY}%`,
              '--titleOpacity': titleOpacityRef.current
            } as CSSProperties
          }
        >
          {headerTitle}
        </h1>
      )}
      {onRetreat && (
        <div className="z-10" style={{ paddingRight: 'var(--modalPadding)' }}>
          <Button
            theme="gray-blur"
            onClick={onRetreat}
            size="xs"
            className="flex text-gray-300 items-center !rounded-full"
          >
            <div className="flex gap-1 items-center">
              <Icon name="chevronLeftOutline" />
              <span className="utility-sm">Back</span>
            </div>
          </Button>
        </div>
      )}
    </header>
  )
}

const ModalBody = ({ children, className, title, titleClassName }) => {
  return (
    <div
      className={classNames(className, 'pb-[var(--modalBodyBottomPadding)]')}
    >
      {title && (
        <h2
          className={classNames(
            titleClassName ? titleClassName : 'h4',
            styles.content_title,
            'mb-3'
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}

const ModalFooter = ({ children, className }) => {
  return (
    <footer
      className={classNames(
        styles.footer,
        className,
        '-mx-[var(--modalPadding)]'
      )}
    >
      {children}
    </footer>
  )
}

export default Modal
