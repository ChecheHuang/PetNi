/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '24.media.tumblr.com',
        pathname: '**',
      },
    ],
  },
}
module.exports = nextConfig
