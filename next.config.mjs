/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/page",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
