import * as Phaser from 'phaser';


export class GameOver extends Phaser.Scene {

    constructor() {
        super("GameOver")
    }


    private score: string;
    public init(data: string) {
        this.score = data;
    }
    public create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const loadingText = this.add.text(screenCenterX, screenCenterY, 'GAME OVER', { fontFamily: 'test', fontSize: 90 }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY + 70, "Score: " + this.score, { fontSize: 30 }).setOrigin(0.5);
    }


}