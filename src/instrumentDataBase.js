import notaEffects from "./NotasEffects.js";
import Nota from "./nota.js";
/**Tiene una array con todos los archivos necesarios para configurar los distintos instrumentos */
const InstrumentDataBase = [
{
    nombre: "Flauta",
    baseCooldown: 2,
    numeroNotas: 1,
    tipoNotas: 0,
    noteKeywords: {forte:null,allegro:null, accompaniment:[{adagio:[2]}]}
},
{
    nombre: "Piano",
    numeroNotas: 1,
    tipoNotas: 1,
    baseCooldown: 4,
    notePositionMod: [{x:0,y:1},{x:0,y:0},{x:0,y:-1}]
}
];

export default InstrumentDataBase;