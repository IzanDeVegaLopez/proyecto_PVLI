import Nota from "./nota.js";
import { clockInstance } from "./combatScene.js";
import BoardUnit from './boardUnit.js';

export default class Enemy extends BoardUnit{
    enemyActionIndex;
    enemyActions;

    currentBeatActionIndex;
    /**Hacer un constructor que reciba un objeto de forma similar al de los instrumentos */
    constructor(scene, enemyData){
        super(scene, {x:6,y:enemyData.startPosY}, enemyData.name);
        this.setOrigin();
        this.setDisplaySize(100,100);
        this.enemyActions = enemyData.enemyActions;
        this.enemyActionIndex = 0;
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this));
    }

    /**Programa las acciones del siguiente beat
     * @param {*} beatActions contains all actions of the next beat in format 
     * [
        * {
            * notes:[{
                * posY: n,
                * tipoNota: l,
            * }]
            * move:{
                * y: p
            * }
        *      
        * }
    * ]
     */
    ChargeNextBeatAction(beatActions){
        this.currentBeatActionIndex = 0;
        this.DoAction(beatActions);
        if(beatActions.length > 1){
            this.scene.time.addEvent({delay: clockInstance.delayTimer/beatActions.length, repeat:(beatActions.length-2), callback: this.DoAction, args: [beatActions], callbackScope: this});
        }
    }
    /**First moves, then spawn Notes */
    DoAction(thisBeatActions){
        this.Move(0, thisBeatActions[this.currentBeatActionIndex].move.y);
        for(let i = 0; i < thisBeatActions[this.currentBeatActionIndex].notes.length; i++){
            new Nota(this.scene, this.position.x, thisBeatActions[this.currentBeatActionIndex].notes[i].posY, thisBeatActions[this.currentBeatActionIndex].notes[i].tipoNota, -1);
        }
        this.currentBeatActionIndex++;
    }

    BeatFunction(){
        if(this.enemyActionIndex == this.enemyActions.length) {} //Mandar la señal de que se ha acabado la pantalla actual 
        else{
            this.ChargeNextBeatAction(this.enemyActions[this.enemyActionIndex]);
            this.enemyActionIndex++;
        }
    }
}