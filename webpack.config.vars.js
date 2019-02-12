module.exports = {

    // Self address
    sitename: {
        debug: "http://localhost:9000",
        release: "http://yoursite.com"
    },

    entry: "src/Index.tsx",

    // Proxy call
    proxy: "http://localhost:9001",

    // Prefix to add to all API calls
    backendApiPrefix: "/api",

    // Whether to use HTTPs connection
    https: false,

    // Maximal image size (in bytes) requirement for image to be converted into base64 format
    assetEncodeMaxSize: 8196,

    // Only active on release builds
    htmlMinify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
    },

    devServer: {
        compress: false,
        port: 9000,
        autoOpen: true,
        useRouting: true,
        errOverlay: true
    },

    paths: {
        // Webpack dev server content base
        serveContentBase: "dist/",

        // Config files
        distribution: "dist/build",
        
        // Where images and other assets will be generated to
        assets: "assets/",

        // Release config file name
        bundleFileName: "bundle.js",

        // Directory for release-no-cdn library files (relative to distribution)
        thirdparty: "thirdparty",
        
        // HTML Template stuff
        favicon: "dist/favicon.ico",
        templateName: "dist/template.html",
        outputName: "index.html",

        // Internal
        releaseConfigName: "dist/__release-config",

        // Certs:
        certPathKey: "certs/serverkey.pem",
        certPathCert: "certs/servercert.pem"
    }
};