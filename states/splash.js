var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('gamemenu','states/GameMenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('gamewin','states/GameWin.js');
        game.load.script('gameover','states/GameOver.js');
        game.load.script('credits', 'states/Credits.js');
        game.load.script('options', 'states/Options.js');
    },

    loadBgm: function () {
        game.load.audio('dangerous', 'assets/music/ResistorAnthems2012/ResistorAnthems/04_All_of_Us.mp3');
        game.load.audio('credit-music', 'assets/music/ResistorAnthems2012/ResistorAnthemsII/We_are_all_under_the_stars.mp3');
    },
    
    loadImages: function () {
        game.load.image('menu-title', 'assets/images/title.png');
        game.load.image('gamewin-title', 'assets/images/gamewin.png');
        game.load.image('gameover-title', 'assets/images/gameover.png');
        game.load.image('credits-title', 'assets/images/credits.png');
        game.load.image('menu-bg', 'assets/images/sky.png');
        game.load.image('options-bg', 'assets/images/sky.png');
        game.load.image('gameover-bg', 'assets/images/sky.png');
        game.load.image('gamewin-bg', 'assets/images/sky.png');
        
        //level 1 images
        game.load.image('game-bg', 'assets/images/l1-bg.png');
        game.load.image('missionItem', 'assets/images/missionItem.png');
        game.load.spritesheet('dude', 'assets/images/alien.png', 32, 48);
        game.load.spritesheet('enemy', 'assets/images/enemy.png', 32, 48);
        game.load.tilemap('map','assets/maps/level1.csv');
        game.load.image('tileset','assets/maps/tilesheet.png');
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX, game.world.centerY * 1.2, "loading");
        this.loadingBarBg = game.make.sprite(game.world.centerX, game.world.centerY * 1.2, "loadingbg");
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        utils.centerGameObjects([this.logo, this.loadingBar, this.loadingBarBg]);
    },

    preload: function () {
        game.add.sprite(0, 0, 'splash-bg');
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.loadingBarBg);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadBgm();

    },

    addGameStates: function () {

        game.state.add("GameMenu",GameMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
        game.state.add("GameWin",GameWin);
        game.state.add("Credits",Credits);
        game.state.add("Options",Options);
        
    },

    create: function() {
        this.addGameStates();
        
        setTimeout(function () {
        game.state.start("GameMenu");
        }, 1000);
    }
};
