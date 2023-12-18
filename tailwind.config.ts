import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "main": {
          "DEFAULT": colors.blue[500],
          "hover": colors.blue[600],
        },
        "depth": {
          1: {
            "DEFAULT": colors.gray[100],
            "dark": colors.gray[900],
          },
          2: {
            "DEFAULT": "white",
            "hover": colors.gray[200],
            "dark": {
              "DEFAULT": colors.gray[800],
              "hover": colors.gray[700],
            },
          },
          3: {
            "DEFAULT": colors.gray[200],
            "dark": colors.gray[700],
          },
        },
        "variable": colors.blue[500],
        "number": colors.green[500],
        "function": colors.yellow[400],
        "boolean": colors.pink[500],
        "string": colors.orange[600],
        "reserved": colors.purple[500],
        "danger": colors.red[500],
      },
      boxShadow: {
        "DEFAULT": "0 0 6px rgba(0, 0, 0, 0.1)",
        "md": "0 0 12px rgba(0, 0, 0, 0.1)",
        "lg": "0 0 18px rgba(0, 0, 0, 0.1)",
        "xl": "0 0 24px rgba(0, 0, 0, 0.1)",
        "2xl": "0 0 30px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        "DEFAULT": "0 0 6px rgba(0, 0, 0, 0.1)",
        "md": "0 0 12px rgba(0, 0, 0, 0.1)",
        "lg": "0 0 18px rgba(0, 0, 0, 0.1)",
        "xl": "0 0 24px rgba(0, 0, 0, 0.1)",
        "2xl": "0 0 30px rgba(0, 0, 0, 0.1)",
      },
    }
  },
  plugins: [],
  darkMode: 'class',
}
export default config
