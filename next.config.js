module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://https://musiceventsmain.vercel.app/:path*',
      },
    ];
  },
};
