import {KEY_BINDINGS} from './inputKeys.js';
import Player from './player.js';
import Clock from './clock.js';
import RhythmMarker from './rhythmMarker.js';
import Instrument from "./instrumento.js";
import InstrumentDataBase from "./instrumentDataBase.js"


//La declaro aquí para que tenga acceso todo el archivo
let player;
let KEYS;
let deltaTime;
let clockInstance;
export {deltaTime, clockInstance};

/*Escena de Phaser*/
export default class combatScene extends Phaser.Scene {
    lastFrameTime;
    /**
     * @todo hacer el juego resizeable, tutorial -> https://medium.com/@tajammalmaqbool11/full-screen-size-and-responsive-game-in-phaser-3-e563c2d60eab
     */

    constructor(){
        super({key: "menu"});
        this.lastFrameTime = new Date();
    }

    init(){

    }

    preload(){
        this.load.image("fondo", "./assets/img/IlustracionCombatZoneProvisional_LRhythm.jpg");
        this.load.image("sawa", "./assets/img/fathomgames500px.png");
        /**Todo cambiar clock por la imagen de las notitas que bajan hasta el punto correcto*/
        this.load.image("clock", "./assets/img/discord.png");
        this.load.image("rhythmMarker", "./assets/img/rhythmMarker.png");
        /**
         * @todo loadear imagenes de las notas
         */
        this.load.image("negra", "./assets/img/negra.png");

        
        //iniciar el clock con los BPM como parametro
        clockInstance = new Clock(this, 120);
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
        player = new Player(this, new Instrument(this,InstrumentDataBase[0]), new Instrument(this, InstrumentDataBase[1]));
        player.setOrigin();
        player.setDisplaySize(100,100);

        //Crea los marcadores de ritmo
        new RhythmMarker(this, 3);

    }

    update(){
        ///delta time calculation
        deltaTime = new Date() - this.lastFrameTime;
        this.lastFrameTime = new Date();

        
        //Ejemplo de como llamar ejecutar funciones cuando una tecla se pulse (solo se ejecuta una vez por cada pulsación de tecla)
        //KEYS.UP.isDown se puede usar si queremos hacerlo mientras se mantenga pulsado
        if (Phaser.Input.Keyboard.JustDown(KEYS.UP)) {
            player.NormalMove(0,-1);
        }
        else if(Phaser.Input.Keyboard.JustDown(KEYS.DOWN)) {
            player.NormalMove(0,1);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.LEFT)) {
            player.NormalMove(-1,0);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.RIGHT)){
            player.NormalMove(1,0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON1)){
            player.PlayInstrument(0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON2)){
            player.PlayInstrument(1);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON3)){
            player.PlayInstrument(2);
        }
    }
}