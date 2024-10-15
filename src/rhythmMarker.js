import { deltaTime, clockInstance } from "./combatScene.js";

const beatPos = 635;
let NumberOfMarkers;

export default class rhythmMarkerController{
    rhythmMarkers = [];
    constructor(scene, numberOfMarkers){
        for(let i=0; i<numberOfMarkers; i++){
            this.rhythmMarkers[i] = new rhythmMarker(scene, beatPos/(numberOfMarkers * i), beatPos / (clockInstance.delayTimer * numberOfMarkers), numberOfMarkers-i-1);
        }
        NumberOfMarkers = numberOfMarkers;
    }
}

class rhythmMarker extends Phaser.GameObjects.Image{
    speed;
    beats;
    constructor(scene, yPos, speed, startBeat){
        super(scene, 100, yPos, "rhythmMarker");
        scene.add.existing(this);
        this.speed = speed;
        this.setOrigin();
        this.setDisplaySize(50,50);
        this.beats = startBeat;
        //añado que la escena llame a mi función postUpdate cuando llame a las funciones postUpdate, basicamente pq como deltaTime no esta definido hasta después del primer update es propenso a explotar
        this.scene.events.on('postupdate', this.postUpdate.bind(this));
        //añado que cuando haya un beat se llame a la función beat
        clockInstance.eventEmitter.on("BeatNow", this.beatFunction.bind(this));
    }
    /**Lo coloca en la posición actual */
    postUpdate(){
        this.y = beatPos *  ((this.beats + (clockInstance.getTimeSinceBeat()/clockInstance.delayTimer))/  NumberOfMarkers );
        //console.log( ((this.beats + (clockInstance.getTimeSinceBeat()/clockInstance.delayTimer))/  NumberOfMarkers ));
    }

    beatFunction(){
        if(this.beats == NumberOfMarkers-1){
            this.beats = 0;
        }else{
            this.beats++;
        }
    }
}