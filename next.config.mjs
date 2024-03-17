/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ]
  },
  reactStrictMode: true,
  output: 'standalone'
};

export default nextConfig;

