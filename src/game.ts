import * as Phaser from 'phaser';
import { Scene1 } from './scenes/scene1';
import { Menu } from './scenes/menu'
import { GameOver } from './scenes/endGame'
import { EventDispatcher } from './events/eventDispatcher';
import { EventType } from './events/eventTypes';
import { FullScreen } from './scenes/fullScreen';

export const config: Phaser.Types.Core.GameConfig = {
    title: 'Covid Fight',
    scene: [Menu, Scene1, GameOver, FullScreen],
    type: Phaser.AUTO,


    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    input: {
        activePointers: 3
    },

    backgroundColor: '#000000',
};


export const game = new Phaser.Game(config);


var emitter = EventDispatcher.getInstance();

window.addEventListener('orientationchange', (orientation) => {

});

