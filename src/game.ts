import * as Phaser from 'phaser';
import { Scene1 } from './scene1';
import { Menu } from './menu'

export const config: Phaser.Types.Core.GameConfig = {
    title: 'Flappy Bozo',
    scene: [Menu, Scene1],
    type: Phaser.AUTO,

    scale: {
        width: 800,
        height: 600,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },

    backgroundColor: '#000000',
};

export const game = new Phaser.Game(config);