/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://api.coinpaprika.com/v1/coins",
  }
}

module.exports = nextConfig
