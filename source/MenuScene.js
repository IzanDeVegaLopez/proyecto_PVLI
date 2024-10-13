import {KEY_BINDINGS} from './InputKeys.js';

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {

    /**
     * @todo hacer el juego resizeable, tutorial -> https://medium.com/@tajammalmaqbool11/full-screen-size-and-responsive-game-in-phaser-3-e563c2d60eab
     */

    constructor(){
        super({key: "menu"});
    }

    init(){

    }

    preload(){
        this.load.image("fondo", "./assets/img/IlustracionCombatZoneProvisional_LRhythm.jpg");
        this.load.image("sawa", "./assets/img/fathomgames500px.png");
        //this.load.image("patatas", "./assets/patatas.jpg")
    }

    /**
     * @todo mover todas las funciones del jugador movimiento y tal a una sola clase
     */

    create(){
        //Posicion de Sawa para la casilla de arriba a la izquierda
        const sawa00Pos = {
            x:250,
            y:125
        }
        //Valor a sumar para mover a Sawa de una casilla a otra adyacente
        const tileDiff = {
            x:140,
            y: 95
        }


        //Esta linea crea todas las teclas que usaremos en esta escena a paritr del fichero KEY_BINDINGS
        const KEYS = this.input.keyboard.addKeys(KEY_BINDINGS);

        //Create fondo
        this.add.image(0,0,"fondo").setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0,0);

        //create Sawa -> player character
        //Se crea a Sawa en la posición 1,2 (el centro)
        this.add.image(sawa00Pos.x + tileDiff.x, sawa00Pos.y + tileDiff.y*2,"sawa").setDisplaySize(100,100).setOrigin();
    }

    update(){
        //Ejemplo de como llamar al input system
        //if (KEYS.JUMP.UP) // Move UP
    }

    //Aux Functions-------------------------------------------------------------------------------------------------------------------------------
    getTopBarHeight() {
        let height = 60 * this.getScaleY();
        height = Phaser.Math.Clamp(height, 45, 60);
        return height;
    }
}