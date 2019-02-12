module.exports = {

    // Self address
    sitename: {
        debug: "http://localhost:9000",
        release: "http://yoursite.com"
    },

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
    }
};