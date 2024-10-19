import notaEffects from "./NotasEffects.js";
import Nota from "./nota.js";
/**Tiene una array con todos los archivos necesarios para configurar los distintos instrumentos */
const InstrumentDataBase = [
{
    nombre: "Flauta",
    baseCooldown: 2,
    numeroNotas: 2,
    SpawnNotes: function(posX,posY, tipoNotas){

        if(posY < 5 && posY >= 0){
            new Nota(this.sceneRef, posX, posY, tipoNotas, 1).AddKeyword([
                {
                    method: notaEffects.allegro,
                    param: []
            }]);
        }

    }
},
{
    nombre: "Piano",
    numeroNotas: 1,
    tipoNotas: 1,
    baseCooldown: 4,
    ThrowNotes: function(posX, posY){
        for(let i = -1; i < 2; i++){
            this.SpawnNotes(posX, posY+i, this.tipoNotas);
        }
    }
}
];

export default InstrumentDataBase;