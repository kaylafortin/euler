import { template } from '../helpers/template.js'

/**
 Starting in the top left corner of a 2×2 grid,
 and only being able to move to the right and down,
 there are exactly 6 routes to the bottom right corner.

 How many such routes are there through a 20×20 grid?
 */

const TEST_ANSWER = 6;
const TEST_ARGS = {
    rows: 2,
    cols: 2,
};
const ARGS = {
    rows: 20,
    cols: 20,
};

const getGridItem = (col, row, rows, cols,) => ({
    col,
    row,
    moves: 1,
})


const buildCols = (cols, row, rows) => {
    let gridRows = [];
    for (let i = 0; i <= cols; i++) {
        gridRows.push(getGridItem(i, row, rows, cols));
    }
    return gridRows;
}

const buildRows = (rows, cols) => {
    let grid = [];
    for (let i = 0; i <= rows; i++) {
        grid.push(buildCols(cols, i, rows));
    }
    return grid;
}

class Tree {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = buildRows(rows, cols)
    }

    getTopNodeMoves({ col, row }) {
        const topCord = row - 1;
        return topCord >= 0 ? this.grid[topCord][col].moves : 0;
    }

    getLeftNodeMoves({ col, row }) {
        const leftCord = col - 1;
        return leftCord >= 0 ? this.grid[row][leftCord].moves : 0;
    }

    calculateMoves(node) {
        const topMoves = this.getTopNodeMoves(node);
        const leftMoves = this.getLeftNodeMoves(node);
        node.moves = topMoves + leftMoves
    }

    buildColumn(col, row = 0) {
        const currentNode = this.grid[row][col];
        this.calculateMoves(currentNode);
        const nextRow = row += 1;
        if (row > this.rows) return
        return this.buildColumn(col, nextRow)
    }

    loopColumns(col, row) {
        this.buildColumn(col, row)
        const nextCol = col += 1;
        if (nextCol > this.cols) return;
        return this.loopColumns(nextCol, 0)
    }

    start() {
        // start at the node right below the root
        this.loopColumns(0, 1);
        return this.grid[this.rows][this.cols].moves
    }
}


const solution = ({ rows, cols }) => {
    const grid = new Tree(rows, cols);
    return grid.start()
}


template(ARGS, TEST_ARGS, TEST_ANSWER, solution)