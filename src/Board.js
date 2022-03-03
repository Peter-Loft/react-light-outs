import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let row = 0; row < nrows; row++) {
      let currRow = [];
      for (let col = 0; col < ncols; col++) {
        (Math.random() <= chanceLightStartsOn) ? currRow.push(true) : currRow.push(false);
      }
      initialBoard.push(currRow);
    }

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  /** Checks if all lights are off (User has won) 
   * 
   * Returns boolean
  */

  function hasWon() {
    //CR Could use .every(callback) - Returns true if everything in array is x
    const result = board.map(r => r.filter(c => c === true).length);

    for (let r of result) {
      if (r > 0) {
        return false;
      }
    }

    //TODO: Verify map/filter logic. Complete game has won return/div.
    return true;

    // TODO: check the board in state to determine whether the player has won.
  }

  /** Checks if cells are on board. Flips valid cells around clicked cell.
   * 
   * Accepts a string (coord)
   * 
   * Returns new array with updated values on board
   */

  function flipCellsAround(coord) {

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);


      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    //Query selector to hide board
    return (
      <div>
        Game has been won.
      </div>
    );
  }

  // TODO

  // make table board

  return (
    <div>
      <table>
        <tbody>
          {board.map((r, y) =>
            <tr className="board-row" key={y}>
              {r.map((c, x) =>
                <Cell key={`${y}-${x}`}
                  flipCellsAroundMe={flipCellsAround}
                  isLit={board[y][x]}
                  id={`${y}-${x}`} />)}
            </tr>)}
        </tbody>
      </table>
    </div>
  )

  // TODO
}

export default Board;
