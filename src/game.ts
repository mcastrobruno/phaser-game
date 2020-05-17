import * as Phaser from 'phaser';
import { Scene1 } from './scenes/scene1';
import { Menu } from './scenes/menu'
import { GameOver } from './scenes/endGame'
import { FullScreen } from './scenes/fullScreen';





const isMobileBrowser = navigator.userAgent.indexOf("Mobile") >= 0;

export const config: Phaser.Types.Core.GameConfig = {
    title: 'Covid Fight',
    scene: [Menu, Scene1, GameOver, FullScreen],
    type: Phaser.AUTO,
    width: !isMobileBrowser ? 480 : window.innerWidth,
    height: !isMobileBrowser ? 640 : window.innerHeight,


    scale: {
        mode: Phaser.Scale.NONE,
        parent: 'phaser-example'
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    input: {
        activePointers: 3
    },

    backgroundColor: '#000000',
};


export const game = new Phaser.Game(config);



