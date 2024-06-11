/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET
    },
    images: {
        domains: ['static.wixstatic.com'],
    },
};

export default nextConfig;
