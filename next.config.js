/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/api/webhook/",
                destination: "/api/webhook",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;