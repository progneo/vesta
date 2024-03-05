/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5137/api/:path*'
      }
    ]
  }
};

export default nextConfig;
