import { ReactNode } from 'react'

const ProfileStatNumber = ({
  value,
  isUSDC
}: {
  value: number | string
  isUSDC?: boolean
}) => {
  return (
    <div className="flex gap-[4px] items-baseline">
      <h2 className="h4 font-extrabold leading-snug">
        {value !== null && value !== undefined ? value : '—'}
      </h2>
      {isUSDC && !!value && <p className="h8 text-gray-300">USDC</p>}
    </div>
  )
}

const ProfileStat = ({
  className,
  value,
  label,
  isUSDC
}: {
  className?: string
  value: number | string
  label: string | ReactNode
  isUSDC?: boolean
}) => {
  return (
    <div className={className}>
      <ProfileStatNumber value={value} isUSDC={isUSDC} />
      <div className="body leading-normal text-gray-300">{label}</div>
    </div>
  )
}

export default ProfileStat
