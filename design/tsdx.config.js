const svg = require('rollup-plugin-svg')

module.exports = {
  rollup(config, option) {
    config.plugins.push(svg())

    return config;
  }
}