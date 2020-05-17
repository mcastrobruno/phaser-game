import * as Phaser from 'phaser';
import { GridScene } from '../scenes/GridScene';

import { Align } from '../form/align';


export class Platform extends Phaser.Physics.Arcade.StaticGroup {

    constructor(world: Phaser.Physics.Arcade.World, scene: GridScene) {
        super(world, scene)


        var ground = this.create(600, 300, 'ground').setScale(2).refreshBody();
        var platform1 = this.create(0, 0, 'ground');
        var platform2 = this.create(0, 0, 'ground');
        var platform3 = this.create(0, 0, 'ground');


        scene.alignGrid.placeAtIndex(110, ground);
        scene.alignGrid.placeAtIndex(55, platform1);
        scene.alignGrid.placeAtIndex(87, platform2);
        scene.alignGrid.placeAtIndex(54, platform3);

        Align.scaleToGameW(ground, 1.9);
    }
}