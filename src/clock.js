
const tempoErrorMargin = 50;

/**@todo esta clase genera las flechitas que se van moviendo y las mueve al ritmo de la música */
export default class Clock extends Phaser.GameObjects.Image{
    /**Static reference to the clock (Singleton Pattern) */
    static clockInstance;

    /**ms passed between beats */
    delayTimer;
    /**last Beat timer */
    lastBeat;
    /**Phaser timerEvent instance */
    timerEvent;
    /**clock config info */
    clockConfig;
    /**when the clock is paused this variable stores the clock progress  */
    pausedClockProgress;
    constructor(scene, BPM){
        super(scene, 0, 0, 'clock');
        //Singleton Pattern
        if(this.clockInstance == undefined){
            this.clockInstance = this;
        }else{
            this.destroy();
        }

        this.delayTimer = 1000/(BPM/60);

        this.clockConfig = {delay: dalayTimer, loop: true, callback: this.UpdateLastBeat, callbackScope: this, paused:false}
        console.log(this.clockConfig.delay);

        this.timerEvent = scene.time.addEvent(this.clockConfig);
        
        this.lastBeat = new Date();
    }

    /**Pauses clock */
    PauseClock(){
        this.timerEvent.PauseClock();
        this.pausedClockProgress = this.getTimeTillBeat();
    }
    /**Resumens Clock after pausing it*/
    ResumeClock(){
        this.timerEvent.ResumeClock();
        this.lastBeat = new Date() + this.pausedClockProgress();
    }
    /**restarts clock */
    RestartClock(){
        this.clockConfig.reset();
        this.UpdateLastBeat();
    }
    /**Updates the last beat timer */
    UpdateLastBeat(){
        this.lastBeat = new Date();
        console.log("miau");
    }

    /** returns time till next Beat */
    getTimeTillBeat(){
        return new Date - this.lastBeat;
    }

    /**Returns if when this is called it can be considered to the rhythm */
    isTempo(){
        let timeTillBeat = this.getTimeTillBeat()
        return (timeTillBeat < tempoErrorMargin || timeTillBeat > delayTimer - tempoErrorMargin);
    }
}