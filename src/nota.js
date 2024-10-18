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
    /** Contiene la velocidad en compases por beat, 
     * usando basespeed y speed para calculos  */
    basespeed;
    speed;
    //Dirección hacia la que avanza la nota
    direction;
    //La cantidad de daño de veneno que contiene la nota
    earworm;
    //cantidad de tiempo que se queda parado (Se llama silencio en el GDD)
    silent;
    /**También creo una variable de quedarse quieto 
    y hasta que se acabe el tiempo, el speed será 0*/
    //booleanos para velocidad
    allergo;
    adagio;
    // notas fantasma
    piano;
    // notas destuctoras (al colisionar con enemigas las destruyen)
    forte;
    //copiar efectos al colisionar
    acompañamiento;
    /**
     * @param {*} scene la escena en la que se genera la nota
     * @param {*} posX x de la casilla en la que se genera la nota
     * @param {*} posY y de la casilla en la que se genera la nota
     * @param {*} tipoNota 0 para corchea, 1 para negra y 2 para blanca
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
        this.earworm =0;
        this.silent=0;
        this.piano=false;
        this.forte=false;
        this.acompañamiento=false;
        
        //takes the event postupdate from the scene and makes this function postUpdate be called when received
        this.scene.events.on('postupdate', this.postUpdate.bind(this));
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this))
    }

    //After each update moves note forward
    //this needs to be done because deltaTime is not defined until the first update
    postUpdate(){
        if (this.silent<1) this.MoveForward(); 

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
    /* ChangePoison se usa tanto para añadir como para quitar 
    el efecto de veneno */
    AddEarworm( cantidad)
    {
        this.earworm+=cantidad;

    }
   RemoveEarworm( cantidad)
    {
        this.earworm-=cantidad;
        if(this.earworm<0){this.earworm=0;}
    }
    //ChangeWaitTime se usa para añadir o quitar tiempo de espera
    AddWaitTime(cantidad)
    {
        this.silent+=cantidad
    }
    RemoveWaitTime(cantidad)
    {
        this.silent-=cantidad;
        if(this.silent<0){this.silent=0;}
    }
    ChangeToAllergo()
    {
        if (this.adagio==true)
            {
                this.adagio =false;
            }
        this.allergo=true;
        this.speed=2;
    }
    CancelAllergo()
    {
        this.allergo=false;
        this.speed=1;
    }
    ChangeToAdagio()
    {
        if (this.allergo==true)
            {
                this.allergo =false;
            }
        this.adagio=true;
        this.speed=1/2;
    }
    CancelAdagio()
    {
     this.adagio=false;
     this.speed=1;
    }
    ChangeToPiano()
    {
        this.piano=true;
    }
    CancelPiano()
    {
        this.piano=false;
    }
    ChangeToForte()
    {
        this.forte=true;
    }
    CancelForte()
    {
        this.forte=false;
    }
    ChangeToAcompañamiento()
    {
        this.acompañamiento=true;
    }
    CancelAcompañamiento()
    {
        this.acompañamiento=false;
    }
    BeatFunction()
    {
        this.silent--;
    }
}