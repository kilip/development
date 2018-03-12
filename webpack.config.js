var Encore = require('@symfony/webpack-encore');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var Dotenv = require('dotenv-webpack');
var fs = require('fs');
var envFile = function(){
    var file = './.env';
    if(!fs.existsSync(file)){
        file = './.env.dist';
    }
    return file;
};
Encore
    .addPlugin(new LiveReloadPlugin())
    .addPlugin(new Dotenv({
        path: envFile(),
        systemvars: true,
    }))

    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .enableSourceMaps(!Encore.isProduction())

    .enableReactPreset()

    .addEntry('js/siap','./src/Frontend/Resources/public/js/index.js')
;

const themeConfig = Encore.getWebpackConfig();
themeConfig.name = "frontend";
Encore.reset();

Encore
    .addPlugin(new LiveReloadPlugin())
    .addPlugin(new Dotenv({
        path: envFile(),
        systemvars: true,
    }))

    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .enableSourceMaps(!Encore.isProduction())
    .enableSassLoader()

    .addStyleEntry('css/siap','./public/bundles/parokifrontend/sass/main.scss')
;
const styleConfig = Encore.getWebpackConfig();
styleConfig.name = 'style';

module.exports = [themeConfig,styleConfig];
