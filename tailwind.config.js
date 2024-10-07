const plugin = require('tailwindcss/plugin')
// duplicated in 'constants/index.ts'
const BREAKPOINTS = {
  sm: 428,
  md: 768,
  lg: 926,
  xl: 1400,
  listViewModalSm: 570
}

const createSpacingUnits = (amount, mulitiplier = 8) => {
  const result = {}
  for (let i = 0; i <= amount; i++) {
    result[`${i}`] = `${i * mulitiplier}px`
    result[`f${i}`] = `calc(var(--fluidUnit) * ${i})`
  }
  result[`half`] = `${0.5 * mulitiplier}px`
  result[`fhalf`] = `calc(var(--fluidUnit) * ${0.5})`
  return result
}

const colors = {
  transparent: 'transparent',
  black: '#090909',
  'gray-25': '#f8f8f8',
  'gray-50': '#f0f0f0',
  'gray-100': '#d6d6d6',
  'gray-200': '#bdbdbd',
  'gray-300': '#a3a3a3',
  'gray-400': '#8a8a8a',
  'gray-500': '#707070',
  'gray-600': '#575757',
  'gray-700': '#3d3d3d',
  'gray-800': '#242424',
  'gray-850': '#171717',
  'gray-900': '#090909',
  white: '#ffffff',
  blue: '#3667fb',
  'blue--light': '#7096FF',
  'blue-opaque': '#0e1221',
  error: '#ff3d3d',
  'error--light': '#ff6666',
  'error-opaque': '#220e0e',
  success: '#3fb95f',
  'success-opaque': '#132217',
  alert: '#faa500',
  'alert-opaque': '#231a0a',
  system: '#8a8a8a',
  'system-opaque': '#171717',
  inherit: 'inherit'
}

const buildScreens = breakpoints => {
  const result = {}
  Object.entries(breakpoints).forEach(([key, value]) => {
    result[key] = `${value}px`
  })
  return result
}

const gradients = {
  rainbow: 'linear-gradient(to top right, #2577f1, #ff00db, #ffda4a)',
  rainbowCircle:
    'linear-gradient(to top right, #2577f1 16%, #ff00db, #ffda4a 84%)',
  'mythic/10':
    'linear-gradient(90deg, rgba(1, 255, 255, .1), rgba(153, 38, 193, .1))',
  mythic: 'linear-gradient(90deg, rgba(1, 255, 255), rgba(153, 38, 193))',
  redeemable: 'linear-gradient(to top right, #2577f152, #ff00db52, #ffda4a52)',
  'rainbow--linear': 'linear-gradient(to right, #2577f1, #ff00db, #ffda4a)',
  limited:
    'linear-gradient(233.98deg, rgba(255, 255, 255, 0.12) 9.2%, rgba(255, 255, 255, 0.0288) 95%)',
  google: 'linear-gradient(to right, #EA4335, #34A853, #4285F4)',
  monsters: 'linear-gradient(180deg, #2E3995 0%, #63368D 100%)'
}

/** @type {import('tailwindcss').Config} */

