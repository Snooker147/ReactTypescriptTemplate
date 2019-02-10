module.exports = {
    
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
};