import { useEffect, useState } from "react";
import { Cell } from "../Cell";
import "./Board.scss";

interface BoardProps {
  settings: { digits: number; maxAttempts: number };
  setWon: (won: boolean) => void;
  setAttempts: (attempts: number) => void;
  attemptsLeft: number;
  answer: string;
}

export const Board: React.FC<BoardProps> = ({
  settings,
  setWon,
  setAttempts,
  attemptsLeft,
  answer,
}) => {
  const initialBoard = Array.from({ length: settings.maxAttempts }, () =>
    Array.from({ length: settings.digits }, () => " ")
  );

  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [currentPosition, setCurrentPosition] = useState<{
    row: number;
    cell: number;
  }>({ row: 0, cell: 0 });

  useEffect(() => {
    console.log(board);
  }, [board]);

  const moveToNextCell = () => {
    const { row, cell } = currentPosition;
    if (cell < settings.digits - 1) {
      setCurrentPosition({ row, cell: cell + 1 });
    } else {
      return;
    }
  };

  const moveToNextRow = () => {
    const { row } = currentPosition;
    if (row < settings.maxAttempts - 1) {
      setCurrentPosition({ row: row + 1, cell: 0 });
    } else {
      return;
    }
  };

  const updateBoard = (rowIndex: number, cellIndex: number, value: string) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][cellIndex] = value;
    setBoard(updatedBoard);
  };

  const validateGuess = (rowIndex: number) => {
    const guess = board[rowIndex].join("").trim();
    if (guess.length !== settings.digits) {
      console.log("Invalid guess");
      return;
    }

    const correct = guess === answer;
    console.log(guess, " And its : ", correct);

    if (correct) {
      setWon(true);
    } else {
      const attempts = attemptsLeft - 1;
      if (attempts === 0) {
        setWon(false);
      }
      setAttempts(attempts);
    }
  };

  const renderRow = (row: string[], rowIndex: number): JSX.Element => {
    const isDisabled = rowIndex !== currentPosition.row;

    return (
      <div key={rowIndex} className="board-row">
        {row.map((cell, cellIndex) => (
          <Cell
            status={isDisabled ? "disabled" : ""}
            key={cellIndex}
            initialValue={cell}
            moveNext={
              cellIndex === row.length - 1
                ? () => moveToNextRow()
                : () => moveToNextCell()
            }
            updateBoard={(value: string) =>
              updateBoard(rowIndex, cellIndex, value)
            }
            validateGuess={() => validateGuess(rowIndex)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="board-container">
      {board.map((row, rowIndex) => renderRow(row, rowIndex))}
    </div>
  );
};
