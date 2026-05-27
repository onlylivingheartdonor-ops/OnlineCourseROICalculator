/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'onlinecourseroi.com' }],
        destination: 'https://www.onlinecourseroi.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig