const path = require('path')
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src/"),
      "@types": path.resolve(__dirname, "src/types"),
      "@components": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
}
