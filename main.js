// Global Variables
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game'), Main = function () {}, gameOptions = { playSound: true, playMusic: true, songTitle: ''};


Main.prototype = {

    preload: function () {
        game.load.image('splash-bg', 'assets/images/sky.png');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('loadingbg', 'assets/images/loadingbg.png');
        game.load.image('brand', 'assets/images/studio.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('splash', 'states/splash.js');
    },

    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }

};

game.state.add('Main', Main);
game.state.start('Main');
