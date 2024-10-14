/**Is doubled cause it checks 50 ms before and 50 after the beat */
const tempoErrorMargin = 50;

export default class Clock{

    //delayTimer;
    /**last Beat timer */
    lastBeat;
    /**Phaser timerEvent instance */
    timerEvent;
    /**clock config info */
    clockConfig;
    /**when the clock is paused this variable stores the clock progress  */
    pausedClockProgress;
    constructor(scene, BPM){
        delayTimer = 1000 /(BPM/60);

        scene.clockConfig = {delay: delayTimer, loop: true, callback: this.UpdateLastBeat, callbackScope: this, paused:false};
        this.clockConfig = scene.clockConfig;
        

        scene.timerEvent = scene.time.addEvent(scene.clockConfig);
        this.timerEvent = scene.timerEvent;
        
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

let delayTimer;


export {delayTimer};