import Board from "./Board";
import { Options } from "./types";

import "./TicTacToe.css";

const TicTacToe: React.FC<React.PropsWithChildren<{ n: number }>> = ({ n }) => {
  const board: Array<Options> = new Array(n * n).fill(null);

  return <Board playBoard={board} />;
};

export default TicTacToe;

/*
1. We first need to create the UI with the grids, with the input passed by user
2. We define whose move it is in the UI, starting with X
3. Once all the grids are stored, we match with the possible results and display the winner
 */
