module.exports = {
  webpack5: false,
  future: {
    webpack5: false,
  },
  target: "serverless",
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        module: "empty",
        dns: "mock",
        path: true,
        url: false,
      };
    }

    config.module.rules.push({
      test: /\.(gif|png|jpg|svg)(\?.*$|$)/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
