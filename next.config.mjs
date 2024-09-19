/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				destination: "http://localhost:8080/api/:path*",
				source: "/api/:path*",
			},
			{
				destination: "https://jobgem-bucket.s3.amazonaws.com/:path*",
				source: "/s3/:path*",
			},
		];
	},
};

export default nextConfig;
