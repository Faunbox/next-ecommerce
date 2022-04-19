module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  staticPageGenerationTimeout: "60",
  compiler: {
    styledComponents: true,
  },
};
