import * as Phaser from 'phaser';


export class Stars extends Phaser.Physics.Arcade.Group {

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(world, scene)

        this.createFromConfig({
            key: ['star'],
            repeat: 11,
            setXY: { x: 10, y: 0, stepX: 70 }
        });
    }
}