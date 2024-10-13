/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: 'false',

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "light-noise": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><filter id=\"a\" filterUnits=\"objectBoundingBox\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"1\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23a)\" opacity=\"0.25\"/></svg>')",
      },
      colors: {
        primary: "#ff197d", 
        secondary: '#ffb1d3',
        copper: {
          light: '#D4A673', // Lighter copper tone
          DEFAULT: '#B87333', // Classic copper tone
          dark: '#8E5922', // Darker copper
          burnt: '#704819', // Burnt copper shade
          bronze: '#CD7F32', // Bronze-like tone
        },
      },
      fontFamily: {
        'Abril': 'Abril Fatface'
      },
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        '2xl': '5px 5px 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          'text-shadow': '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],

};
