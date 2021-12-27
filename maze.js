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
                if (!(x < 0 || x > rowLimit || y < 0 || y > columnLimit) && this.grid[x][y].visited == false) {
                    tArray.push(this.grid[x][y]);
                }
            }
                        
            if (tArray.length > 0) {
                let tCell = tArray[Math.round(Math.random() * (tArray.length - 1))];
                if ((tCell.rNum - xOffset[1]) == cX && (tCell.cNum - yOffset[1]) == cY) {
                    tCell.walls.top = false;
                    this.grid[cX][cY].walls.bottem = false;
                }
                if ((tCell.rNum - xOffset[2]) == cX && (tCell.cNum - yOffset[2]) == cY) {
                    tCell.walls.left = false;
                    this.grid[cX][cY].walls.right = false;
                }
                if ((tCell.rNum - xOffset[3]) == cX && (tCell.cNum - yOffset[3]) == cY) {
                    tCell.walls.bottem = false;
                    this.grid[cX][cY].walls.top = false;
                }
                if ((tCell.rNum - xOffset[4]) == cX && (tCell.cNum - yOffset[4]) == cY) {
                    tCell.walls.right = false;
                    this.grid[cX][cY].walls.left = false;
                }

                current = this.grid[tCell.rNum][tCell.cNum]
                current.visited = true;
                tArray = [];
                
                console.log(current);
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


let maze = new Maze(5, 5);
maze.setup().Generate();

console.log("Look at each cell in the grid, it's location and what walls are removed.");
console.log(maze.grid);