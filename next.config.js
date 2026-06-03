/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dreamix-back.liara.run"
            },
            {
                protocol: "https",
                hostname: "www.portal.ir"
            },
            
        ]
    }
}

module.exports = nextConfig;
