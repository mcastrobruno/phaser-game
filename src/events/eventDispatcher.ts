import * as Phaser from 'phaser';
import { EventType } from './eventTypes';

let instace = null;

export class EventDispatcher extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }


    static getInstance(): EventDispatcher {
        if (instace == null)
            instace = new EventDispatcher();

        return instace;
    }

    public emit(type: EventType, data: any): boolean {

        return super.emit(type, data);
    }
}





