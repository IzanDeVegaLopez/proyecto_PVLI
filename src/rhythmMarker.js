import { clockInstance } from "./combatScene.js";

/**Position of the yCenter if rhythm point */
const beatPos = 625;
/**Number of simultaneous rhythm markers on screen */
let NumberOfMarkers;

/**
 * Set ups & creates the rhythm Markers
 */
export default class rhythmMarkerController{
    rhythmMarkers = [];
    constructor(scene, numberOfMarkers){
        for(let i=0; i<numberOfMarkers; i++){
            this.rhythmMarkers[i] = new rhythmMarker(scene, beatPos/(numberOfMarkers * i), numberOfMarkers-i-1);
        }
        NumberOfMarkers = numberOfMarkers;
    }
}

/** images that go from the top of the screen to the position of the beat */
class rhythmMarker extends Phaser.GameObjects.Image{

    /** the current beat since they appeared on top of the screen */
    beats;
    /**
     * Creates a rhytm marker
     * @param {*} scene scene in which the are added
     * @param {*} yPos start y position
     * @param {*} startBeat how many beats would have passed to reach their position if they had appeared from top of the screen
     */
    constructor(scene, yPos, startBeat){
        super(scene, 100, yPos, "rhythmMarker");
        scene.add.existing(this);
        this.setOrigin();
        //size
        this.setDisplaySize(50,50);
        this.beats = startBeat;
        //añado que la escena llame a mi función postUpdate cuando llame a las funciones postUpdate, basicamente pq como deltaTime no esta definido hasta después del primer update es propenso a explotar
        this.scene.events.on('postupdate', this.PostUpdate.bind(this));
        //añado que cuando haya un beat se llame a la función beat
        clockInstance.eventEmitter.on("BeatNow", this.BeatFunction.bind(this));
    }
    /**Lo coloca en la posición actual */
    PostUpdate(){
        this.y = beatPos *  ((this.beats + (clockInstance.GetTimeSinceBeat()/clockInstance.delayTimer))/  NumberOfMarkers );
        //console.log( ((this.beats + (clockInstance.getTimeSinceBeat()/clockInstance.delayTimer))/  NumberOfMarkers ));
    }

    /**Updates how much beats have passed since this note was created, if it reaches the bottom it is moved to the start position */
    BeatFunction(){
        if(this.beats == NumberOfMarkers-1){
            this.beats = 0;
        }else{
            this.beats++;
        }
    }
}