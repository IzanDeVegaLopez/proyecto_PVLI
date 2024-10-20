const notaEffects = {
    forte: function()
    {
        this.forte = true;
    },
    piano: function()
    {
        this.piano = true;
    },
    earworm: function(earwormToAdd){
        if(this.earworm==undefined){this.earworm=0;}
        this.earworm+=earwormToAdd;
       
    },
    allegro: function(){
        this.speed = 2 ;
    },
    adagio: function()
    {
        this.speed=(1/2);
    },
    accompaniment: function(efectosAccompaniment)
    {
        if(this.notesCollidedWith==undefined) this.notesCollidedWith =[];
        this.scene.playerNotesAndPlayerNotes.add(this);
        this.efectosAccompaniment=efectosAccompaniment;
    },
    silent: function(silentToAdd)
    {
        if(this.silent==undefined){this.silent=0;}
        this.silent+=silentToAdd;
    }

}
export default notaEffects