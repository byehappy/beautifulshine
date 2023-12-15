/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '**',
          },
        ],
      },
    compiler:{
        styledComponents:true,
    }
}

module.exports = nextConfig
