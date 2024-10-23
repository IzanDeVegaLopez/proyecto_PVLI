import InstrumentDataBase from "./instrumentDataBase";
import Player from "./player";
/*Escena de Phaser*/
export default class rewardsScene extends Phaser.Scene {
    ownedinstruments = [];

    init(){
        rewards = [];
        for (let i = 0; i<3; i++) this.RandomInstrument();
    }
    preload(){

    }
    create(){

    }
    update(){

    }

    RandomInstrument = function(){
        let instruments = InstrumentDataBase.length();
        if (instruments < ownedinstruments.length() + rewards.length()){
            let inst = Math.floor(Math.random() * (instruments));
        
            rewards.push((ContainsInstrument(inst,ownedinstruments) || ContainsInstrument(inst,rewards)) ? RandomInstrument() : inst);
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
