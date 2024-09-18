/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mealmakerstorage.blob.core.windows.net', 'static.ifood-static.com.br', 'srantonini.com.br'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/path/to/images/**',
      },
      {
        protocol: 'https',
        hostname: 'another-example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
