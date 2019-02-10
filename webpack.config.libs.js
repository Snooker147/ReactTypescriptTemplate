const fs = require("fs");

const isRelease = fs.readFileSync("dist/release", { encoding: "utf8" }) === "true";

const libs = [
    {
        type: "js",
        src: {
            debug: "jquery.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        },
        node: "jquery/dist"
    },
    {
        type: "js",
        src: {
            debug: "react.development.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js"
        },
        node: "react/umd"
    },
    {
        type: "js",
        src: {
            debug: "react-dom.development.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js"
        },
        node: "react-dom/umd"
    },
    {
        type: "css",
        src: {
            debug: "fontawesome-free/css/all.min.css",
            release: "https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        },
        node: "@fortawesome"
    }
];

module.exports = {
    libs: libs,
    
    scripts: () => libs.filter(lib => lib.type === "js").map(lib =>
        `<script src="${isRelease ? lib.src.release : lib.src.debug}"></script>`
    ).join(""),

    links: () => libs.filter(lib => lib.type === "css").map(lib =>
        `<link rel="stylesheet" href="${isRelease ? lib.src.release : lib.src.debug}" />`
    ).join("")
};