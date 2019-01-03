const fs = require("fs");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

// By default all builds are treated as development
// We do not use enviroment variables here as it's really a builder for projects so to speak
// Therefor we simply check for --release flag within the build script
// This way its clear which script is for production (release) and which isnt 
const isRelease = process.argv.indexOf("--release") !== -1;

// See README
const useHTTPS = process.argv.indexOf("--use-https") !== -1;

// Third parties for development
let reactPath = "react.development.js";
let reactDomPath = "react-dom.development.js";
let fontAwesomeTag = "fontawesome-free/css/all.min.css";

// Here for production we want to use CDN
if(isRelease)
{
    reactPath = "https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js";
    reactDomPath = "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js";
    fontAwesomeTag = "https://use.fontawesome.com/releases/v5.6.3/css/all.css";
}

module.exports = {
    entry: `${__dirname}/src/Index.tsx`,

    output: {
        filename: "bundle.js",
        path: `${__dirname}/dist/build`
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
                loader: "ts-loader",
                options: {

                }
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
                    "sass-loader"
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: "assets/",
                            limit: 8196,
                            fallback: "file-loader?outputPath=assets/"
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            minify: isRelease ? {
                collapseWhitespace: true,
                removeComments: true
            } : false,
            filename: "index.html",
            react: reactPath,
            reactDom: reactDomPath,
            fontawesome: fontAwesomeTag,
            template: `${__dirname}/dist/template.html`
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(["dist/build"])
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devServer: {
        contentBase: [
            `${__dirname}/dist`,
            `${__dirname}/node_modules/react/umd`,
            `${__dirname}/node_modules/react-dom/umd`,
            `${__dirname}/node_modules/@fortawesome`
        ],
        https: useHTTPS ? {
            key: fs.readFileSync(`${__dirname}/certs/serverkey.pem`),
            cert: fs.readFileSync(`${__dirname}/certs/servercert.pem`)
        } : false,
        compress: false,
        port: 9000,
        open: true,
        clientLogLevel: 'none',
        overlay: true,
        proxy: {
            "/api": "http://localhost:9001" // In case its needed for server :)
        }
    }
};