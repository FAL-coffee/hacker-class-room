import  path  from 'path';
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src/"),
      "@types": path.resolve(__dirname, "src/types/index.ts"),
      "@components": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}
