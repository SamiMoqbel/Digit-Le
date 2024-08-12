import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Cell } from "../../components";
import { Gameover } from "../Gameover";
import { generateRandomDigits } from "../../util/Random";
import "./GameBoard.scss";

export const GameBoard = () => {
  const digits = 4;
  const [attempts, setAttempts] = useState<number>(5);
  const [guessInput, setGuessInput] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [won, setWon] = useState<boolean>(false);
  const [revealedDigits, setRevealedDigits] = useState<string[]>(
    Array(digits).fill("_")
  );

  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setAnswer(generateRandomDigits(digits));
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
  }, [guessInput, answer, guesses, attempts, revealedDigits, won]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuessInput(e.target.value);
  };

  const handleInputButton = () => {
    if (guessInput.length !== 4) {
      toast.error("Invalid input. Please enter 4 digits.");
    } else if (guessInput.match(/[^0-9]/)) {
      toast.error("Invalid input. Please enter only digits.");
    } else if (guessInput === answer) {
      setRevealedDigits(answer.split(""));
      setWon(true);
    } else {
      const updatedRevealedDigits = revealedDigits.map((digit, index) => {
        return answer[index] === guessInput[index] ? guessInput[index] : digit;
      });

      setRevealedDigits(updatedRevealedDigits);
      setGuesses((prevGuesses) => [...prevGuesses, guessInput]);
      setAttempts((prevAttempt) => prevAttempt - 1);
    }
    setGuessInput("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        <div className="controls-container">
          <div className="inputs-container">
            <input
              ref={inputRef}
              className="guessInput-input"
              type="text"
              placeholder="0000"
              value={guessInput}
              onChange={handleChange}
            />
            <button className="guessInput-button" onClick={handleInputButton}>
              Try!
            </button>
          </div>
          <h2 className="hidden-digits">{revealedDigits.join(" ")}</h2>
        </div>
        <div className="board-container">
          {guesses.map((row, rowIndex) => renderRow(row, rowIndex))}

          {attempts > 0 &&
            (Array.from({ length: attempts }) as string[])
              .fill("0000")
              .map((row, rowIndex) => renderRow(row, rowIndex, true))}
        </div>
      </div>
    </>
  );
};
