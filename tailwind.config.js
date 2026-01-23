/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#e63946",        // Retro Red oficial
                secondary: "#d4af37",      // Dorado oficial (ajustado para Admin Panel)
                accent: "#f5f5dc",         // Cream oficial
                dark: "#1A1818",           // Negro profundo para contraste
                "background-light": "#f5f5dc", // Fondo ahora es crema
                "background-dark": "#121212",
                "paper-light": "#fdfdfd",
                "paper-dark": "#2A2A2A",
                "paper": "#fdfdfd",        // Alias para compatibilidad
            },
            fontFamily: {
                display: ["'Abril Fatface'", "serif"],
                hand: ["'Permanent Marker'", "cursive"],
                body: ["'Space Grotesk'", "sans-serif"],
                script: ["'Caveat'", "cursive"],
                punk: ["'Bangers'", "cursive"],
                raw: ["'Rock Salt'", "cursive"],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
