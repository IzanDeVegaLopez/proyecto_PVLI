//Clase player tiene todas las funciones de movimiento, toca instrumentos y demás
//extiende de sprite para usar su cuerpo físico y cambiar la posición y animaciones del personaje según sus acciones
export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x00, y00, xdiff, ydiff){
        //Crea un sprite con el valor de la escena y la posición inicial del player y la textura de nuestro personaje
        super(scene, x00, y00, 'sawa');
        //Añade este sprite a la escena
        scene.add.existing(this);

        /**La posición en casillas del player, la casilla (0,0) es arriba a la izquierda*/
        this.position = {
            x: 1,
            y: 2
        };

        /** Las posiciones extremo a las que el player se puede mover de forma natural
         * Con estos valores podría estar en cualquier casilla entre (minX,minY) y (maxX,maxY) --> (0,0) y (2,4)
        */
        this.limitPositions = {
            minX:0,
            minY:0,
            maxX:2,
            maxY:4
        };
        this.pos00 = {
            x:x00,
            y:y00
        }
        this.tileDiff = {
            x: xdiff,
            y: ydiff
        };

        this.UpdatePos();
    }
    /**
     * 
     * @param {*} x las posiciones a mover al player hacia la derecha
     * @param {*} y las posiciones a mover al player hacia abajo
     */
    Move(xAdd, yAdd){
        //Cambia la posición en x del player y hace que los limites para moverse horizontalmente sean las casillas definidas en limitPositions
        this.position.x = Math.max(this.limitPositions.minX,Math.min(this.limitPositions.maxX,this.position.x+xAdd));
        //Cambia la posición en y del player y hace que los limites para moverse verticalmente sean sean las casillas definidas en limitPositions
        this.position.y = Math.max(this.limitPositions.minY,Math.min(this.limitPositions.maxY,this.position.y+yAdd));
        //actualiza la posición del sprite
        this.UpdatePos();
    }
    /**
     * Actualiza la posición del sprite del player respecto a su posición actual
     * @todo hacer que el movimiento no sea inmediato, si no que se deslice rapidamente hasta su nueva posición actual
     */
    UpdatePos(){
        this.x = this.pos00.x + this.tileDiff.x * this.position.x;
        this.y = this.pos00.y + this.tileDiff.y * this.position.y;
    }
}