/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                ink: "#0A0A0B",
                surface: "#121215",
                card: "#18181C",
                blood: {
                    DEFAULT: "#DC2626",
                    bright: "#FF2E2E",
                    dark: "#7F1D1D",
                },
                amber: "#F59E0B",
                line: "#27272A",
            },
            fontFamily: {
                display: ['"Barlow Condensed"', "sans-serif"],
                body: ['"DM Sans"', "sans-serif"],
                mono: ['"JetBrains Mono"', "monospace"],
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                marquee: "marquee 55s linear infinite",
                "spin-slow": "spin-slow 24s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
