/** @type {{output: string, rewrites(): [{destination: string, source: string}], reactStrictMode: boolean}} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5137/api/:path*'
      }
    ]
  },
  reactStrictMode: true,
  output: 'standalone'
};

export default nextConfig

