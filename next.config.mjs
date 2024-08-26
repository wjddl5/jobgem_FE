/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                destination: 'http://localhost:8080/api/:path*',
                source: '/api/:path*'
            }
        ]
    }
};

export default nextConfig;
