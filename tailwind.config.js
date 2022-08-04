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
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-purple-500',
    'border-red-500',
    'border-green-500',
    'border-blue-500',
    'border-orange-500',
    'border-yellow-500',
    'border-purple-500',
    'text-red-100',
    'text-green-100',
    'text-blue-100',
    'text-orange-100',
    'text-yellow-100',
    'text-purple-100',
    '-translate-y-[50%]', 'translate-x-full', '-translate-x-full'
  ],
}
