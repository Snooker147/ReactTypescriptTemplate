const fs = require("fs");

const Webpack = require("webpack"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Configuration
const Config = require("./webpack.config.vars");

// Paths configuration
const PathsConfig = require("./webpack.config.paths");

// By default all builds are treated as development
// We do not use enviroment variables here as it's really a builder for projects so to speak
// Therefor we simply check for --release flag within the build script
// This way its clear which script is for production (release) and which isnt 
const isRelease = process.argv.indexOf("--release") !== -1 || process.argv.indexOf("--release-no-cdn") !== -1;

// See README
const useHTTPS = Config.https;

// See declaration of third-party libraries inside webpack.config.libs files
// They contain declaration for where to find development files as well as CDN file locations
const libs = require("./webpack.config.libs").libs;

// Content base declaration
const contentBase = libs.map(lib => `${__dirname}/node_modules/${lib.node}`);
contentBase.push(`${__dirname}/dist`);

// To pass to other configs
fs.writeFileSync(PathsConfig.releaseConfigName, process.argv.indexOf("--release-no-cdn") !== -1 ? "release-no-cdn" : (isRelease ? "release" : "debug" ));

// Proxy configuration
const proxy = {};
proxy[Config.backendApiPrefix] = Config.proxy;

module.exports = {
    entry: `${__dirname}/src/Index.tsx`,

    output: {
        filename: PathsConfig.bundleFileName,
        path: `${__dirname}/${PathsConfig.distribution}`
    },

    devtool: isRelease ? false : "source-map",

    resolve: {
        extensions: [
            ".ts", 
            ".tsx", 
            ".js", 
            ".json"
        ],
        plugins: [
            new TsconfigPathsPlugin()
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
                test: /\.(png|jpg|jpeg|gif|svg|bmp|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: PathsConfig.assets,
                            limit: Config.assetEncodeMaxSize,
                            fallback: "file-loader?outputPath=" + PathsConfig.assets
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
            favicon: PathsConfig.favicon,
            filename: PathsConfig.outputName,
            template: `${__dirname}/${PathsConfig.templateName}`
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin([PathsConfig.distribution])
    ],

    /*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    */

    devServer: {
        contentBase: contentBase,
        https: useHTTPS ? {
            key: fs.readFileSync(`${__dirname}/${PathsConfig.certPathKey}`),
            cert: fs.readFileSync(`${__dirname}/${PathsConfig.certPathCert}`)
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