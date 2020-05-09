import * as Phaser from 'phaser';
import { Scene1 } from './scenes/scene1';
import { Menu } from './scenes/menu'
import { GameOver } from './scenes/endGame'

export const config: Phaser.Types.Core.GameConfig = {
    title: 'Flappy Bozo',
    scene: [Scene1, GameOver, Menu],
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