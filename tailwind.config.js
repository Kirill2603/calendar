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
    'bg-red-700',
    'bg-green-700',
    'bg-blue-700',
    'bg-orange-700',
    'bg-yellow-700',
    'bg-purple-700',
    'text-red-200',
    'text-green-200',
    'text-blue-200',
    'text-orange-200',
    'text-yellow-200',
    'text-purple-200',
    '-translate-y-[50%]', 'translate-x-full', '-translate-x-full'
  ],
}
