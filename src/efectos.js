import Instrumento from './instrumento';
import Player from './player';


export default class Efectos {
    // Your code for the Efectos class goes here
    // 

    constructor (){

    }


    XMove(player, X, Y){
        player.Move(X, Y);
        player.UpdatePos();

    }
}
