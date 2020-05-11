import * as Phaser from 'phaser';
import { GamePlayer } from '../objects/player';
import * as PowerUp from '../objects/powerUp';
import { Stars } from '../objects/stars';

import { HandSanitizerPowerUp, MaskPowerUp } from '../objects/powerUp';

export class ScoreManager {

    private stars: Stars;
    private scene: Phaser.Scene;
    private player: GamePlayer;
    private powerups: Phaser.Physics.Arcade.Group;

    private scoreText: Phaser.GameObjects.Text;
    public score: number = 0;

    private maskThreshold: number = 5;
    private handThreshold: number = 10;

    constructor(
        scene: Phaser.Scene,
        player: GamePlayer,
        stars: Phaser.Physics.Arcade.Group,
        powerups: Phaser.Physics.Arcade.Group) {

        this.scene = scene;
        this.stars = stars
        this.player = player;
        this.powerups = powerups;

        this.scoreText = this.scene.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    }

    public Start() {
        this.InitStarCollisionHandling();
        this.InitPowerUpCollisionHandling();
    }

    public AddPowerUp() {
        if (!this.player.activePowerUp && (this.powerups.children == null || this.powerups.children.size <= 0)) {

            let x: number = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            if (Math.floor(this.player.handPowerUpBuffer / this.handThreshold) > 0) {
                this.powerups.add(new HandSanitizerPowerUp(this.scene, x, 16), true);
            }
            else if (Math.floor(this.player.maskPowerUpBuffer / this.maskThreshold) > 0) {
                this.powerups.add(new MaskPowerUp(this.scene, x, 16), true);
            }
        }
    }

    private InitPowerUpCollisionHandling() {
        this.scene.physics.add.overlap(this.player, this.powerups, handlePowerUpCollection, null, this);

        function handlePowerUpCollection(player: GamePlayer, powerup) {
            this.player.AddPowerUp(powerup);
            powerup.disableBody(true, true);
            this.powerups.children.clear();
        }
    }


    private InitStarCollisionHandling() {
        this.scene.physics.add.overlap(this.player, this.stars, handleStarCollection, null, this);


        function handleStarCollection(player: GamePlayer, star) {

            player.CollectStar();
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            this.AddPowerUp();

            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });
            }
        }
    }

}