const ConditionalWrap = ({
  condition,
  wrap,
  falseWrap = children => children,
  children
}) => (condition ? wrap(children) : falseWrap(children))

export default ConditionalWrap
