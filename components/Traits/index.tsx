import classNames from 'classnames'

interface ITraitsProps {
  items: ITraitProps[]
  className?: string
}

interface ITraitProps {
  name: string
  percent: string
  value: string
}

const Trait = ({ name, percent, value }: ITraitProps) => {
  return (
    <div className="border border-defaultBorder bg-gray-850 rounded-2xl text-center py-2 px-1 text-white">
      <p className="utility text-gray-300 mb-half">{name}</p>
      <p className="utility-alt-sm mb-half">{value}</p>
      <p className="body-sm text-gray-300">{percent}% Have This Trait</p>
    </div>
  )
}

const Traits = ({ items, className = '' }: ITraitsProps) => {
  return (
    <div className={classNames('grid md:grid-cols-3 gap-2', className)}>
      {items.map((trait, i) => (
        <Trait key={i} {...trait} />
      ))}
    </div>
  )
}

export default Traits
