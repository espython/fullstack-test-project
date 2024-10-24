/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#17202A',
            'secondary': '#ffffff',
            'acent': '#BD2A28',
            'white': '#FFFFFF',
            'pastelBlue': '#B8C4CC', // Text Color
            'taupeGray.': '#888888', // Border Color
            'overlay': 'rgba(0, 0, 0, 0.5)',
        },
        boxShadow: {
            'xl': '0px 5px 20px 0px rgba(0, 0, 0, 0.20)',
            '2xl': '0px 0px 10px 0px rgba(0, 0, 0, 0.20) inset',
            '3xl': '0px 0px 20px 0px rgba(255, 255, 255, 0.20) inset',
        },
        fontSize: {
            xs: ['12px', '14px'],
            sm: ['14px', '20px'],
            base: ['16px', '19px'],
            lg: ['19px', '22px'],
            xl: ['23px', '28px'],
            '2xl': ['28px', '34px'],
            '3xl': ['33px', '40px'],
            '4xl': ['42px', '52px'],
        },
    },
    container: {
        center: true,
        padding: '1rem',
        screen: {
            sm: '640px',
            lg: '1024px',
            xl: '1140px',
            '2xl': '1140px',
        }
    },
},
  plugins: [],
}