module.exports = {
  // will use dark mode if parent has a class of dark
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      primary: ['proxima-nova', 'sans-serif']
    },
    fontWeight: {
      black: 900,
      extrabold: 800,
      bold: 700,
      semibold: 600,
      medium: 500,
      normal: 500
    },
    colors: {
      ...colors,
      green: colors.success,
      'rarity-1of1': colors.white,
      'rarity-common': '#8899a6',
      'rarity-uncommon': '#058a00',
      'rarity-rare': '#3969fb',
      'rarity-epic': '#9000d4',
      'rarity-legendary': '#e93494',
      'rarity-grail': '#faa500',
      'rarity-royalty': '#007deb',
      'rarity-ultra': '#E8FF00',
      'rarity-mythic': '#01FFFF',
      'rarity-series': colors['gray-800'],
      defaultBorder: colors['gray-800'],

      // uses rrggbbaa for alpha
      'alert--light': `${colors.alert}1a`, // .1
      'success--light': `${colors.success}1a`, // .1
      modalOverlay: `${colors.black}f7` // .97
    },
    lineHeight: {
      none: 1,
      tight: 1.1,
      snug: 1.2,
      normal: 1.4
    },
    fontSize: {
      xxs: '10px',
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '24px',
      '2xl': '30px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px',
      '6xl': '56px'
    },
    spacing: createSpacingUnits(24),
    screens: buildScreens(BREAKPOINTS),
    extend: {
      opacity: {
        15: '0.15',
        48: '0.48',
        97: '0.97'
      },
      borderRadius: {
        '4xl': '1.75rem'
      },
      transitionDuration: {
        button: '400ms'
      },
      backgroundImage: {
        ...gradients
      },
      backgroundOpacity: {
        15: '0.15'
      },
      borderWidth: {
        1: '1px',
        1.5: '1.5px'
      },
      borderOpacity: {
        8: '0.08'
      },
      boxShadow: {
        outline: '0px 0px 0px 1px currentColor',
        'outline-md': '0px 0px 0px 3px currentColor',
        darkMenu: '0px 8px 24px rgba(0, 0, 0, 0.56)',
        buttonInset: `inset 0 0 0 1px ${colors['gray-700']}`,
        'buttonInset--transparent': `inset 0 0 0 1px rgba(255,255,255,.3)`,
        stickNavUp: '0px -8px 24px rgba(9, 9, 9, 0.56)',
        popover: '0px 2px 27px rgba(0, 0, 0, 0.5)',
        cookieConsent: '0px 12px 32px 0px rgba(9, 9, 9, 0.88)',
        island: '0px 16px 24px 0px rgba(9, 9, 9, 0.72)'
      },
      zIndex: {
        modal: '1000',
        confirm: '1200',
        viewModal: '1100',
        select: '10000 !important'
      }
    }
  },
  corePlugins: {
    container: false
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  safelist: [
    'bg-white/[.15]',
    'bg-black/[.72]',
    {
      pattern:
        /^(bg|border|text)\-(success|error|blue|system|alert)(\-opaque)?$/
    }
  ],

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]
          const cssVariable =
            colorKey === 'DEFAULT'
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors'))
      })
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        '.inline-link': {
          '@apply text-white underline hover:no-underline': {}
        },
        '.h1': {
          '@apply font-black text-5xl md:text-6xl leading-tight': {}
        },
        '.h2': {
          '@apply font-black text-4xl md:text-5xl leading-tight': {}
        },
        '.h3': {
          '@apply font-black text-2xl md:text-3xl leading-snug': {}
        },
        '.h4': {
          '@apply font-black text-xl leading-tight': {}
        },
        '.h5': {
          '@apply font-black text-lg leading-tight': {}
        },
        '.h6': {
          '@apply font-extrabold text-base leading-tight': {}
        },
        '.h7': {
          '@apply font-extrabold text-sm leading-snug': {}
        },
        '.h8': {
          '@apply font-extrabold text-xs leading-tight': {}
        },
        '.body-xs': {
          '@apply text-xs': {}
        },
        '.body-sm': {
          '@apply text-sm': {}
        },
        '.body': {
          '@apply text-base': {}
        },
        '.body-md': {
          '@apply text-base': {}
        },
        '.body-lg': {
          '@apply text-lg': {}
        },
        '.modal-copy': {
          '@apply font-primary text-base text-gray-400': {}
        },
        '.modal-copy-sm': {
          '@apply font-primary text-sm text-gray-400': {}
        },
        '.modal-copy-xs': {
          '@apply font-primary text-xs text-gray-400': {}
        },
        '.utility-lg': {
          '@apply font-primary leading-none text-base font-bold uppercase': {}
        },
        '.utility': {
          '@apply font-primary leading-none text-sm font-bold uppercase': {}
        },
        '.utility-sm': {
          '@apply font-primary leading-none text-xs font-bold uppercase': {}
        },
        '.utility-alt': {
          '@apply font-primary leading-normal text-base font-bold': {}
        },
        '.utility-alt-sm': {
          '@apply font-primary leading-normal text-sm font-bold': {}
        },
        '.pricing-xl': {
          '@apply font-primary leading-snug text-lg font-bold uppercase': {}
        },
        '.pricing-lg': {
          '@apply font-primary leading-normal text-base font-semibold uppercase':
            {}
        },
        '.pricing': {
          '@apply font-primary leading-snug text-sm font-semibold uppercase': {}
        },
        '.pricing-sm': {
          '@apply font-primary leading-snug text-xs font-semibold uppercase': {}
        }
      })
    })
  ]
}
