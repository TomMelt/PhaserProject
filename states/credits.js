var Credits = function(game) {};

Credits.prototype = {
    
    menuConfig: {
        startY: game.world.height * 0.7,
        startX: game.world.width * 0.1
    },
    
    init: function () {
        this.screenTitle = game.make.sprite(game.world.width * 0.1, game.world.height * 0.1, "credits-title");
        this.optionCount = 1;
        this.creditCount = 0;
    },

    addCredit: function(task, author) {
        
        var defaultColor = "#c8371b",
            highlightColor = "#810000";

        
        var authorStyle = { 
            font: '40pt SF Compact rounded',
            fill: defaultColor, 
            align: 'center'
        };
        
        var taskStyle = { 
            font: '24pt SF Compact rounded',
            fill: defaultColor, 
            align: 'center'
        };
        
        var authorText = game.add.text(game.world.centerX, game.world.height+100, author, authorStyle);
        var taskText = game.add.text(game.world.centerX, game.world.height+150, task, taskStyle);
        
        authorText.anchor.setTo(0.5);
        taskText.anchor.setTo(0.5);
        
        game.add.tween(authorText).to( { y: this.creditCount * 100 + 200 }, 5000, Phaser.Easing.Cubic.Out, true, this.creditCount * 7000);
        
        game.add.tween(taskText).to( { y: this.creditCount * 100 + 250 }, 5000, Phaser.Easing.Cubic.Out, true, this.creditCount * 7000);
        
        this.creditCount ++;
    },

    create: function () {
        
        if (gameOptions.playMusic) {
            music.stop();
            gameOptions.songTitle = 'credit-music';
            music = game.add.audio(gameOptions.songTitle);
            music.play();
        }
        
        game.stage.disableVisibilityChange = true;
        var bg = game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.screenTitle);
        
        this.addCredit('MUSIC', 'Eric Skiff');
        this.addCredit('DEVELOPER', 'Melt');
        this.addCredit('GAME ENGINE', 'Phaser.io');
        
        this.addMenuOption('Return', function () {
            game.state.start("GameMenu");
            music.stop();
        });
        
        //fade bg out
//        game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
    }

};

Phaser.Utils.mixinPrototype(Credits.prototype, mixins);
