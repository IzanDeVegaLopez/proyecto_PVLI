import InstrumentDataBase from "./instrumentDataBase";
import Player from "./player";
/*Escena de Phaser*/
export default class rewardsScene extends Phaser.Scene {
    // Array que contiene los instrumentos del jugador, así como los que ha eliminado de su colección.
    ownedinstruments;
    // Array que contiene los instrumentos ya otorgados.
    rewards;

    // Conchas base obtenidas por completar un nivel.
    baseshells;
    // Conchas adicionales basadas en la dificultad.
    extrashells;

    init(data){
        currentplayer = data.Player;
        
        //Conchas
        currentplayer.shells += baseshells + (data.difficulty*extrashells);

        //Instrumentos
        this.rewards = [];
        for (let i = 0; i<3; i++) {
            newinst = this.RandomInstrument();
            this.rewards.push(newinst);
            this.add.image((this.game.scale.width/3)*i, 200, "inst_"+newinst);
        }

        //Tiendas
        
    }
    preload(){
        for (i = 0; i<InstrumentDataBase.length(); i++){
            this.image.preload("inst_"+i, "./assets/img/instrumentos/inst_"+i+".png");
        }
    }
    create(){
        this.ownedinstruments = [];

        
    }
    update(){
    }

    RandomInstrument = function(){
        let instruments = InstrumentDataBase.length();
        if (instruments < ownedinstruments.length() + rewards.length()){
            let inst = Math.floor(Math.random() * (instruments));
        
            return((ContainsInstrument(inst,ownedinstruments) || ContainsInstrument(inst,rewards)) ? RandomInstrument() : inst);
            
        }
    }
}
function ContainsInstrument(inst, array){   
    let found = false;
    let i = 0;
    while (i<array.length() && !found) {
        found = inst == array[i];
        i++;
    }
    return found;
}
