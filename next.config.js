/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'authjs.dev',
        port: '',
        pathname: '/img/providers/**',
      }
    ]
  }

}

module.exports = nextConfig
