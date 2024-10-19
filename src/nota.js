import { Tile00PositionX, Tile00PositionY,  TileDiffX, TileDiffY } from "./tileData.js";
import {deltaTime, clockInstance} from "./combatScene.js"
import NotesEffects from "./NotasEffects.js";

const notas = {
    0:{
        name: "corchea"
    },
    1 : {
        name: "negra"
    },
    2 : {
        name: "blanca"
    }
};

export default class Nota extends Phaser.GameObjects.Sprite{
    /** Contiene uno de los objetos de notas (la array-like object de arriba) */
    tipoNota;
    // Contiene la velocidad en compases por beat, 
    speed;
    //Dirección hacia la que avanza la nota
    direction;
    /**
     * @param {*} scene la escena en la que se genera la nota
     * @param {*} posX x de la casilla en la que se genera la nota
     * @param {*} posY y de la casilla en la que se genera la nota
     * @param {*} tipoNota 0 para corchea, 1 para negra y 2 para blanca
     * @param {*} direction 1 si es la lanza el jugador, -1 si la lanza el enemigo
     */
    constructor(scene, posX, posY, tipoNota, direction){
        super(scene, Tile00PositionX(), Tile00PositionY(), notas[tipoNota].name);
        scene.add.existing(this);
        this.setScale(2,2);
        this.setOrigin(0,0.75);

        this.x = Tile00PositionX() + posX * TileDiffX();
        this.y = Tile00PositionY() + posY * TileDiffY();
        this.tipoNota = notas[tipoNota];
        this.speed = 1;
        this.silent=0;
       
        this.direction = direction;
        
        
        //takes the event postupdate from the scene and makes this function postUpdate be called when received
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this));
        this.scene.events.on('postupdate', this.PostUpdate.bind(this));
 
    }

    //After each update moves note forward
    //this needs to be done because deltaTime is not defined until the first update

    PostUpdate(){
        if(!this.silent) this.MoveForward();
 
    }

    /**Move forward the note until it gets out of board*/
    MoveForward(){
        /** @todo Habrá que buscar una manera de implementar el delta time que no implique ponerle contadores a todas las notas
         */
        this.x += this.direction * deltaTime/1000 *((this.speed * TileDiffX()) / (clockInstance.delayTimer/1000));
        //Si se sale por la derecha destruir (o igual esto es mejor hacerlo con un trigger en esa zona)
        /**@todo investigar si hacer con un trigger en vez de por coordenadas */
        if(this.x > Tile00PositionX() + 6.3 * TileDiffX()){
            this.destroy();
        }
    }
   
    
    BeatFunction()
    {
        if(this.silent > 0) this.silent--;
    }
    AddKeyword(config){
        Object.keys(config).forEach(key => {
            console.log(config[key]);
            NotesEffects[key].apply(this, config[key]);
            //const value = object[key];
        });       
    }
}