/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/AutaKimi-Release',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
