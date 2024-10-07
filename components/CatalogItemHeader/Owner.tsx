import { useHeaderContext } from './index'
import Image from 'next/image'

export function Owner() {
  const {
    catalogItem: { owner }
  } = useHeaderContext()

  if (!owner) {
    return null
  }

  const { name, avatar_media } = owner

  return (
    <div className="flex items-center justify-center gap-1 md:flex-col md:items-start">
      <div className="utility text-xs text-gray-300">owned by</div>
      <div>
        <a href={`/${name}`}>
          <div className="flex items-center gap-1">
            {avatar_media?.size0_url ? (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={avatar_media.size0_url}
                  width={24}
                  height={24}
                  alt={name}
                />
              </div>
            ) : null}
            <div className="body-sm">{name}</div>
          </div>
        </a>
      </div>
    </div>
  )
}
