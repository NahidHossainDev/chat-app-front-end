/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		nodeEnv: process.env.NODE_ENV,
		publicURL: process.env.PUBLIC_URL,
		apiURL: process.env.API_URL,
		gDriveLink: process.env.G_DRIVE_LINK,
	},

	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
