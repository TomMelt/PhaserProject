var Options = function(game) {};

Options.prototype = {

    menuConfig: {
        startY: game.world.height * 0.4,
        startX: game.world.width * 0.1
    },


    init: function () {
        
        this.menuTitle = game.make.sprite(game.world.width * 0.1, game.world.height * 0.1, "menu-title");
        this.optionCount = 1;
    },

    create: function () {

        game.add.sprite(0, 0, 'options-bg');
        game.add.existing(this.menuTitle);
        
        this.addMenuOption(gameOptions.playMusic ? 'Mute Music' : 'Play Music', function (target) {
        gameOptions.playMusic = !gameOptions.playMusic;
        target.text = gameOptions.playMusic ? 'Mute Music' : 'Play Music';
        music.volume = gameOptions.playMusic ? 1 : 0;
        });
        
        this.addMenuOption(gameOptions.playSound ? 'Mute Sound' : 'Play Sound', function (target) {
        gameOptions.playSound = !gameOptions.playSound;
        target.text = gameOptions.playSound ? 'Mute Sound' : 'Play Sound';
        });
        
        this.addMenuOption('Back', function () {
            game.state.start("GameMenu");
        });
            
    }
    
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
