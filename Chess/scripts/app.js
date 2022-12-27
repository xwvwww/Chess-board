let app = {
    config: {
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    },

    run() {
        let board = this.generateBoard();
        document.body.innerHTML = board;                
        this.insertFiguresOnDesk();
        this.insertPawns();
        this.insertRowsNumbers();
        this.insertColsChars();
    },
    
    insertPawns() {
        let tr = document.getElementsByTagName('tr');
        let whitePawnsRow = tr[6].querySelectorAll(`td`);
        for (let i = 0; i < whitePawnsRow.length; i++) {
            whitePawnsRow[i].innerHTML = this.getFigure("pawn", "whiteFigure");
        }
        let blackPawnsRow = tr[1].querySelectorAll('td');
        for (let i = 0; i < blackPawnsRow.length; i++) {
            blackPawnsRow[i].innerHTML = this.getFigure("pawn", "blackFigure"); 
        }
    },

    insertFiguresOnDesk() {
        let tr = document.getElementsByTagName('tr');
        for (let i = 0; i < positions.length ; i++) {
            let cell = document.querySelector(`td[data-rownum="${positions[i].coordRow}"],[data-colchar="${positions[i].coordCol}"]`);
            let figure = this.getFigure(positions[i].figure, positions[i].color +"Figure");
            cell.innerHTML = figure;
        }
        let cell = tr[7].querySelectorAll('td');
        for (let i = 0; i < 8 ; i++) {
            let figure = `<i class="fas fa-chess-${positions[i].figure} whiteFigure"></i>`
            cell[i].innerHTML = figure;
        }
    },

    getFigure(name, colorClass) {
        return `<i class="fas fa-chess-${name} ${colorClass}"></i>`;
    },

    generateBoard() {
        let board = "";
        let rowStartWithColor = "white";
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = "";
            if (rowStartWithColor == 'white') {
                row = this.generateRow('white', this.config.rows[i]);
                rowStartWithColor = "black";
            } else {
                row = this.generateRow('black', this.config.rows[i]);
                rowStartWithColor = "white";
            }
            board += row;
        }
        return `<table>${board}</table>`;
    },
   
    generateRow(startWithColor, rowNum) {
        let currentColorClass = startWithColor;
        let row = "";
        for (let i = 0; i < this.config.cols.length; i++) {
            let field = "";
            if (currentColorClass == "white") {
                field = this.generateField("black", i, this.config.cols[i]);
                currentColorClass = "black";
            } else {
                 field = this.generateField("white", i, this.config.cols[i]);
                currentColorClass = "white";
            }
            row += field;
        }
        return `<tr>${row}</tr>`;
    },
   
    generateField(color, rowNum, colChar) {
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`;
    },
    insertRowsNumbers() {
        let tr = document.querySelectorAll('tr');
        for (let i = 0; i <tr.length ; i++) {
            let td = document.createElement('td');
            td.style.backgroundColor = "#7a5000";
            td.innerText = this.config.rows[i];
            tr[i].insertAdjacentElement("afterbegin", td);
        }        
    },
    insertColsChars() {
        let tr = document.createElement('tr');
        tr.style.backgroundColor = "#7a5000";
        tr.innerHTML += "<td></td>";
        for (let i = 0; i < this.config.cols.length; i++) {
            tr.innerHTML += `<td>${this.config.cols[i]}</td>`;
        }
        let tbody = document.querySelector('tbody') ;        
        tbody.insertAdjacentElement('beforeend', tr);                  
    },
}

app.run();