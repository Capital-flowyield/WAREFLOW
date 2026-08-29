/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                ink: '#080808',
                surface: '#121212',
                elevated: '#1A1A1A',
                primary: {
                    DEFAULT: '#FF5C00',
                    hover: '#FF8A00',
                    foreground: '#080808'
                },
                amber2: '#FF8A00',
                amber3: '#FFC400',
                mute: '#A1A1A1',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'rgba(255,255,255,0.08)',
                ring: '#FF5C00'
            },
            fontFamily: {
                display: ['"Cabinet Grotesk"', 'sans-serif'],
                sans: ['Manrope', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace']
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
