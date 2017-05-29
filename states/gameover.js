var GameOver = function() {};


GameOver.prototype = {

    menuConfig: {
        startY: game.world.height * 0.4,
        startX: game.world.width * 0.1
    },

    init: function () {
        this.gameoverTitle = game.make.sprite(game.world.width * 0.1, game.world.height * 0.1, "gameover-title");
        this.optionCount = 1;
    },

    create: function () {
        
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'gameover-bg');
        game.add.existing(this.gameoverTitle);

        this.addMenuOption('Play Again', function () {
        game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function () {
        game.state.start("GameMenu");
        });
    }
    
};

Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
