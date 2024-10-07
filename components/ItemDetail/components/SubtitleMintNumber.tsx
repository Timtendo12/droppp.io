import { numberWithCommas } from '@/util/numberHelpers'

const SubtitleMintNumber = ({
  number,
  count
}: {
  number: number
  count: number
}) =>
  number &&
  count && (
    <div>
      <span className="text-lg font-bold">#{numberWithCommas(number)} </span>
      <span className="body-sm text-gray-400">
        {' '}
        / {numberWithCommas(count)}
      </span>
    </div>
  )

export default SubtitleMintNumber
