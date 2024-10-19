/**Tiene una array con todos los archivos necesarios para configurar los distintos instrumentos */
const InstrumentDataBase = [
{
    nombre: "Flauta",
    baseCooldown: 1,
    numeroNotas: 2
},
{
    nombre: "Piano",
    numeroNotas: 1,
    tipoNotas: 1,
    baseCooldown: 1,
    ThrowNotes: function(posX, posY){
        for(let i = -1; i < 2; i++){
            this.SpawnNotes(posX, posY+i, this.tipoNotas);
        }
    }
}
];

export default InstrumentDataBase;