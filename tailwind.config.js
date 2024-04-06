/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      main: "url('./images/layout.png')",
    },
    extend: {},
    fontFamily: {
      Jalnan: ["Jalnan"],
      Ellice : ["Ellice"],
      Pretendard:['Pretendard']
    },
  },
  plugins: [],
};
