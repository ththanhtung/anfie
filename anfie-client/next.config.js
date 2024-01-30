const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/styles")],
  },
};

module.exports = nextConfig;
