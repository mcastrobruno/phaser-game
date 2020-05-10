import * as Phaser from 'phaser';
import { GamePlayer } from '../objects/player';
import { Platform } from '../objects/platform';
import { Stars } from '../objects/stars';
import * as PowerUp from '../objects/powerUp';
import { ScoreManager } from '../coordinator/scoreManager';
import { EventDispatcher } from '../events/eventDispatcher';
import { EventType } from '../events/eventTypes';

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

    constructor() {
        super(sceneConfig);
    }

    private player: GamePlayer;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private stars: Phaser.Physics.Arcade.Group;
    private bombs: Phaser.Physics.Arcade.Group;
    private powerups: Phaser.Physics.Arcade.Group;
    private scoreManager: ScoreManager;


    public OrientationChanged(orientation: string) {
        if (orientation == "landscape") {
            alert('OK SIR');

        }
        else {
            alert('Stop doing shit');
        }
    }


    private eventEmitter: EventDispatcher;

    public create() {
        this.eventEmitter = EventDispatcher.getInstance();

        this.eventEmitter.on(EventType.OrientationChanged, (data: any) => {
            if (data == "portrait") {
                this.scene.pause();
            }

            else {
                if (!this.game.scale.isFullscreen)
                    this.game.scale.toggleFullscreen();
                    
                this.scene.resume();
            }

        });


        this.createScenario();
        this.player = new GamePlayer(this);
        this.stars = new Stars(this.physics.world, this);
        this.bombs = this.physics.add.group();
        this.powerups = this.physics.add.group();
        this.scoreManager = new ScoreManager(this, this.player, this.stars, this.powerups);

        this.SetCollisions();
        this.addEnemy();
        this.scoreManager.Start();
    }


    private createScenario() {
        this.add.image(400, 300, 'sky');
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

            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.gameOver = true;

            // this.scene.start('GameOver', this.score);
        }
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



