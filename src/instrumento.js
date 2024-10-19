import Nota from "./nota.js"
import { clockInstance } from "./combatScene.js";

export default class Instrumento{
    sceneRef;
    nombre = "default";
    numeroNotas = 1;
    notePositionMod = {x:0,y:0};
    tipoNotas = 1;
    actualCooldown = 0;
    baseCooldown = 0;
    noteKeywords={};
    /**
     * @param instrumentConfig el instrumento de la base de datos con todos los parametros
     */
    constructor(scene, instrumentConfig){
        this.sceneRef = scene;
        Object.keys(instrumentConfig).forEach(key => {
            this[key] = instrumentConfig[key];
            //const value = object[key];
        });
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this));
    }

    /**
     * Toca este instrumento
     * @param {*} scene escena en la que se van a spawnear las notas
     * @param {*} posX posicion en X desde donde se toca el instrumento
     * @param {*} posY posición en Y desde donde se toca el instrumento
     */
    Play(posX, posY){
        //Sets the cooldown
        this.actualCooldown = this.baseCooldown;
        this.ProducirNotas(posX, posY);

        //Previene que se generen notas fuera del tablero
        
    }

    ProducirNotas(posX, posY){
        this.ThrowNotes(posX,posY);
        if(this.numeroNotas > 1){
            this.sceneRef.time.addEvent({delay: clockInstance.delayTimer/this.numeroNotas, repeat:(this.numeroNotas-2), callback: this.ThrowNotes, args: [posX,posY], callbackScope: this});
        }
    }
    ThrowNotes(posX, posY){
        this.SpawnNotes(posX+this.notePositionMod.x, posY+this.notePositionMod.y, this.tipoNotas);
    }
    SpawnNotes(posX,posY, tipoNotas){

        if(posY < 5 && posY >= 0){
            new Nota(this.sceneRef, posX, posY, tipoNotas, 1).AddKeyword(this.noteKeywords);
        }

    }


    BeatFunction(){
        this.actualCooldown--;
    }

    /**returns if the cooldown of this instrument exists */
    CanBePlayed(){
        return (this.actualCooldown <= 0);
    }
}
