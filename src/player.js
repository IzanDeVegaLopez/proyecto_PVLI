import Instrumento from "./instrumento.js"
import { clockInstance } from "./combatScene.js";
import BoardUnit from './boardUnit.js';
/**
 * Cambiar la clase Player por la clase character
 * Luego player y enemy heredan de la clase character
 */


//Clase player tiene todas las funciones de movimiento, toca instrumentos y demás
//extiende de sprite para usar su cuerpo físico y cambiar la posición y animaciones del personaje según sus acciones
export default class Player extends BoardUnit{
    normalMoveLimitPos;
    /**Contiene los 3 instrumentos del player */
    instrumentos;
    /**
     * @param {*} scene la escena en la que está el personaje
     * @param {*} instrument1
     *      * @param {*} instrument2
     *      * @param {*} instrument3
     */
    constructor(scene, instrumento1 = undefined, instrumento2 = undefined, instrumento3 = undefined){
        //Crea un sprite con el valor de la escena y la posición inicial del player y la textura de nuestro personaje
        super(scene, {x:1, y:2}, 'sawa');    
        this.normalMoveLimitPos = {
            minX:0,
            minY:0,
            maxX:2,
            maxY:4
        };
        /**@todo incluir los instrumentos correspondientes */
        this.instrumentos = [instrumento1, instrumento2, instrumento3];
        //clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this))
    }
    /**
     * 
     * @param {*} xAdd las posiciones a mover al player hacia la derecha
     * @param {*} yAdd las posiciones a mover al player hacia abajo
     */
    NormalMove(xAdd, yAdd){
        if(Math.abs(Math.max(this.normalMoveLimitPos.minX,Math.min(this.normalMoveLimitPos.maxX,this.position.x+xAdd))-this.position.x) + Math.abs(Math.max(this.normalMoveLimitPos.minY,Math.min(this.normalMoveLimitPos.maxY,this.position.y+yAdd))-this.position.y)>0){
            if(this.Move(xAdd,yAdd) > 0){
                if(clockInstance.IsTempo()) this.Syncopate();
            }
        }
    }
    PlayInstrument(numeroInstrumento){
        //console.log(this.instrumentos[numeroInstrumento].CanBePlayed);
        if(this.instrumentos[numeroInstrumento]!=undefined && this.instrumentos[numeroInstrumento].CanBePlayed()){
            if(clockInstance.IsTempo()) 
                this.Tempo();
            this.instrumentos[numeroInstrumento].Play(this.position.x, this.position.y);
        }
    }

    /**Produce todos los efectos de syncopate al moverse al ritmo*/
    Syncopate(){
        /**@todo Lanzar un evento que coje todo cristo con syncopate */
        console.log("syncopate");
    }
    /**Produce todos los efectos no específicos de instrumentos al tocar al ritmo */
    Tempo(){
        console.log("tempo");
    }
}