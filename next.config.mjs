const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/Algorithm-Visualizer-DSA/" : "",
  basePath:
    process.env.NODE_ENV === "production" ? "/Algorithm-Visualizer-DSA" : "",
};

export default nextConfig;
