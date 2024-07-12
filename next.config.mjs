/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ]
    },
};

export default nextConfig;
