/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'vbwbfflzxuhktdvpbspd.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**'},
          {
          protocol: 'https',
          hostname: 'www.realmenrealstyle.com'},
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "www.encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "americanhatmakers.com" },
      { protocol: "https", hostname: "www.americanhatmakers.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.images.unsplash.com" },
        ],
      },
};

export default nextConfig;