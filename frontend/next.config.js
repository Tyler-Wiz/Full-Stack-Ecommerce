/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tooxclusive-artist-profile.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "tooxclusive.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
