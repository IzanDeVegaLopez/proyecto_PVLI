class Casilla {
    constructor() {
        this.playerNotes = [];
        this.enemyNotes = [];
    }

    AddEnemyNote(noteValue) {
        //Clash
        this.enemyNotes.push(noteValue);
    }
    AddPlayerNote(noteValue) {
        //Clash
        this.enemyNotes.push(noteValue);
    }

    get totalValue() {
        let sum = 0;
        for (let i = 0; i < this.playerNotes.length; i++) {
            sum += this.playerNotes[i];
        }
        for (let i = 0; i < this.enemyNotes.length; i++) {
            sum -= this.enemyNotes[i];
        }
        return sum;
    }
}


class Board {
    constructor(ancho, alto) {
        this.playerPos = Math.round(alto / 2)-1;// + alto % 2;
        this.enemyPos = Math.round(alto / 2)-1;// + alto % 2;
        this.alto = alto;
        this.ancho = ancho;

        //creacion array 2D de casillas
        this.casillas = Array(this.alto);
        for (let i = 0; i < alto; i++) {
            this.casillas[i] = Array(this.ancho);
        }
        

        for (let j = 0; j < alto; j++) {
            for (let i = 0; i < ancho; i++) {
                this.casillas[j][i] = new Casilla();
            }
        }
    }

    RenderRow(row) {
        let stringContent = "";
        if (row == this.playerPos) {
            stringContent += "P ";
        } else {
            stringContent += "   ";
        }
        console.log(this.playerPos);


        for (let i = 0; i < this.ancho; i++) {
            //console.log(this.casillas[row] + "  " + row);
            stringContent += this.casillas[row][i].totalValue + ' ';
        }
        //console.log(stringContent);

        if (row == this.enemyPos) {
            stringContent += "E ";
        } else {
            stringContent += "  ";
        }
        //console.log(stringContent);

        return stringContent;
    }

    Render() {
        for (let i = 0; i < this.alto; i++) {
            let elem = document.getElementById("row" + (i + 1));
            elem.innerHTML = this.RenderRow(i);
        }
    }

    
}

function Start(){
    const board = new Board(8, 5);
    board.Render();
}