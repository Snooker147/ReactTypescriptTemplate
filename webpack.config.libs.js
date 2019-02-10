const fs = require("fs");
const fsExtra = require("fs-extra");

// Paths configuration
const PathsConfig = require("./webpack.config.paths");

/** @type {"debug" | "release" | "release-no-cdn"} */
const configuration = fs.readFileSync(PathsConfig.releaseConfigName, "utf8");

const libs = [
    {
        type: "js",
        src: {
            debug: "jquery.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
            releaseFiles: [
                "jquery.slim.min.js"
            ]
        },
        node: "jquery/dist"
    },
    {
        type: "js",
        src: {
            debug: "react.development.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js",
            releaseFiles: [
                "react.production.min.js"
            ]
        },
        node: "react/umd"
    },
    {
        type: "js",
        src: {
            debug: "react-dom.development.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js",
            releaseFiles: [
                "react-dom.production.min.js"
            ]
        },
        node: "react-dom/umd"
    },
    {
        type: "js",
        src: {
            debug: "react-router.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react-router/4.3.1/react-router.min.js",
            releaseFiles: [
                "react-router.min.js"
            ]
        },
        node: "react-router/umd"
    },
    {
        type: "js",
        src: {
            debug: "react-router-dom.js",
            release: "https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.3.1/react-router-dom.min.js",
            releaseFiles: [
                "react-router-dom.min.js"
            ]
        },
        node: "react-router-dom/umd"
    },
    {
        type: "css",
        src: {
            debug: "fontawesome-free/css/all.min.css",
            release: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
            releaseFiles: [
                "fontawesome-free/css/all.min.css",
                "fontawesome-free/sprites",
                "fontawesome-free/svgs",
                "fontawesome-free/webfonts"
            ]
        },
        node: "@fortawesome"
    }
];

if(!fs.existsSync(PathsConfig.distribution))
{
    fs.mkdirSync(PathsConfig.distribution);
}

const getHTMLLinkage = (file) =>
{
    if(file.endsWith(".js"))
    {
        return `<script type="text/javascript" src="${file}"></script>` 
    }
    else if(file.endsWith(".css"))
    {
        return `<link rel="stylesheet" href="${file}" />`
    }
}

const processLibFile = (name, ret) =>
{ 
    const realFileName = `node_modules/${name}`;
    const stat = fs.statSync(realFileName);

    if(stat.isDirectory())
    {
        const files = fs.readdirSync(realFileName);

        for (const file of files) 
        {
            const names = processLibFile(`${name}/${file}`, []);
            
            for (const name of names) 
            {
                if(name.endsWith(".js") || name.endsWith(".css"))
                {
                    ret.push(name);
                }    
            }
        }

        return ret;
    }

    fsExtra.copySync(realFileName, `${PathsConfig.distribution}/${PathsConfig.thirdparty}/${name}`, { recursive: true });
    ret.push(name);

    return ret;
}

const processLib = (lib) =>
{
    if(configuration === "release-no-cdn")
    {
        let ret = [];

        for (const file of lib.src.releaseFiles) 
        {
            ret = processLibFile(`${lib.node}/${file}`, ret);
        }
        
        return ret.map(rf => getHTMLLinkage(`${PathsConfig.thirdparty}/${rf}`)).join("");
    }

    return getHTMLLinkage(`${configuration === "release" ? lib.src.release : lib.src.debug}`);
}

module.exports = {
    libs: libs,
    includes: () => libs.map(processLib).join(""),
};