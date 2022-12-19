/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-52-79-176-146.ap-northeast-2.compute.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
