const express = require('express');
const fs = require('fs');

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
console.log('=====>', process.env.NODE_ENV, process.env.PORT)
const port  = process.env.PORT || 8080;


// Configuration
// ================================================================================================

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);

// 初始化graph 到 globe 变量中
require('./lib/initGraph')

if (isDev) {
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(__dirname, '../client/public'),
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));

    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
        res.end();
    });
}

app.listen(port, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }

    console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
});

module.exports = app;
