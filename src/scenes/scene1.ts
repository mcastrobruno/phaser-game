import * as Phaser from 'phaser';
import { GamePlayer } from '../objects/player';
import { Platform } from '../objects/platform';
import { Stars } from '../objects/stars';
import * as PowerUp from '../objects/powerUp';
import { ScoreManager } from '../coordinator/scoreManager';
import { EventDispatcher } from '../events/eventDispatcher';
import { EventType } from '../events/eventTypes';
import { AlignGrid } from '../form/alignGrid';
import { GridScene } from './GridScene';
import { Align } from '../form/align';


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




export class Scene1 extends GridScene {
    brickGroup: Phaser.Physics.Arcade.Group;

    constructor() {
        super(sceneConfig);
    }

    // private player: GamePlayer;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private stars: Phaser.Physics.Arcade.Group;
    private bombs: Phaser.Physics.Arcade.Group;
    private powerups: Phaser.Physics.Arcade.Group;
    private scoreManager: ScoreManager;

    private eventEmitter: EventDispatcher;

    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;

    private resize() {
        var canvas = this.game.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }


    private player: Phaser.Physics.Arcade.Sprite;
    private grid: AlignGrid;

    public preload() {
        this.load.image('block', 'assets/images/block_resized.png');

        this.buildAnimation();
    }
    public create() {

        this.brickGroup = this.physics.add.group();

        this.player = this.physics.add.sprite(0, 0, "dude");



        this.grid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
        this.grid.showNumbers();


        this.grid.placeAtIndex(81, this.player);
        this.makeFloor(110, 120, 'block', 0.2);
        this.makeFloor(55, 58, 'block', 0.1);
        this.makeFloor(85, 87, 'block', 0.1);
        this.makeFloor(30, 32, 'block', 0.1);
        this.makeFloor(0, 3, 'block', 0.1);

        this.player.setGravityY(300);
        this.physics.add.collider(this.player, this.brickGroup)
    }

    private makeFloor(fromPosition, toPosition, key, scale?) {
        for (var i = fromPosition; i < toPosition + 1; i++) {
            this.placeBlock(i, key, scale);
        }
    }

    private placeBlock(pos, key, scale?) {
        let block = this.physics.add.sprite(0, 0, key);
        this.grid.placeAtIndex(pos, block);
        this.brickGroup.add(block);
        if (scale)
            Align.scaleToGameW(block, scale);
        block.setImmovable();
    }


    private makeController() {
        var buttonLeft = this.add.image(60, this.game.scale.width - 260, 'buttonLeft')
            .setInteractive()
            .on('pointerup', async () => {
                this.leftDown = false;
            })
            .on('pointerdown', async () => {
                this.rightDown = false;
                this.leftDown = true;
            });
        var buttonRight = this.add.image(200, this.game.scale.width - 260, 'buttonRight')
            .setInteractive()
            .on('pointerup', async () => {
                this.rightDown = false;
            })
            .on('pointerdown', async () => {
                this.leftDown = false;
                this.rightDown = true;
            });
        var buttonUp = this.add.image(700, this.game.scale.width - 260, 'buttonUp')
            .setInteractive()
            .on('pointerup', async () => {
                this.upDown = false;
            })
            .on('pointerdown', async () => {
                this.upDown = true;
            });
    }

    private createScenario() {
        // this.add.image(400, 300, 'sky');
        this.platforms = new Platform(this.physics.world, this);
    }

    private SetCollisions() {
        this.physics.add.collider(this.powerups, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        function hitBomb(player: GamePlayer, bomb: Phaser.Physics.Arcade.Sprite) {

            console.log(bomb);
            if (player.activePowerUp) {

                if (player.activePowerUp instanceof PowerUp.MaskPowerUp) {
                    player.RemovePowerUp();
                    return;
                }
                else if (player.activePowerUp instanceof PowerUp.HandSanitizerPowerUp) {
                    bomb.disableBody(true, true);
                    player.RemovePowerUp();
                    return;
                }
            }

            this.scene.pause();
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.gameOver = true;

            this.scene.start('GameOver', this.scoreManager.score);
        }
    }


    private buildAnimation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    private addEnemy() {

        var timer = this.time.addEvent({
            delay: 10000,
            callback: function () {
                let x: number = Phaser.Math.Between(400, 800);
                if (this.player != null)
                    x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = this.bombs.create(x, 16, 'covid');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            },
            callbackScope: this,
            loop: true
        });
    }

    public update() {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.left.isDown || this.leftDown) {
            this.player.setVelocityX(- gameConfig.playerXSpeed);

            this.player.anims.play('left', true);
        }
        else if (cursorKeys.right.isDown || this.rightDown) {
            this.player.setVelocityX(gameConfig.playerXSpeed);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if ((cursorKeys.up.isDown || this.upDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-gameConfig.playerYSpeed);
        }
    }
}



