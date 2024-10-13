import {KEY_BINDINGS} from './inputKeys.js';
import Player from './player.js';

//La declaro aquí para que tenga acceso todo el archivo
let player;
let KEYS;

/*Escena de Phaser*/
export default class combatScene extends Phaser.Scene {

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
        this.load.image("negra", "./assets/img/negra.png");
        /**
         * @todo loadear imagenes de las notas
         */
    }

    /**
     * @todo mover todas las funciones del jugador movimiento y tal a una sola clase
     */
    //MUY IMPORTANTE, cargar antes las imagenes que esten más detras pq si no taparan las que hayamos cargado antes
    create(){        
        //Esta linea crea todas las teclas que usaremos en esta escena a paritr del fichero KEY_BINDINGS
        KEYS = this.input.keyboard.addKeys(KEY_BINDINGS);

        //Create fondo
        this.add.image(0,0,"fondo").setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0,0);


        //Crea un player con la escena, la pos00x, pos00y, tileDiffx, tileDiffy
        player = new Player(this);
        player.setOrigin();
        player.setDisplaySize(100,100);


        //create Sawa -> player character
        //Se crea a Sawa en la posición 1,2 (el centro)
        //this.add.image(sawa00Pos.x + tileDiff.x, sawa00Pos.y + tileDiff.y*2,"sawa").setDisplaySize(100,100).setOrigin();
    }

    update(){
        //Ejemplo de como llamar ejecutar funciones cuando una tecla se pulse (solo se ejecuta una vez por cada pulsación de tecla)
        //KEYS.UP.isDown se puede usar si queremos hacerlo mientras se mantenga pulsado
        if (Phaser.Input.Keyboard.JustDown(KEYS.UP)) {
            player.Move(0,-1);
        }
        else if(Phaser.Input.Keyboard.JustDown(KEYS.DOWN)) {
            player.Move(0,1);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.LEFT)) {
            player.Move(-1,0);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.RIGHT)){
            player.Move(1,0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON1)){
            player.PlayInstrument(0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON2)){
            player.PlayInstrument(1);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON3)){
            player.PlayInstrument(2);
        }
    }
}