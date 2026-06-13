/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta "Copa dos Sonhos"
        pitch: {
          950: "#06100A", // fundo principal (verde-petróleo quase preto)
          900: "#0A1A11",
          800: "#0F2417",
          700: "#143020",
        },
        turf: {
          DEFAULT: "#18B85C", // verde-gramado primário
          dark: "#0E7A3C",
          light: "#3CE07F",
        },
        chalk: "#EAF4EC", // branco-giz das linhas do campo
        trophy: {
          DEFAULT: "#FFC53D", // ouro do troféu (raridade lendária / MVP)
          dark: "#E0A21A",
        },
        flash: "#B6FF4D", // verde-limão de destaque (placar)
      },
      fontFamily: {
        display: ['"Anton"', "Impact", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(24,184,92,0.45)",
        "glow-gold": "0 0 36px -8px rgba(255,197,61,0.45)",
        card: "0 10px 30px -12px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "dice-roll": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.15)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pop-in": "pop-in 0.35s ease-out both",
        "dice-roll": "dice-roll 0.6s ease-in-out",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
