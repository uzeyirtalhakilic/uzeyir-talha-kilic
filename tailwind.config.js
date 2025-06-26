/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'tahoma': ['Tahoma', 'sans-serif'],
      },
      cursor: {
        'xp-arrow': 'url("/cursors/default_arrow.cur"), auto',
        'xp-link': 'url("/cursors/default_link.cur"), pointer',
        'xp-move': 'url("/cursors/default_move.cur"), move',
        'xp-wait': 'url("/cursors/default_wait.cur"), wait',
        'xp-no': 'url("/cursors/default_no.cur"), not-allowed',
      },
    },
  },
  plugins: [],
} 