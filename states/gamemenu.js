var GameMenu = function() {};

GameMenu.prototype = {

    menuConfig: {
        startY: game.world.height * 0.4,
        startX: game.world.width * 0.1
    },

    init: function () {
        this.menuTitle = game.make.sprite(game.world.width * 0.1, game.world.height * 0.1, "menu-title");
        this.optionCount = 1;
    },

    create: function () {

        if (gameOptions.songTitle !== 'dangerous' && gameOptions.playMusic) {
            gameOptions.songTitle = 'dangerous';
            music = game.add.audio(gameOptions.songTitle);
            music.loop = true;
            music.play();
        }
        
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.menuTitle);
        
//        game.state.start("Game");

        this.addMenuOption('Play', function () {
        game.state.start("Game");
        });
        this.addMenuOption('Options', function () {
        game.state.start("Options");
        });
        this.addMenuOption('Credits', function () {
        game.state.start("Credits");
        });
    },
    
    render: function () {

//        game.debug.cameraInfo(game.camera, 32, 32);

    }
    
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
