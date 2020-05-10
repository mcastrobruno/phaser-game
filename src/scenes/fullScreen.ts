import * as Phaser from 'phaser';

export class FullScreen extends Phaser.Scene {

    constructor() {
        super("FullScreen");
    }


    private yesButton: Phaser.GameObjects.Text;
    private noButton: Phaser.GameObjects.Text;

    public create() {



        // this.yesButton = this.add.text(270, 200, 'YES', { fontSize: '32px', fill: '#ff0000' })
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         this.game.scale.startFullscreen();
        //     });

        // this.noButton = this.add.text(400, 200, 'NO', { fontSize: '32px', fill: '#ff0000' })
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         this.game.scale.stopFullscreen();
        //         this.scene.switch('Game');
        //     });

        this.add.text(270, 100, 'Full Screen?', { fontSize: '32px', fill: '#ff0000' });
    }


}



