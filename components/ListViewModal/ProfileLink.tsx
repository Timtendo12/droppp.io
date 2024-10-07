import classnames from 'classnames'
import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { ListingProfile } from '@/api/resources/shared/listingProfile'

export interface Props {
  profile: ListingProfile
  className?: string
}

const ProfileLink = ({ profile, className }: Props) => {
  return (
    <Link
      href={`/${profile.name}`}
      target="_blank"
      className={classnames('group', className)}
    >
      <div className="cursor-pointer">
        <div className="flex gap-[6px] items-center">
          <Avatar
            className="w-[20px] flex-shrink-0"
            src={profile.media.avatar_media.size0_url}
            alt={`${profile.name} avatar`}
          />
          <p className="truncate text-[11px] leading-snug text-gray-500 font-extrabold uppercase group-hover:underline">
            {profile.name}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProfileLink
