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
    .enableSassLoader()

    .enableReactPreset()
    .addStyleEntry('css/siap','./src/Frontend/Resources/public/sass/siap.scss')
    .addEntry('js/siap','./src/Frontend/Resources/public/js/index.js')

    .addStyleEntry('css/loader','./src/Frontend/Resources/public/loader/head.scss')
    .addEntry('js/head','./node_modules/headjs/dist/1.0.0/head.js')
    .addEntry('js/loader','./src/Frontend/Resources/public/loader/head.js')
;

const siapConfig = Encore.getWebpackConfig();
siapConfig.name = "siap";
Encore.reset();

Encore
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

    .addStyleEntry('css/theme','./src/Frontend/Resources/public/sass/theme.scss')
    .addStyleEntry('css/coming-soon','./src/Frontend/Resources/public/sass/coming-soon.scss')

    .addEntry('js/jquery','./node_modules/jquery/dist/jquery.js')

    .addEntry('js/coming-soon',[
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        './node_modules/vide/dist/jquery.vide.js',
        './src/Frontend/Resources/public/coming-soon/main.js',
    ])

    .autoProvidejQuery()
;
const themeConfig = Encore.getWebpackConfig();
themeConfig.name = 'theme';

module.exports = [siapConfig,themeConfig];
