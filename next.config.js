/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const path = require('path')

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            port: '',
            pathname: '/7.x/**',
          },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
}

module.exports = nextConfig
