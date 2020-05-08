import * as Phaser from 'phaser';
import {Scene1} from './scene1';

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Flappy Bozo',
    scene: Scene1,
    type: Phaser.AUTO,

    scale: {
        // width: window.innerWidth,
        // height: window.innerHeight,
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

    parent: 'game',
    backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);