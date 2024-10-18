import Nota from "./nota.js"
import { clockInstance } from "./combatScene.js";

export default class Instrumento{
    nombre = "default" ;
    numeroNotas = 1;
    notePositionMod = {x:0,y:0};
    tipoNotas = 1;
    actualCooldown = 0;
    baseCooldown = 0;

    /*
    /**
     * 
     * @param {*} posNotasX Posición de las notas en x respecto a la posición del jugador
     * @param {*} posNotasY Posición de las notas en y respecto a la posición del jugador
     * @param {*} numeroNotas Numero de notas generadas al tocarlo
     * @param {*} tipoNotas Tipo de las notas 0 corchea, 1 negra, 2 blanca
     * @param {*} baseCooldown Cooldown del instrumento
     
    constructor(posNotasX, posNotasY, numeroNotas, tipoNotas, baseCooldown){
        this.numeroNotas = numeroNotas;
        this.NotePositionMod = {
            x:posNotasX, 
            y:posNotasY
        };
        this.tipoNotas = tipoNotas;
        this.baseCooldown  = baseCooldown;
        this.actualCooldown = 0;
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this))
    }
        */
    /**
     * @param instrumentConfig el instrumento de la base de datos con todos los parametros
     */
    constructor(instrumentConfig){
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
    Play(scene, posX, posY){
        //Sets the cooldown
        this.actualCooldown = this.baseCooldown;
        this.ProducirNotas(scene, posX, posY);
        //Previene que se generen notas fuera del tablero
        
    }

    ProducirNotas(scene, posX, posY){
        for(let i= 0; i < this.numeroNotas; i++){
            this.ThrowNotes(scene,posX,posY);
            /**@todo Meter algún tipo de delay entre notas */
        }
    }
    ThrowNotes(scene, posX, posY){
        this.SpawnNotes(scene, posX+this.notePositionMod.x, posY+this.notePositionMod.y, this.tipoNotas);
    }
    SpawnNotes(scene,posX,posY, tipoNotas){
        if(posY < 5 && posY >= 0)
            new Nota(scene, posX, posY, tipoNotas, 1);
    }

    BeatFunction(){
        this.actualCooldown--;
    }

    /**returns if the cooldown of this instrument exists */
    CanBePlayed(){
        return (this.actualCooldown <= 0);
    }
}
