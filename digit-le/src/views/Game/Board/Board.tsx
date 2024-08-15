import React, { useEffect, useState } from "react";
import { Cell } from "../Cell";
import "./Board.scss";
import { CellStyles } from "../../../types/CellStyles";

interface BoardProps {
  settings: { digits: number; maxAttempts: number };
  setWon: (won: boolean) => void;
  setAttempts: (attempts: number) => void;
  attemptsLeft: number;
  answer: string;
}

interface CellData {
  value: string;
  cellStyle: CellStyles;
}

export const Board: React.FC<BoardProps> = ({
  settings,
  setWon,
  setAttempts,
  attemptsLeft,
  answer,
}) => {
  const initialBoard: CellData[][] = Array.from(
    { length: settings.maxAttempts },
    () =>
      Array.from({ length: settings.digits }, () => ({
        value: " ",
        cellStyle: "disabled",
      }))
  );

  const inputRefs: React.RefObject<HTMLInputElement>[][] = Array.from(
    { length: settings.maxAttempts },
    () =>
      Array.from({ length: settings.digits }, () =>
        React.createRef<HTMLInputElement>()
      )
  );

  const [board, setBoard] = useState<CellData[][]>(initialBoard);
  const [currentPosition, setCurrentPosition] = useState<{
    row: number;
    cell: number;
  }>({ row: 0, cell: 0 });

  useEffect(() => {
    inputRefs[currentPosition.row][currentPosition.cell].current?.focus();
  }, [currentPosition]);

  // Sami: This function is Used in the cell to update the board whenever a value is entered
  const updateBoard = (rowIndex: number, cellIndex: number, value: string) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][cellIndex] = {
      ...updatedBoard[rowIndex][cellIndex],
      value,
    };
    setBoard(updatedBoard);
  };

  // Sami: This function is used to validate the guess and update the cell styles accordingly
  const validateGuess = (rowIndex: number) => {
    // Sami: Get the guess from the row and check if it is the same length as the answer (full row!)
    const guess = board[rowIndex]
      .map((cell) => cell.value)
      .join("")
      .trim();
    if (guess.length !== settings.digits) {
      return;
    }

    // Sami: update the cell styles based on the feedback
    setCellsStyle(rowIndex);

    // Sami: Check if the guess is correct end the game, else decrease the attempts
    const correct = guess === answer;
    if (correct) {
      setWon(true);
    } else {
      const attempts = attemptsLeft - 1;
      setAttempts(attempts);
    }
  };

  // Sami: This function is used to update the cell styles
  //  based on the answer (Also sure to handle duplicates)
  const setCellsStyle = (rowIndex: number) => {
    const updatedBoard = [...board];
    const answerArray = answer.split("");

    updatedBoard[rowIndex].forEach((cell, index) => {
      if (cell.value === answerArray[index]) {
        updatedBoard[rowIndex][index].cellStyle = "correct";
        answerArray[index] = "";
      }
    });

    updatedBoard[rowIndex].forEach((cell, index) => {
      if (updatedBoard[rowIndex][index].cellStyle !== "correct") {
        const misplacedIndex = answerArray.indexOf(cell.value);
        if (misplacedIndex !== -1) {
          updatedBoard[rowIndex][index].cellStyle = "misplaced";
          answerArray[misplacedIndex] = "";
        } else {
          updatedBoard[rowIndex][index].cellStyle = "incorrect";
        }
      }
    });

    setBoard(updatedBoard);
  };

  // Sami: Moves and focus the next cell in the row if this is not the last cell (1 forward, -1 backward)
  const moveToCell = (offset: number) => {
    const { row, cell } = currentPosition;

    const newCell = cell + offset;

    if (newCell >= 0 && newCell < settings.digits) {
      setCurrentPosition({ row, cell: newCell });
    }
  };

  // Sami: Moves and focus the first cell in the next row if this is last
  const moveToNextRow = () => {
    const { row } = currentPosition;
    if (row < settings.maxAttempts - 1) {
      setCurrentPosition({ row: row + 1, cell: 0 });
    }
  };

  // Sami: This function is used to render rows of the board
  const renderRow = (row: CellData[], rowIndex: number): JSX.Element => {
    const isActive = rowIndex === currentPosition.row;
    return (
      <div key={rowIndex} className="board-row">
        {row.map((cell, cellIndex) => (
          <Cell
            cellStyle={isActive ? "" : (cell.cellStyle as CellStyles)}
            key={cellIndex}
            initialValue={cell.value}
            ref={inputRefs[rowIndex][cellIndex]}
            updateBoard={(value: string) =>
              updateBoard(rowIndex, cellIndex, value)
            }
            moveToCell={(offset) => moveToCell(offset)}
            moveToNextRow={moveToNextRow}
            validateGuess={() => validateGuess(rowIndex)}
            isLastCell={cellIndex === settings.digits - 1}
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
