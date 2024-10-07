export const STATS_MAP = {
  'pre-redemption': [
    {
      key: 'owner_count',
      label: 'Collectors',
      usdc: false,
      symbol: false
    },
    {
      key: 'redeemable_count',
      label: 'Redeemables',
      usdc: false,
      symbol: false
    },
    {
      key: 'last_24hr_sales_value',
      label: '24hr volume',
      usdc: true,
      symbol: true
    },
    {
      key: 'total_sales_value',
      label: 'total volume',
      usdc: true,
      symbol: false
    }
  ],
  monster: [
    {
      key: 'items',
      label: 'Items',
      usdc: false,
      symbol: false
    },
    {
      key: 'owner_count',
      label: 'Collectors',
      usdc: false,
      symbol: false
    },
    {
      key: 'last_24hr_sales_value',
      label: '24hr volume',
      usdc: true,
      symbol: true
    },
    {
      key: 'total_sales_value',
      label: 'total volume',
      usdc: true,
      symbol: false
    }
  ],
  promo: [
    {
      key: 'owner_count',
      label: 'Collectors',
      usdc: false,
      symbol: false
    },
    {
      key: 'last_24hr_sales_value',
      label: '24hr volume',
      usdc: true,
      symbol: true
    },
    {
      key: 'total_sales_value',
      label: 'total volume',
      usdc: true,
      symbol: false
    }
  ],
  'sales-history': [
    {
      key: 'median_sold_price',
      label: 'Estimated Value',
      usdc: true,
      symbol: false
    },
    {
      key: 'highest_sold_price',
      label: 'Highest Sale Price',
      usdc: true,
      symbol: false
    },
    {
      key: 'lowest_sold_price',
      label: 'Lowest Sale Price',
      usdc: true,
      symbol: false
    }
  ]
}
