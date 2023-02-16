/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
        scrollbar: ['rounded']
    },
    plugins: [
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
}