export const spreadIntoEach = <Item, Props>(
  items: Item[],
  props: Props
): (Item & Props)[] =>
  items.map(item => {
    return {
      ...item,
      ...props
    }
  })
