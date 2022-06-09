const forms = require("@tailwindcss/forms")
const typography = require("@tailwindcss/typography")
const aspectRatio = require("@tailwindcss/aspect-ratio")

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [forms, typography, aspectRatio],
}
