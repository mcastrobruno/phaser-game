import * as Phaser from 'phaser';
import { PowerUp } from '../objects/powerUp';
import { GridScene } from '../scenes/GridScene';


export class GamePlayer extends Phaser.Physics.Arcade.Sprite {

    public activePowerUp: PowerUp;
    public handPowerUpBuffer: number = 0;
    public maskPowerUpBuffer: number = 0;

    private countBuffer: boolean = false;

    constructor(scene: GridScene) {
        super(scene, 0, 0, 'dude')

        scene.add.existing(this);

        scene.alignGrid.placeAtIndex(45, this);
        scene.physics.add.existing(this);



        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.buildAnimation();
    }


    private buildAnimation() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    public CollectStar() {
        this.handPowerUpBuffer++;
        this.maskPowerUpBuffer++;
    }

    public AddPowerUp(powerup: PowerUp) {
        this.activePowerUp = powerup;
        this.setTint(0xFFEF04);

        var tween = this.scene.tweens.add({
            targets: this,
            ease: 'Power1',
            duration: 200,
            alpha: 0.3,
            repeat: 10,
            yoyo: true,
            onComplete: function () {
                this.player.activePowerUp = null;
                this.player.clearTint();
                this.maskPowerUpBuffer = 0;
                this.handPowerUpBuffer = 0;
            },
            callbackScope: this.scene
        });

    }

    public RemovePowerUp() {

        this.alpha = 0.2;
        this.clearTint();

        var tween = this.scene.tweens.add({
            targets: this,
            ease: 'Power1',
            duration: 1500,
            alpha: 1,
            repeat: 0,
            onComplete: function () {
                this.player.hasPowerUp = false;
            },
            callbackScope: this.scene
        });

    }

}