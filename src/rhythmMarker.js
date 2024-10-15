import { deltaTime, clockInstance } from "./combatScene.js";

const beatPos = 650;
const topPos = 0;

export default class rhythmMarkerController{
    rhythmMarkers = [];
    constructor(scene, numberOfMarkers){
        for(let i=0; i<numberOfMarkers; i++){
            this.rhythmMarkers[i] = new rhythmMarker(scene, (beatPos - topPos)/numberOfMarkers * i, beatPos / (clockInstance.delayTimer * numberOfMarkers));
        }
    }
}

class rhythmMarker extends Phaser.GameObjects.Image{
    speed;
    constructor(scene, yPos, speed){
        super(scene, 100, yPos, "rhythmMarker");
        scene.add.existing(this);
        this.speed = speed;
        this.setOrigin();
        this.setDisplaySize(50,50);
        this.scene.events.on('postupdate', this.postUpdate.bind(this));
    }
    postUpdate(){
        /**@todo posiblemente haya que cambiar como se mueven estos bloques pa que no se descoloque todo cuando se freezee el navegador */
        if(this.y > beatPos){
            this.y = topPos;
        }else{
            this.y += this.speed * deltaTime;
        }
    }
}