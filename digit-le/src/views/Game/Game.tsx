import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gameover } from "../Gameover";
import { Board } from "./Board";
import { Header } from "./Header";
import { generateRandomDigits } from "../../util/Random";
const isTestEnv = import.meta.env.VITE_TEST_ENV === "development";
import "./Game.scss";

const difficultySettings = {
  easy: { digits: 4, maxAttempts: 5 },
  normal: { digits: 5, maxAttempts: 5 },
  hard: { digits: 9, maxAttempts: 6 },
};

export const Game = () => {
  const { difficulty, name } = useParams();

  const settings =
    difficultySettings[difficulty as keyof typeof difficultySettings];

  const [attemptsLeft, setAttemptsLeft] = useState<number>(
    settings.maxAttempts
  );

  const [won, setWon] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (isTestEnv) {
      setAnswer("1234");
      return;
    } else {
      setAnswer(generateRandomDigits(settings.digits));
    }
  }, []);

  return (
    <>
      {won && <Gameover won={won} />}
      {attemptsLeft === 0 && !won && <Gameover won={won} answer={answer} />}
      <div className="game-container" data-answer={answer}>
        <div className="game-header">
          <Header name={name!} difficulty={difficulty!} settings={settings} />
        </div>
        <Board
          settings={settings}
          setWon={setWon}
          attemptsLeft={attemptsLeft}
          setAttempts={setAttemptsLeft}
          answer={answer}
        />
      </div>
    </>
  );
};
