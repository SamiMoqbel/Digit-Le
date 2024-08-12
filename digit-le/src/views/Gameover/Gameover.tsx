import { Modal } from "../../components/";
import "./Gameover.scss";

interface GameoverProps {
  won: boolean;
  answer?: string;
}

export const Gameover: React.FC<GameoverProps> = ({ won, answer }) => {
  const wonMessage = "Congratulations! You've guessed the correct number.";
  const lostMessage = `Sorry, you've run out of attempts. The correct answer was: ${answer}`;

  const handlePlayButton = () => {
    window.location.reload();
  };

  return (
    <Modal>
      <h1 className="result-title">Game Over!!</h1>
      <p className="result-desc">{won ? wonMessage : lostMessage}</p>
      <button className="result-button" onClick={handlePlayButton}>Play Again</button>
    </Modal>
  );
};
