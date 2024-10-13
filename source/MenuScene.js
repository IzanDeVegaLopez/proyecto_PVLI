import {KEY_BINDINGS} from './InputKeys.js';

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    }

    init(){

    }

    preload(){
        //this.load.image("kebab", "./assets/kebab.png")
        //this.load.image("patatas", "./assets/patatas.jpg")
    }

    create(){
        //Esta linea crea todas las teclas que usaremos en esta escena a paritr del fichero KEY_BINDINGS
        const KEYS = this.input.keyboard.addKeys(KEY_BINDINGS);

        //this.add.image(100, 50, "kebab").setOrigin(0, 0).setScale(0.5, 0.5)
        /** Lo mismo que la línea anterior con clases */
        //let kebab = new Kebab(this, 100, 50);
        //kebab.setOrigin(0,0);
        //kebab.setScale(0.5,0.5);
        //console.log("He pedido un kebab con", kebab.carne, ",", kebab.verduras,"y", kebab.salsa)
        /** */

        //this.add.image(400, 450, "patatas").setOrigin(0.5, 0.5).setScale(0.1, 0.1)
        /** Lo mismo que la línea anterior con clases */
        //let patatas = new Patatas(this, 400, 450);
        //patatas.setOrigin(0.5, 0.5);
        //patatas.setScale(0.1, 0.1);
        //console.log("He pedido unas patatas con salsa", patatas.salsa)
    }

    update(){
        //Ejemplo de como llamar al input system
        //if (KEYS.JUMP.UP) // Move UP
    }
}