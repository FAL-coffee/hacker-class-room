const path = require("path");
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src/"),
      "@types": path.resolve(__dirname, "src/types/index.ts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@fixtures": path.resolve(__dirname, "src/fixtures/index.ts"),
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "@routes": path.resolve(__dirname, "src/constants/routes.ts"),
    };
    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};
