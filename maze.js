let current = [];

class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
    }

    setup() {
        for (let r = 0; r < this.height; r++) {
            let row = [];
            for (let c = 0; c < this.width; c++) {
                let cell = new Cell(r, c);
                row.push(cell)
            }
            this.grid.push(row);
        }
        current = this.grid[0][0]
        return this;
    }

    Generate() {
        const columnLimit = this.width - 1;
        const rowLimit = this.height - 1;
        let tArray = []

        for (let a = 0; a < this.width * this.height; a++) {
            let i = current.rNum;
            let j = current.cNum;
            current.visited = true;
            // Don't understand yet (
            for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
                for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                    // 
                    if(x !== i || y !== j) {
                        tArray.push(this.grid[x][y]);
                    }
                }
            }
            genNewTcell = () => {
                return tArray[Math.round(Math.random() * ((tArray.length - 1) - 0) + 0)];
            }

            let tCell = genNewTcell();
            while (!tCell.visited) {
                current = this.grid[tCell.rNum][tCell.cNum];
                current.visited = true;
                tArray = [];
            }
                tArray.splice(tCell);
                tCell = genNewTcell();
        } 
    }
};

class Cell {
    constructor(rNum, cNum) {
        this.rNum = rNum;
        this.cNum = cNum;
        this.visited = false;
        this.walls = {
            top : true,
            bottem : true,
            left : true,
            right : true
        }
    }
};

let maze = new Maze(5, 5);
maze.setup().Generate();

