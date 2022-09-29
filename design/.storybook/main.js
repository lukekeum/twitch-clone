const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['react-app', { flow: false, typescript: true }],
          require.resolve('@emotion/babel-preset-css-prop'),
        ],
      },
    });

    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('../node_modules/@emotion/react'),
      '@emotion/styled': toPath('../node_modules/@emotion/styled'),
      'emotion-theming': toPath('../node_modules/@emotion/react'),
    };
    return config;
  },
};
