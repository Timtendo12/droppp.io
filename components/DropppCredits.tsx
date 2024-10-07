import { getPriceStringFromCents } from '@/util/currencyHelpers'
import Icon from './Icon'

interface IDropppCreditsProps {
  credit: number
}

const DropppCredits = ({ credit }: IDropppCreditsProps) => {
  const value = getPriceStringFromCents(credit)

  return (
    <div className="grid p-3 bg-gray-850 rounded-4xl gap-2">
      <div className="col-span-2 flex items-center gap-1">
        <Icon name="dpLogoRainbow" className="max-w-3 max-h-3" />
        <div className="h5">Droppp Credits</div>
      </div>

      <div className="p-2 bg-gray-850 border-1 border-gray-700 rounded-2xl pr-3 flex items-center">
        <div className=" flex flex-col gap-1">
          <div className="body-xs uppercase font-bold text-gray-300">
            Credit Balance
          </div>
          <div className="h5">{value}</div>
        </div>
      </div>

      <div className="body text-gray-300 text-xs">
        Droppp credits are only applicable to pack purchase, address upgrade,
        and redemptions. They are automatically applied at checkout.
      </div>
    </div>
  )
}

export default DropppCredits
