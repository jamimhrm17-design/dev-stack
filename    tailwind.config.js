export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f2622e",
          pink: "#ec2f8f",
          violet: "#8b3ff0",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #f2622e 0%, #ec2f8f 55%, #8b3ff0 100%)",
      },
    },
  },
  plugins: [],
};