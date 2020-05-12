import * as Phaser from 'phaser';

import { FormUtil } from '../form/formUtils';


export class GameOver extends Phaser.Scene {

    constructor() {
        super("GameOver")
    }


    private score: number;
    private formUtil: FormUtil;


    public init(data: number) {
        this.score = data;
    }
    public create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(screenCenterX, screenCenterY, 'GAME OVER', { fontFamily: 'test', fontSize: 90 }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY + 70, "Score: " + this.score, { fontSize: 30 }).setOrigin(0.5);

        this.add.text(screenCenterX, screenCenterY + 150, "PLAY AGAIN", { fontFamily: 'test', fontSize: 30 })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Game');
            });
        // this.ShowForm();
    }

    private ShowForm() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });

        this.formUtil.showForm();

        this.formUtil.scaleToGameW("myText", .3);
        this.formUtil.placeElementAt(16, 'myText', true);
        this.formUtil.addChangeCallback("myText", this.textAreaChanged, this);
    }

    private textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        alert(text);
        console.log(text);
    }


}