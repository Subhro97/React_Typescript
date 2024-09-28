import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Options } from "./types";

const Board: React.FC<
  React.PropsWithChildren<{ playBoard: Array<Options> }>
> = ({ playBoard }) => {
  const [board, setBoard] = useState<Array<Options>>(playBoard);
  const [winner, setWinner] = useState<Options>();
  const [activePlayer, setActivePlayer] = useState<Options>("X");

  let boardsize = useMemo(() => Math.sqrt(playBoard.length), [playBoard]);

  const WINNING_PATTERNS = useMemo(() => {
    const winningPatterns = [];

    // Horizontal Patterns
    for (let i = 0; i < boardsize; i++) {
      let res = [];

      for (let j = 0; j < boardsize; j++) {
        res.push(j + i * boardsize);
      }

      winningPatterns.push(res);
    }

    // Vertical Patterns
    for (let i = 0; i < boardsize; i++) {
      let res = [];

      for (let j = 0; j < boardsize; j++) {
        res.push(i + j * boardsize);
      }

      winningPatterns.push(res);
    }

    // Left Diagonal Patterns
    let diagonal1 = [];
    for (let i = 0; i < boardsize; i++) {
      diagonal1.push(i * boardsize + i);
    }

    winningPatterns.push(diagonal1);

    // Right Diagonal Patterns
    let diagonal2 = [];
    for (let i = 1; i <= boardsize; i++) {
      diagonal2.push(i * (boardsize - 1));
    }

    winningPatterns.push(diagonal2);

    return winningPatterns;
  }, [boardsize]);

  const winnerHandler = () => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      let pattern = WINNING_PATTERNS[i];

      let firstCell = board[pattern[0]];

      if (firstCell && pattern.every((item) => board[item] === firstCell))
        return firstCell;
      else null;
    }
  };

  const selectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;

    const gridValue = button.getAttribute("data-index");
    const index = gridValue ? gridValue.split("-") : null;

    if (index !== null) {
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];

        newBoard[Number(index)] = activePlayer;

        return newBoard;
      });
    }

    setActivePlayer((prevPlayer) => {
      if (prevPlayer === "X") return "O";
      else return "X";
    });
  };

  useEffect(() => {
    let winnerPlayer = winnerHandler();
    setWinner(winnerPlayer);
  }, [board]);

  return (
    <>
      <section
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardsize}, 1fr)`,
        }}
      >
        {board.map((val, rowIdx) => (
          <button
            key={crypto.randomUUID()}
            data-index={rowIdx}
            onClick={selectHandler}
            disabled={!!winner}
          >
            {val}
          </button>
        ))}
      </section>
      <p className="textMsg">
        {winner ? `${winner} Won!` : `${activePlayer}'s Turn`}
      </p>
    </>
  );
};

export default Board;
