import * as Phaser from 'phaser';
import { GamePlayer } from '../objects/player';
import { Platform } from '../objects/platform';
import { Stars } from '../objects/stars';
import * as PowerUp from '../objects/powerUp';
import { ScoreManager } from '../coordinator/scoreManager';
import { EventDispatcher } from '../events/eventDispatcher';
import { EventType } from '../events/eventTypes';
import { AlignGrid } from '../form/alignGrid';

export class GridScene extends Phaser.Scene {

    public alignGrid: AlignGrid;

    constructor(config: Phaser.Types.Scenes.SettingsConfig | string) {
        super(config);

    }


    public preload() {
        this.alignGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
        this.alignGrid.showNumbers();
    }

}

