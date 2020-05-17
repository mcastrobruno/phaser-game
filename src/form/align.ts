import { game } from '../game'

export class Align {
    static scaleToGameW(obj, per) {
        obj.displayWidth = <number>game.config.width * per;
        obj.scaleY = obj.scaleX;
    }
    static centerH(obj) {
        obj.x = <number>game.config.width / 2;
    }
    static centerV(obj) {
        obj.y = <number>game.config.height / 2;
    }
    static center(obj) {
        obj.x = <number>game.config.width / 2;
        obj.y = <number>game.config.height / 2;
    }
}