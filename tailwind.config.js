module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chartreuse: {
          50: "hsl(var(--chartreuse-50) / <alpha-value>)",
          100: "hsl(var(--chartreuse-100) / <alpha-value>)",
          200: "hsl(var(--chartreuse-200) / <alpha-value>)",
          300: "hsl(var(--chartreuse-300) / <alpha-value>)",
          400: "hsl(var(--chartreuse-400) / <alpha-value>)",
          500: "hsl(var(--chartreuse-500) / <alpha-value>)",
          600: "hsl(var(--chartreuse-600) / <alpha-value>)",
          700: "hsl(var(--chartreuse-700) / <alpha-value>)",
          800: "hsl(var(--chartreuse-800) / <alpha-value>)",
          900: "hsl(var(--chartreuse-900) / <alpha-value>)",
          950: "hsl(var(--chartreuse-950) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
