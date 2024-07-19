/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'realmenrealstyle.com',
            },
            {
                protocol: 'https',
                hostname: 'www.realmenrealstyle.com',
            },
            { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
            { protocol: "https", hostname: "www.encrypted-tbn0.gstatic.com" },
            { protocol: "https", hostname: "americanhatmakers.com" },
            { protocol: "https", hostname: "www.americanhatmakers.com" },
        ],
    },
};

export default nextConfig;
