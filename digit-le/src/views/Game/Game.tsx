import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Cell } from "../../components";
import { Gameover } from "../Gameover";
import { generateRandomDigits } from "../../util/Random";
import { vaildNumber } from "../../util/Validation";
import "./Game.scss";

const difficultySettings = {
  easy: { digits: 4, maxAttempts: 5 },
  normal: { digits: 5, maxAttempts: 6 },
  hard: { digits: 9, maxAttempts: 9 },
};

export const Game = () => {
  const { difficulty } = useParams();

  const settings =
    difficultySettings[difficulty as keyof typeof difficultySettings];

  const [attempts, setAttempts] = useState<number>(settings.maxAttempts);
  const [guessInput, setGuessInput] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    setAnswer(generateRandomDigits(settings.digits));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleInputButton();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guessInput, answer, guesses, attempts, won]);

  const handleInputButton = () => {
    if (guessInput.length !== settings.digits) {
      toast.error("Invalid input. Please enter 4 digits.");
    } else if (vaildNumber(guessInput) === false) {
      toast.error("Invalid input. Please enter only digits.");
    } else if (guessInput === answer) {
      setWon(true);
    } else {
      setGuesses((prevGuesses) => [...prevGuesses, guessInput]);
      setAttempts((prevAttempt) => prevAttempt - 1);
    }
    setGuessInput("");
  };

  const getCellStyle: (cell: string, index: number) => string = (
    cell,
    index
  ): string => {
    if (answer[index] === cell) {
      return "correct";
    } else if (answer.includes(cell)) {
      return "wrong-place";
    } else {
      return "wrong";
    }
  };

  const renderRow: (
    row: string,
    rowIndex: number,
    disabled?: boolean
  ) => JSX.Element = (row, rowIndex, disabled) => (
    <div key={rowIndex} className="board-row">
      {row.split("").map((cell, cellIndex) => (
        <Cell
          style={disabled ? "disabled" : getCellStyle(cell, cellIndex)}
          key={cellIndex}
        >
          {cell}
        </Cell>
      ))}
    </div>
  );

  return (
    <>
      {won && <Gameover won={won} />}
      {attempts === 0 && !won && <Gameover won={won} answer={answer} />}
      <div className="game-container">
        <div className="board-container">
          {guesses.map((row, rowIndex) => renderRow(row, rowIndex))}

          {attempts > 0 &&
            (Array.from({ length: attempts }) as string[])
              .fill("0".repeat(settings.digits))
              .map((row, rowIndex) => renderRow(row, rowIndex, true))}
        </div>
      </div>
    </>
  );
};
