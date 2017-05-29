var Game = function(game) {};
var player;
var platforms;
var cursors;
var bg;

var missionItems;
var score = 0;
var scoreText;

var map;
var layer;

Game.prototype = {
    
    menuConfig: {
        startY: -80,
        startX: game.world.width * 0.87
    },

    init: function () {
        this.optionCount = 1;
    },
    
    create: function () {
        
        game.stage.disableVisibilityChange = true;
    
        game.physics.startSystem(Phaser.Physics.ARCADE); // enable arcade Physics

        game.world.setBounds(0, 0, 1600, 600); // modify the world and camera bounds

        bg = game.add.sprite(0, 0, 'game-bg'); //  A simple background for our game
        bg.fixedToCamera = true;

        platforms = game.add.group(); // make group for all ledges
        platforms.enableBody = true; //enable physics for group

        var ground = platforms.create(0, game.world.height-32, 'ground');
        ground.scale.setTo(3, 1);
        ground.body.immovable = true;

        // Now let's create two ledges
        var ledge = platforms.create(400, 450, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 350, 'ground');
        ledge.body.immovable = true;

        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player); //enable physics for player
//
        // player properties
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);

        missionItems = game.add.group(); // group of missionItems to collect
        missionItems.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 5; i++)
        {
            var missionItem = missionItems.create(i * 70, 0, 'missionItem');
            missionItem.body.gravity.y = 600;
            missionItem.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = game.add.text(16, 16, 'Complete: 0%', { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        this.addMenuOption('Quit', function () {
            game.state.start("GameOver");
        });
    },

    update: function () {
        //  Collide the player and the missionItems with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(missionItems, platforms);

        //  Checks to see if the player overlaps with any of the missionItems, if he does call the collectMissionItem function
        game.physics.arcade.overlap(player, missionItems, this.collectMissionItem, null, this);
        
        this.LevelComplete(score);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -500;
        }

    },

    render: function () {

//        game.debug.cameraInfo(game.camera, 32, 32);

//        game.debug.bodyInfo(player, 32, 32);

    },

    collectMissionItem: function (player, missionItem) {

        // Removes the missionItem from the screen
        missionItem.kill();

        //  Add and update the score
        score += 20;
        scoreText.text = 'Complete: ' + score + '%';

    },
    
    LevelComplete: function (score) {

        if(score == 100){
            score = 0;
            game.state.start("GameWin");
        }

    }
};

Phaser.Utils.mixinPrototype(Game.prototype, mixins);