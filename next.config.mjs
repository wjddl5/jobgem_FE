/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				destination: `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/api/:path*`,
				source: "/api/:path*",
			},
			{
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
				source: "/s3/:path*",
			},
		];
	},
};

export default nextConfig;
