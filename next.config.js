/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		nodeEnv: process.env.NODE_ENV,
		publicURL: process.env.PUBLIC_URL,
		apiURL: process.env.API_URL,
	},

	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
