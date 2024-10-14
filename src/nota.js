import { tile00PositionX, tile00PositionY,  tileDiffX, tileDiffY } from "./tileData.js";
import {deltaTime, clockInstance} from "./combatScene.js"

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
    /** Contiene la velocidad en compases por beat */
    speed;
    //Dirección hacia la que avanza la nota
    direction;
    /**
     * 
     * @param {*} scene la escena en la que se genera la nota
     * @param {*} posX x de la casilla en la que se genera la nota
     * @param {*} posY y de la casilla en la que se genera la nota
     * @param {*} notaNumber 0 para corchea, 1 para negra y 2 para blanca
     * @param {*} direction 1 si es la lanza el jugador, -1 si la lanza el enemigo
     */
    constructor(scene, posX, posY, tipoNota, direction){
        super(scene, tile00PositionX(), tile00PositionY(), notas[tipoNota].name);
        scene.add.existing(this);
        this.setScale(3,3);
        this.setOrigin(0,0.66);

        this.x = tile00PositionX() + posX * tileDiffX();
        this.y = tile00PositionY() + posY * tileDiffY();
        this.tipoNota = notas[tipoNota];
        this.speed = 1;
        this.direction = direction;
    }

    preUpdate(){
        this.MoveForward();
    }

    /**Move forward the note until it gets out of board*/
    MoveForward(){
        /** @todo Habrá que buscar una manera de implementar el delta time que no implique ponerle contadores a todas las notas
         */
        this.x += this.direction * deltaTime/1000 *((this.speed * tileDiffX()) / (clockInstance.delayTimer/1000));
        //Si se sale por la derecha destruir (o igual esto es mejor hacerlo con un trigger en esa zona)
        /**@todo investigar si hacer con un trigger en vez de por coordenadas */
        if(this.x > tile00PositionX() + 6.3 * tileDiffX()){
            this.destroy();
        }
    }
}