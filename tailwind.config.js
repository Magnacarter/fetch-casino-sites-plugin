/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      './assets/**/*.js',
      './assets/**/*.css',
      './**/*.php',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      heading: ['Montserrat', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      // leaving these in because we haven't yet nailed down the standard sizes
      // base: '1.125rem', // 18px
      lg: '1.25rem', // 20px
      xl: '1.875rem', // 30px
      '2xl': '2.188rem', // 35px
      '3xl': ['2.5rem', '3.125rem'], // 40px
      '4xl': ['3.125rem', '3.438rem'], // 50px
      '5xl': ['5rem', 1], // 80px,
      '6xl': ['6rem', 1],
      '7xl': ['7rem', 1],
      '8xl': ['8rem', 1],
      '9xl': ['9rem', 1],
    },
    extend: {
      colors: {
        announcementBg: 'var(--color-announcement-background)',
        announcementText: 'var(--color-announcement-text)',
        headerBg: 'var(--color-header-background)',
        headerText: 'var(--color-header-text)',
        footerBg: 'var(--color-footer-background)',
        footerText: 'var(--color-footer-text)',
        cartBubble: 'var(--color-cart-bubble)',
        black: '#131313',
        gray: '#BCBCBC',
        lightGray: '#FBFBFB',
        midGray: '#ebebeb',
        mostlyBlack: '#262626',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      outline: {
        yellow: ['2px solid #ffa500'],
      },
      height: {
        max: 'max-content',
      },
      minWidth: {
        'screen-1/3': '33.3333vw',
      },
      maxWidth: {
        screen: '100vw',
      },
      maxHeight: {
        'screen-1/4': '25vh',
        'screen-1/5': '20vh',
      },
      spacing: {
        18: '4.5rem',
        full: '100%',
        'screen-1/3': '33.3333vw',
        '1/10': '10%',
        '1/12': '8.333333%',
        '3/4': '75%',
        '3/1': '300%',
        xs: '1rem',
        sm: '2rem',
        base: '3rem',
        md: '3.5rem',
        lg: '4rem',
        xl: '4.5rem',
        '2xl': '5rem',
        '3xl': '5.5rem',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(.85,0,.15,1)',
      },
    },
    variants: {

    },
    plugins: [],
  },
  safelist: [
    'field',
    'input',
  ],
  variants: {
    extend: {
      backgroundOpacity: ['group-hover'],
      height: ['hover', 'group-hover'],
      opacity: ['disabled', 'group-hover'],
      transform: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
      transitionProperty: ['group-hover'],
    },
  },
};
