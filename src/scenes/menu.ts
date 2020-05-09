import * as Phaser from 'phaser';
import { config } from '../game';

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


        this.scene.start("Game");
    }

    public preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('covid', 'assets/images/covid.png');
        this.load.image('facemask', 'assets/images/facemask.png');
        this.load.image('handsanitizer', 'assets/images/hand_sanitizer.png');

        this.load.spritesheet('dude',
            'assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
}



