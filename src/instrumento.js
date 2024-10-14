import Nota from "./nota.js"

export default class Instrumento{
    numeroNotas;
    notePositionMod;
    tipoNotas;
    /**
     * 
     * @param {*} posNotasX Posición de las notas en x respecto a la posición del jugador
     * @param {*} posNotasY Posición de las notas en y respecto a la posición del jugador
     * @param {*} numeroNotas Numero de notas generadas al tocarlo
     * @param {*} tipoNotas Tipo de las notas 0 corchea, 1 negra, 2 blanca
     */
    constructor(posNotasX, posNotasY, numeroNotas, tipoNotas){
        this.numeroNotas = numeroNotas;
        this.NotePositionMod = {
            x:posNotasX, 
            y:posNotasY
        };
        this.tipoNotas = tipoNotas;
    }

    /**
     * Toca este instrumento
     * @param {*} posX posicion en X desde donde se toca el instrumento
     * @param {*} posY posición en Y desde donde se toca el instrumento
     */
    Play(scene, posX, posY){
        //Previene que se generen notas fuera del tablero
        if(posY+this.NotePositionMod.y < 5 && posY+this.NotePositionMod.y >= 0){
            for(let i= 0; i < this.numeroNotas; i++){
                new Nota(scene, posX+this.NotePositionMod.x, posY+this.NotePositionMod.y, this.tipoNotas, 1);
                /**Meter algún tipo de delay entre notas */
            }
        }
    }
}
