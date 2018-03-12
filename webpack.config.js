var Encore = require('@symfony/webpack-encore');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var Dotenv = require('dotenv-webpack');

Encore
    .addPlugin(new LiveReloadPlugin())
    .addPlugin(new Dotenv({
        path: './.env',
        systemvars: true,
    }))

    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .enableSourceMaps(!Encore.isProduction())

    .enableReactPreset()

    .addEntry('js/siap','./public/bundles/parokifrontend/js/index.js')

    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    // .addEntry('js/app', './assets/js/app.js')
    // .addStyleEntry('css/app', './assets/css/app.scss')

    // uncomment if you use Sass/SCSS files
    // .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    // .autoProvidejQuery()
;

const themeConfig = Encore.getWebpackConfig();
themeConfig.name = "frontend";
Encore.reset();

Encore
    .addPlugin(new LiveReloadPlugin())
    .addPlugin(new Dotenv({
        path: './.env',
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
