import * as Phaser from 'phaser';
import { GamePlayer } from './player';


export class PowerUp extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey)

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }
}


export class MaskPowerUp extends PowerUp {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'facemask')
    }
}

export class HandSanitizerPowerUp extends PowerUp {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'handsanitizer')
    }
}
