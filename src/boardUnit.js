import { tile00PositionX, tile00PositionY,  tileDiffX, tileDiffY } from "./tileData.js";

//Clase player tiene todas las funciones de movimiento, toca instrumentos y demás
//extiende de sprite para usar su cuerpo físico y cambiar la posición y animaciones del personaje según sus acciones
export default class BoardUnit extends Phaser.GameObjects.Sprite{
    //Player.GameObjects.Sprite tiene una propiedad scene a la que podemos llamar para hacer referencia a la escena actual

    /** La posición en casillas del player, la casilla (0,0) es arriba a la izquierda*/
    position;
    /** Las posiciones extremo a las que el player se puede mover de forma natural
     *  Con estos valores podría estar en cualquier casilla entre (minX,minY) y (maxX,maxY) --> (0,0) y (2,4)
     */
    limitPositions;
    /**
     * @param {*} scene la escena en la que está el personaje
     * @param {*} startPos objeto con x e y, con la posición en la que empieza esta unidad
     * @param {*} imageId string que le hemos asignado a la imagen en el load Image de la escena
     */
    constructor(scene, startPos, imageID){
        //Crea un sprite con el valor de la escena y la posición inicial del player y la textura de nuestro personaje
        super(scene, tile00PositionX(), tile00PositionY(), imageID);
        //Añade este sprite a la escena
        scene.add.existing(this);
        this.position = {
            x: startPos.x,
            y: startPos.y
        };        
        this.limitPositions = {
            minX:0,
            minY:0,
            maxX:6,
            maxY:4
        };
        this.UpdatePos();
    }
    /**
     * returns the number of spaces this Unit has Moves
     * @param {*} x las posiciones a mover al player hacia la derecha
     * @param {*} y las posiciones a mover al player hacia abajo
     */
    Move(xAdd, yAdd){
        let auxX = this.position.x;
        let auxY = this.position.y;
        //Cambia la posición en x del player y hace que los limites para moverse horizontalmente sean las casillas definidas en limitPositions
        this.position.x = Math.max(this.limitPositions.minX,Math.min(this.limitPositions.maxX,this.position.x+xAdd));
        //Cambia la posición en y del player y hace que los limites para moverse verticalmente sean sean las casillas definidas en limitPositions
        this.position.y = Math.max(this.limitPositions.minY,Math.min(this.limitPositions.maxY,this.position.y+yAdd));
        //actualiza la posición del sprite
        this.UpdatePos();
        return (Math.abs(this.position.x - auxX) + Math.abs(this.position.y - auxY));
    }
    /**
     * Actualiza la posición del sprite del player respecto a su posición actual
     * @todo hacer que el movimiento no sea inmediato, si no que se deslice rapidamente hasta su nueva posición actual
     */
    UpdatePos(){
        this.x = tile00PositionX() + this.position.x * tileDiffX();
        this.y = tile00PositionY() + this.position.y * tileDiffY();
    }
}