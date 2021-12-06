module.exports = {
  future: {
    webpack5: true,
  },
  target: "serverless",
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        module: "empty",
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
