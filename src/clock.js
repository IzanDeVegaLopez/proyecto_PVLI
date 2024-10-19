/**Is doubled cause it checks this time before and after the beat */
const tempoErrorMargin = 75;

export default class Clock{
    /** time of the last key Pressed, updated with isTempo */
    lastPress;
    /** ms between beats */
    delayTimer;
    /** last Beat time */
    lastBeat;
    /**Phaser timerEvent instance */
    timerEvent;
    /**clock config info */
    clockConfig;
    /**when the clock is paused this variable stores the clock progress  */
    pausedClockProgress;
    /**para llamar a los eventos correspondientes que se deberían llamar con el ritmo en los diferentes objetos */
    eventEmitter;
    constructor(scene, BPM){
        this.delayTimer = 1000 /(BPM/60);

        this.clockConfig = {delay: this.delayTimer, loop: true, callback: this.UpdateLastBeat, callbackScope: this, paused:false};
        //this.clockConfig = scene.clockConfig;
        

        this.timerEvent = scene.time.addEvent(this.clockConfig);
        
        //inicializar variables de tiempo
        this.lastPress = this.lastBeat = new Date();

        //Crea un event emitter para notificar a otros objetos de cada beat
        this.eventEmitter = new Phaser.Events.EventEmitter();
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
        this.eventEmitter.emit("BeatNow");
    }

    /** returns time till next Beat */
    getTimeSinceBeat(){
        return (new Date() - this.lastBeat);
    }

    /**Returns if when this is called it can be considered to the rhythm */
    isTempo(){
        let timeTillNextBeat = this.getTimeSinceBeat();
        let auxBool = ((new Date() - this.lastPress > this.delayTimer/2) && (timeTillNextBeat < tempoErrorMargin || timeTillNextBeat > this.delayTimer - tempoErrorMargin));
        this.lastPress = new Date();
        return auxBool;
    }
}