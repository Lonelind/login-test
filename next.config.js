const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    webpack: (config) => {
        config.resolve.modules.push(path.resolve(__dirname, 'src'));
        return config;
    },
});
