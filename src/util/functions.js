import sudokus from "./sudokus.json";

export const randomSudoku = () => {
  const random = Math.floor(Math.random() * sudokus.length);
  return sudokus[random];
};

const sudokuCells = (board) => {
  let cells = [];
  board.forEach((row) => {
    cells = [...cells, ...row];
  });
  cells = cells.map((cell) => cell.toString());
  return cells;
};

const sudokuBoard = (cells) => {
  const board = [];
  for (let i = 0; i < 81; i += 9) {
    board.push(cells.slice(i, i + 9));
  }
  return board;
};

export const emptySudokuCells = (board, level) => {
  const newCells = sudokuCells(board);
  const cellsToEmpty = level === 1 ? 21 : level === 2 ? 41 : 60;
  for (let i = 0; i < cellsToEmpty; i++) {
    let indexToEmpty;
    while (!indexToEmpty || newCells[indexToEmpty] === "") {
      indexToEmpty = Math.floor(Math.random() * newCells.length);
    }
    newCells[indexToEmpty] = "";
  }
  return sudokuBoard(newCells);
};

export const checkResult = (targetBoard, userBoard) => {
  const targetCells = sudokuCells(targetBoard);
  const userCells = sudokuCells(userBoard);
  return userCells.every((cell, index) => cell === targetCells[index]);
};
