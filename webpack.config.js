var Encore = require('@symfony/webpack-encore');
var LiveReloadPlugin = require('webpack-livereload-plugin');
Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(true)

    // uncomment to create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(true)

    // uncomment to define the assets of the project
    .addEntry('js/paroki', './src/frontend/main.js')
    .addStyleEntry('css/paroki', './src/frontend/assets/css/style.scss')

    // uncomment if you use Sass/SCSS files
    .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    // .autoProvidejQuery()

    .addPlugin(new LiveReloadPlugin())

    // react integration
    .enableReactPreset()


;

var config = Encore.getWebpackConfig();

module.exports = config;
