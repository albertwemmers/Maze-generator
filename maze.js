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
            const cX = current.rNum;
            const cY = current.cNum;
            current.visited = true;
            const xOffset = [0, 1, 0, -1];
            const yOffset = [-1, 0, 1, 0];

            for (let i = 0; i < 4; i++) {
                let x = cX + xOffset[i];   
                let y = cY + yOffset[i];
                if (!(x < 0 || x > rowLimit || y < 0 || y > columnLimit)) {
                    if (this.grid[x][y].visited == false) {
                        tArray.push(this.grid[x][y]);
                    }
                }
            }
                        
            if (tArray.length > 0) {
                let tCell = tArray[Math.round(Math.random() * (tArray.length - 1))];
                current = this.grid[tCell.rNum][tCell.cNum];

                console.log(current);
                current.visited = true;
                tArray = [];
            }
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

let maze = new Maze(3, 3);
maze.setup().Generate();

//     let i = current.rNum;
//     let j = current.cNum;
//     current.visited = true;
//     for(let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
//         for(let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
//             if((x !== i || y !== j) && this.grid[x][y].visited == false) {
//                 tArray.push(this.grid[x][y]);
//             }