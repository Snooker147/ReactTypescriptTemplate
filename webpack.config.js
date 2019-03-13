const fs = require("fs");

const Webpack = require("webpack"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Configuration
const Config = require("./webpack.config.vars");

// By default all builds are treated as development
// We do not use enviroment variables here as it's really a builder for projects so to speak
// Therefor we simply check for --release flag within the build script
// This way its clear which script is for production (release) and which isnt 
const isRelease = process.argv.indexOf("--release") !== -1;

// See README
const useHTTPS = Config.https;

// Proxy configuration
const proxy = {};
proxy[Config.backendApiPrefix] = Config.proxy;

module.exports = {
    entry: `${__dirname}/${Config.entry}`,

    output: {
        filename: Config.paths.bundleFileName,
        path: `${__dirname}/${Config.paths.distribution}`
    },

    performance: {
        hints: false
    },

    devtool: isRelease ? false : "source-map",

    resolve: {
        extensions: [
            ".ts", 
            ".tsx", 
            ".js", 
            ".json"
        ]
    },

    module: {
        rules: [ 

            { 
                test: /\.tsx?$/, 
                use: [
                    "ts-loader",
                    {
                        loader: "tslint-loader",
                        options: {
                            emitErrors: true,
                            failOnHint: true
                        }
                    }
                ]
            },

            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },

            {
                test: /\.scss$/,
                use: [
                    isRelease ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                "./node_modules"
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp|ttf|otf|eot|woff2|woff)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: Config.paths.assets,
                            limit: Config.assetEncodeMaxSize,
                            fallback: "file-loader?outputPath=" + Config.paths.assets
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({
            webpackCfg: {
                useHTTPs: JSON.stringify(Config.https),
                site: JSON.stringify(isRelease ? Config.sitename.release : Config.sitename.debug),
                apiPrefix: JSON.stringify(Config.backendApiPrefix)
            }
        }),
        new HtmlWebpackPlugin({
            minify: isRelease ? Config.htmlMinify : false,
            favicon: Config.paths.favicon,
            filename: Config.paths.outputName,
            template: `${__dirname}/${Config.paths.templateName}`
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],

    devServer: {
        contentBase: Config.paths.serveContentBase,
        https: useHTTPS ? {
            key: fs.readFileSync(`${__dirname}/${Config.paths.certPathKey}`),
            cert: fs.readFileSync(`${__dirname}/${Config.paths.certPathCert}`)
        } : false,
        compress: Config.devServer.compress,
        port: Config.devServer.port,
        open: Config.devServer.autoOpen,
        clientLogLevel: 'none',
        historyApiFallback: Config.devServer.useRouting, // allows rooting, disable if you are not using rooting
        overlay: Config.devServer.errOverlay,
        proxy: proxy
    }
};