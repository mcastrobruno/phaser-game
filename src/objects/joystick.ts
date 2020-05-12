import * as Phaser from 'phaser';
import { PowerUp } from './powerUp';

export class Joystick extends Phaser.GameObjects.Group {

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(scene)

        this.create(scene.game.scale.gameSize.height, 200, 'buttonLeft');
        this.create(300, 200, 'buttonRight');
        this.create(400, 200, 'buttonUp');
    }
}