import * as Phaser from 'phaser';
import { config } from './game';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Menu'
};
export class Menu extends Phaser.Scene {

    constructor() {
        super(sceneConfig);
    }


    public create() {
        var text = this.add.text(300, 400, "Start Game", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 }).setInteractive();

        text.on('pointerup', function () {
            this.scene.start("Game");
        }, this);
    }

    public update() {
    }
}



