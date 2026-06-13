/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tema editorial / impresso
        paper: {
          DEFAULT: "#F2EEE1", // fundo
          card: "#FBF8EF", // cartões claros
          deep: "#E9E3D2", // tom levemente mais escuro
        },
        ink: {
          DEFAULT: "#17140F", // quase-preto (texto / painéis)
          soft: "#6E665A", // texto secundário
          line: "#1714101f", // linhas/bordas
        },
        gold: {
          DEFAULT: "#C8972E",
          light: "#E7BE4D",
          dark: "#9A6F1C",
        },
        scarlet: { DEFAULT: "#E8472B", dark: "#C5371E" },
        grass: { DEFAULT: "#2F8F3E", dark: "#1F6F2C" },
        brick: { DEFAULT: "#C5392B" },
      },
      fontFamily: {
        display: ['"Anton"', "system-ui", "sans-serif"],
        head: ['"Archivo"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(0,0,0,0.04), 0 12px 30px -18px rgba(0,0,0,0.35)",
        panel: "0 20px 50px -28px rgba(0,0,0,0.55)",
        lift: "0 2px 0 #17140f",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        flip: {
          "0%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        shuffle: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pop-in": "pop-in 0.35s ease-out both",
        "slide-in": "slide-in 0.4s ease-out both",
        flip: "flip 0.4s ease-out both",
        shuffle: "shuffle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
