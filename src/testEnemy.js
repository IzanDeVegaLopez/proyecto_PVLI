/**Tiene una array con todos los archivos necesarios para configurar los distintos instrumentos */
const testEnemy = {
    startPosY: 2,
    name: "testEnemy",
    bpm: 75,
    imagePath: "./assets/img/testEnemy.png",
    songPath: './assets/audio/Brutal_Orchestra_OST_Primary_Colours',
    enemyActions:
    [
        [//Compas 1
            {
                notes:
                [
                    {
                        posY: 2,
                        tipoNota: 1
                    }
                ],
                move:
                {
                    y: 0
                }
            }
        ],
        [//Compas 2
            {
                notes:
                [
                ],
                move:
                {
                    y: 1
                }
            }
        ],
        [//Compas 3
            {
                notes:
                [
                    {
                        posY: 3,
                        tipoNota: 1
                    }
                ],
                move:
                {
                    y: -1
                }
            },
            {
                notes:
                [
                    {
                        posY: 2,
                        tipoNota: 1
                    }
                ],
                move:
                {
                    y: 2
                }
            },
            {
                notes:
                [
                    {
                        posY: 4,
                        tipoNota: 1
                    }
                ],
                move:
                {
                    y: 0
                }
            }
        ],
        [//Compas 4
            {
                notes:
                [
                ],
                move:
                {
                    y: 1
                }
            }
        ],
    ]
};
export default testEnemy;