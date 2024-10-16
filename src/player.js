import Instrumento from "./instrumento.js"
import { tile00PositionX, tile00PositionY,  tileDiffX, tileDiffY } from "./tileData.js";
import { clockInstance } from "./combatScene.js";
/**
 * Cambiar la clase Player por la clase character
 * Luego player y enemy heredan de la clase character
 */


//Clase player tiene todas las funciones de movimiento, toca instrumentos y demás
//extiende de sprite para usar su cuerpo físico y cambiar la posición y animaciones del personaje según sus acciones
export default class Player extends Phaser.GameObjects.Sprite{
    //Player.GameObjects.Sprite tiene una propiedad scene a la que podemos llamar para hacer referencia a la escena actual

    /** La posición en casillas del player, la casilla (0,0) es arriba a la izquierda*/
    position;
    /** Las posiciones extremo a las que el player se puede mover de forma natural
     *  Con estos valores podría estar en cualquier casilla entre (minX,minY) y (maxX,maxY) --> (0,0) y (2,4)
     */
    limitPositions;
    /**Contiene los 3 instrumentos del player */
    instrumentos;
    /**
     * @param {*} scene la escena en la que está el personaje
     */
    constructor(scene, instrumento1 = undefined, instrumento2 = undefined, instrumento3 = undefined){
        //Crea un sprite con el valor de la escena y la posición inicial del player y la textura de nuestro personaje
        super(scene, tile00PositionX(), tile00PositionY(), 'sawa');
        //Añade este sprite a la escena
        scene.add.existing(this);
        this.position = {
            x: 1,
            y: 2
        };        
        this.limitPositions = {
            minX:0,
            minY:0,
            maxX:2,
            maxY:4
        };
        this.UpdatePos();
        /**@todo incluir los instrumentos correspondientes */
        this.instrumentos = [instrumento1, instrumento2, instrumento3];
    
        //clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this))
    }
    /**
     * 
     * @param {*} x las posiciones a mover al player hacia la derecha
     * @param {*} y las posiciones a mover al player hacia abajo
     */
    Move(xAdd, yAdd){
        if(clockInstance.isTempo()) this.Syncopate();

        this.lastPress = new Date();
        //Cambia la posición en x del player y hace que los limites para moverse horizontalmente sean las casillas definidas en limitPositions
        this.position.x = Math.max(this.limitPositions.minX,Math.min(this.limitPositions.maxX,this.position.x+xAdd));
        //Cambia la posición en y del player y hace que los limites para moverse verticalmente sean sean las casillas definidas en limitPositions
        this.position.y = Math.max(this.limitPositions.minY,Math.min(this.limitPositions.maxY,this.position.y+yAdd));
        //actualiza la posición del sprite
        this.UpdatePos();
    }
    /**
     * Actualiza la posición del sprite del player respecto a su posición actual
     * @todo hacer que el movimiento no sea inmediato, si no que se deslice rapidamente hasta su nueva posición actual
     */
    UpdatePos(){
        this.x = tile00PositionX() + this.position.x * tileDiffX();
        this.y = tile00PositionY() + this.position.y * tileDiffY();
    }

    PlayInstrument(numeroInstrumento){
        //console.log(this.instrumentos[numeroInstrumento].CanBePlayed);
        if(this.instrumentos[numeroInstrumento]!=undefined && this.instrumentos[numeroInstrumento].CanBePlayed()){
            if(clockInstance.isTempo()) 
                this.Tempo();
            this.instrumentos[numeroInstrumento].Play(this.scene, this.position.x, this.position.y);
        }


    }

    /**Produce todos los efectos de syncopate al moverse al ritmo*/
    Syncopate(){
        console.log("syncopate");
    }
    /**Produce todos los efectos no específicos de instrumentos al tocar al ritmo */
    Tempo(){
        console.log("tempo");
    }
}