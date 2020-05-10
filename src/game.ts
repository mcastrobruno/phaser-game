import * as Phaser from 'phaser';
import { Scene1 } from './scenes/scene1';
import { Menu } from './scenes/menu'
import { GameOver } from './scenes/endGame'

export const config: Phaser.Types.Core.GameConfig = {
    title: 'Covid Fight',
    scene: [Menu, Scene1, GameOver],
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

    backgroundColor: '#000000',
};


export const game = new Phaser.Game(config);


window.addEventListener('orientationchange', (orientation) => {

    console.log('Inner Width' + window.innerWidth);
    console.log('Inner Height' + window.innerHeight);

    if (window.innerHeight < window.innerWidth)
        document.getElementById("turn").style.display = "block";
    else
        document.getElementById("turn").style.display = "none";
});

