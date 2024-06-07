/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["asset.brandfetch.io", "res.cloudinary.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
