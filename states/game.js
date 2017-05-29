var Game = function(game) {};
var player;
var playerRunSpeed = 300;
var playerJumpSpeed = 500;
var enemies;
var enemySpeed=100;
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

        game.world.setBounds(0, 0, 2400, 1920); // modify the world and camera bounds

        bg = game.add.sprite(0, 0, 'game-bg');
//        bg.fixedToCamera = true;
        
        map = this.add.tilemap('map',32,32);
        
        map.addTilesetImage('tileset');
        
        map.setTileIndexCallback(8,this.climbLadder,this);
        
        map.setTileIndexCallback(0,this.reverseEnemy,this);
        
        layer = map.createLayer(0);
        
//        layer.resizeWorld();
        
        map.setCollisionBetween(16,23);

//        player = game.add.sprite(3 * 32, 45 * 32, 'dude');
        player = game.add.sprite(32, 500, 'dude');
        game.physics.arcade.enable(player); 
        
        // player properties
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);

        missionItems = game.add.group();
        missionItems.enableBody = true;
        
        var xpos = [7 ,3 ,39,54,72];
        var ypos = [17,26,57,39,35];
        
        for (var i = 0; i < xpos.length; i++)
        {
            var missionItem = missionItems.create(xpos[i] * 32, (ypos[i]-1) * 32, 'missionItem');
            missionItem.body.gravity.y = 100;
            missionItem.body.bounce.y = 1;
        }
        
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.createEnemies();
        
        //  The score
        scoreText = game.add.text(16, 16, 'Complete: 0%', { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;
        
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        this.addMenuOption('Quit', function () {
            score = 0;
            game.state.start("GameOver");
            game.world.setBounds(0, 0, 800, 640);
        });
    },

    update: function () {
        //  Collide the player and the missionItems with the platforms
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(missionItems, layer);
        game.physics.arcade.collide(enemies, layer);
        
        //check for overlap
        game.physics.arcade.overlap(player, missionItems, this.collectMissionItem, null, this);
        game.physics.arcade.overlap(player, enemies, this.hitEnemy, null, this);
        
        this.levelComplete();

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.gravity.y = 1000;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -playerRunSpeed;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = playerRunSpeed;
            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.onFloor()){
            player.body.velocity.y = -playerJumpSpeed;
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
    
    hitEnemy: function (player, enemy) {

        // Removes the missionItem from the screen
        player.kill();
        score = 0;
        game.state.start("GameOver");
        game.world.setBounds(0, 0, 800, 640);

    },
    
    createEnemies: function () {
        
        xpos = [12,40,47];
        ypos = [44,29,49];
        
        for (var i = 0; i < xpos.length; i++)
        {
            var enemy = enemies.create(xpos[i] * 32, ypos[i] * 32, 'enemy');
            enemy.animations.add('left', [0, 1, 2, 3], 10, true);
            enemy.animations.add('right', [5, 6, 7, 8], 10, true);
            
            enemy.animations.play('left');
            enemy.body.velocity.x = -enemySpeed;
            enemy.body.gravity.y = 100;
        }
        
    },
    
    reverseEnemy: function (enemy) {
        if(enemy.animations.name == 'left'){
            enemy.animations.play('right');
            enemy.body.velocity.x = enemySpeed;
        } else {
            enemy.animations.play('left');
            enemy.body.velocity.x = -enemySpeed;
        }
    },
    
    levelComplete: function () {

        if(score == 100){
            score = 0;
            game.state.start("GameWin");
            game.world.setBounds(0, 0, 800, 640);
        }

    },
    
    climbLadder: function () {
        player.body.gravity.y = 0;
        if (cursors.up.isDown){
            player.body.velocity.y = -playerRunSpeed;
        }
        else if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -playerRunSpeed;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = playerRunSpeed;
            player.animations.play('right');
        }
    }
    
};

Phaser.Utils.mixinPrototype(Game.prototype, mixins);