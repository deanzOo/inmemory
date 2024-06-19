/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
                port: '',
            },
            {
                protocol: 'https',
                'hostname': 'www.idf.il',
                port: ''
            }
        ]
    },
};

export default nextConfig;
