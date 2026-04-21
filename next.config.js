/** @type {import('next').NextConfig} */
const nextConfig = {
  output : "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foodbtest1.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
