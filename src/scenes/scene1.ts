import * as Phaser from 'phaser';
import { config } from '../game';
import { GamePlayer } from '../objects/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game'
};

const gameConfig = {
    playerXSpeed: 160,
    playerYSpeed: 330,
    numberOfAids: 5
}

export class Scene1 extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    constructor() {
        super(sceneConfig);
    }


    private player: Phaser.Physics.Arcade.Sprite;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private stars: Phaser.Physics.Arcade.Group;
    private bombs: Phaser.Physics.Arcade.Group;

    private score = 0;
    private scoreText: Phaser.GameObjects.Text;
    private gameOver: boolean;

    public create() {
        this.add.image(400, 300, 'sky');

        this.buildPlatforms();

        this.player = new GamePlayer(this);

        this.physics.add.collider(this.player, this.platforms);

        // this.buildAnimation();

        // this.buildStars(collectStar);

        function collectStar(player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                this.addEnemy();
            }
        }

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // this.buildBombs();
        // this.addEnemy();
    }

    private addEnemy() {
        let x: number = Phaser.Math.Between(400, 800);
        if (this.player != null)
            x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'covid');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    private buildBombs() {
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
        function hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.gameOver = true;

            this.scene.start('GameOver', this.score);
        }
    }

    private buildStars(collectStar: (player: any, star: any) => void) {
        this.stars = this.physics.add.group({
            key: ['facemask', 'handsanitizer'],
            repeat: gameConfig.numberOfAids - 1,
            setXY: { x: 50, y: 0, stepX: 70 }
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    }

  

  
    private buildPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }

    public preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('covid', 'assets/images/covid.png');
        this.load.image('facemask', 'assets/images/facemask.png');
        this.load.image('handsanitizer', 'assets/images/hand_sanitizer.png');

        this.load.spritesheet('dude',
            'assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    public update() {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.left.isDown) {
            this.player.setVelocityX(- gameConfig.playerXSpeed);

            this.player.anims.play('left', true);
        }
        else if (cursorKeys.right.isDown) {
            this.player.setVelocityX(gameConfig.playerXSpeed);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (cursorKeys.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-gameConfig.playerYSpeed);
        }
    }
}



