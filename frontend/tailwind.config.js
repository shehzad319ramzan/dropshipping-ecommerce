/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#FFB200',
            light: '#FFC233',
            dark: '#E6A100',
            foreground: '#0F172A',
          },
          secondary: {
            DEFAULT: '#F66721',
            light: '#F77A3D',
            dark: '#DD5D1E',
          },
          green: {
            DEFAULT: '#10B881',
            light: '#34C497',
            dark: '#0EA273',
          },
        },
        amber: {
          300: '#FFD166',
          400: '#FFB200',
          500: '#F59E0B',
          600: '#E6A100',
        },
        orange: {
          400: '#F66721',
          500: '#F66721',
          600: '#DD5D1E',
        },
        emerald: {
          300: '#34C497',
          400: '#10B881',
          500: '#10B881',
          600: '#0EA273',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        lift: '0 18px 50px rgba(15, 23, 42, 0.14)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(255, 178, 0, 0.28), transparent 35%), radial-gradient(circle at bottom right, rgba(16, 184, 129, 0.24), transparent 40%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
}
