module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "stone-henge": "url('/stone-henge.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["focus"],
      borderRadius: ["focus"],
      borderColor: ["hover"],
    },
  },
  plugins: [],
};
