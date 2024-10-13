import MenuScene from "./MenuScene.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width:  1320,
    height: 720,
    /**
     * @type {boolean}
     */
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [MenuScene],    // Decimos a Phaser cual es nuestra escena
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 200 }, 
            debug: false 
        } 
    },
    parent:"game"

};

new Phaser.Game(config);