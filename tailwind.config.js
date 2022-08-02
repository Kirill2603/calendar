/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-purple-400',
    'text-red-100',
    'text-green-100',
    'text-blue-100',
    'text-orange-100',
    'text-yellow-100',
    'text-purple-100',
    '-translate-y-[50%]', 'translate-x-full', '-translate-x-full'
  ],
}
