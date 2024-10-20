import {KEY_BINDINGS} from './inputKeys.js';
import Player from './player.js';
import Clock from './clock.js';
import RhythmMarker from './rhythmMarker.js';
import Instrument from "./instrumento.js";
import InstrumentDataBase from "./instrumentDataBase.js";
import Enemy from "./enemy.js";
import testEnemy from "./testEnemy.js";

let KEYS;
let deltaTime;
let clockInstance;
let music;
export {deltaTime, clockInstance};

/*Escena de Phaser*/
export default class combatScene extends Phaser.Scene {
    playerPoints;
    enemyPoints;
    /**
     * @todo hacer el juego resizeable, tutorial -> https://medium.com/@tajammalmaqbool11/full-screen-size-and-responsive-game-in-phaser-3-e563c2d60eab
     */

    constructor(){
        super({key: "menu"});
        this.playerPoints = 0;
        this.enemyPoints = 0;
    }

    init(){

    }

    preload(){
        this.load.audio('currentCombatSong', [ (testEnemy.songPath+'.ogg'), (testEnemy.songPath+'.mp3'), (testEnemy.songPath+'.m4a') ]);

        this.load.image(testEnemy.name, testEnemy.imagePath);
        this.load.image("fondo", "./assets/img/IlustracionCombatZoneProvisional_LRhythm.jpg");
        this.load.image("sawa", "./assets/img/fathomgames500px.png");
        /**Todo cambiar clock por la imagen de las notitas que bajan hasta el punto correcto*/
        this.load.image("clock", "./assets/img/discord.png");
        this.load.image("rhythmMarker", "./assets/img/rhythmMarker.png");
        /**
         * @todo loadear imagenes de las notas
         */
        this.load.image("negra", "./assets/img/negra.png");

        this.load.spritesheet('notes', 'assets/img/notasSpriteSheet.png', {frameWidth: 32, frameHeight: 32});

        
        //iniciar el clock con los BPM como parametro
        clockInstance = new Clock(this, testEnemy.bpm);
        clockInstance.eventEmitter.once("BeatNow", this.startCombatSong, this);
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
        this.player = new Player(this, new Instrument(this,InstrumentDataBase[0]), new Instrument(this, InstrumentDataBase[1]));

        this.enemy = new Enemy(this, testEnemy);

        music = this.sound.add('currentCombatSong');

        //MARCADORES DE PTS
        this.playerMarker = this.add.text(140,32,"0",{fontFamily:"Grandstander",fontSize:"48px"}).setTint(0x179bae);
        this.enemyMarker = this.add.text(1200,32,"0",{fontFamily:"Grandstander",fontSize:"48px"}).setTint(0xff8343);

        //Crea los marcadores de ritmo
        new RhythmMarker(this, 3);

        this.anims.create({
			key: 'notes0',
			frames: this.anims.generateFrameNumbers('notes', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});
        this.anims.create({
			key: 'notes1',
			frames: this.anims.generateFrameNumbers('notes', {start:1, end:1}),
			frameRate: 1,
			repeat: -1
		});
        this.anims.create({
			key: 'notes2',
			frames: this.anims.generateFrameNumbers('notes', {start:2, end:2}),
			frameRate: 1,
			repeat: -1
		});


        //Colisiones------------------------------------------------------------------------------------------------------------------------
        this.playerNotes = this.physics.add.group();
        this.enemyNotes = this.physics.add.group();
        //Contiene las notas que chocan contra notas del player
        this.playerNotesAndPlayerNotes = this.physics.add.group();
        //Contiene las notas del enemigo o del player que chocan entre sí
        this.playerNotesAgainstEnemyNotes = this.physics.add.group();

        //Las notas del enemigo se chocan con el player
        this.physics.add.overlap(this.enemyNotes, this.player, (player,note)=>{
            if(!note.piano){
                this.enemyPoints+= Math.pow(2,note.tipoNota);
                this.enemyMarker.text = this.enemyPoints;
                console.log("dado");
                note.destroy();
            }
            /**@todo sumarle puntuación al enemy */
        });
        //Notas del player chocandose contra el enemigo
        this.physics.add.overlap(this.playerNotes, this.enemy, (enemy,note)=>{
            if(!note.piano){
                this.playerPoints+= Math.pow(2,note.tipoNota);
                this.playerMarker.text = this.playerPoints;
                console.log("EnemyDado");
                note.destroy();
            }
            /**@todo sumarle puntuación al player */
        });

        //Notas del player chocandose contra sus propias notas
        this.physics.add.overlap(this.playerNotesAndPlayerNotes, this.playerNotes, (collidingNote, receivingNote)=>{
            if(!collidingNote.piano && !receivingNote.piano)
            if(!collidingNote.notesCollidedWith.includes(receivingNote)){
                receivingNote.AddKeyword(collidingNote.efectosAccompaniment);
                collidingNote.notesCollidedWith.push(receivingNote);
            }
        });
        //Notas del player chocandose contra notas Enemy
        this.physics.add.overlap(this.playerNotesAgainstEnemyNotes, this.enemyNotes, (collidingNote, receivingNote)=>{
            if(!collidingNote.piano && !receivingNote.piano)
            if(!collidingNote.notesCollidedWith.includes(receivingNote)){
                console.log(collidingNote.efectosAccompaniment);
                //console.log(collidingNote.efectosAccompaniment);
                receivingNote.destroy();
                collidingNote.AddKeyword({damage:null});
                /**@todo hacer que la nota aplique los efectos necesarios */
                //collidingNote.notesCollidedWith.push(receivingNote);
            }
        });
        //--------------------------------------------------------------------------------------------------------------------------

    }

    update(){
        ///delta time calculation
        deltaTime = new Date() - this.lastFrameTime;
        this.lastFrameTime = new Date();

        
        //Ejemplo de como llamar ejecutar funciones cuando una tecla se pulse (solo se ejecuta una vez por cada pulsación de tecla)
        //KEYS.UP.isDown se puede usar si queremos hacerlo mientras se mantenga pulsado
        if (Phaser.Input.Keyboard.JustDown(KEYS.UP)) {
            this.player.NormalMove(0,-1);
        }
        else if(Phaser.Input.Keyboard.JustDown(KEYS.DOWN)) {
            this.player.NormalMove(0,1);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.LEFT)) {
            this.player.NormalMove(-1,0);
        }
        else if (Phaser.Input.Keyboard.JustDown(KEYS.RIGHT)){
            this.player.NormalMove(1,0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON1)){
            this.player.PlayInstrument(0);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON2)){
            this.player.PlayInstrument(1);
        }else if(Phaser.Input.Keyboard.JustDown(KEYS.BUTTON3)){
            this.player.PlayInstrument(2);
        }
    }


    startCombatSong(){
        music.play();
    }

    callOnce(callback, context = this) {

        if (typeof callback !== 'function') {
            callback = () => {
            };
        }

        let once = false;

        return (...args) => {
            if (!once) {
                once = true;
                callback.apply(context, args);
            }
        }

    }
}