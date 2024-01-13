/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com']
  },
}

module.exports = nextConfig
