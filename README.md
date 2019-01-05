# React TypeScript Template
Sample template for React using TypeScript and webpack.

# Packages
This template project includes following packages:
- Webpack Dev Server
- URL and File Loader
- SASS (and CSS minifier for production)
- HTML Template
- Font Awesome (Free Version)
- JQuery

# Scripts
- npm install => Required for first time use. Installs all required packages (surprisingly)
- npm start => Launching development server
- npm run-script build => Building the entire project to dist/build
- npm run-script start-https => HTTPS Development Server (read below)

# HTTPS Development Server
HTTPS Dev server configuration is supported with npm scripts. Before you start using HTTPS connection you must first create self-signed certificates for your dev server to use. You can either use the batch file script-make-certificates that will automatically generate certificates using OpenSSL for you (note that you need to have OpenSSL installed on your system).
You can also make them yourself if you like. By default files "serverkey.pem" and "servercert.pem" must be present within the certs folder. If you wish to change dev server https configuration, you can do so in webpack.config.js down in the devServer section.

Then simply start the dev server using "npm run-script start-https" or script-start-https batch file.

# JQuery
jQuery is included with this project, though you dont have to or need to use it. As React itself states, it's not recommended to use libraries like jQuery with React, but sometimes it's just easier to use jQuery for things like lazy animations and so on. Use it at your own risk. 

# Windows Scripts
You can also use script by simply running the batch files if you're too lazy to issue them yourself.

# Visual Studio Code
There also some VS Code shortcuts included. This whole project has been made for VS Code as it has a nice support for TypeScript and JS alike. These shortcuts are NewReactComponent, NewReactFuncComponent, ImportEverythingAs, ImportReact and ImportReactDOM.

# Code Style
Everything goes to next line. Tab is 4 spaces wide. All files starts with capital letters and double quotes are preferred over single quotes.

# Basically
Yeah, basically a already done copy of https://www.typescriptlang.org/docs/handbook/react-&-webpack.html with preset configurations and settings.

# License
Free for use for anyone, yay