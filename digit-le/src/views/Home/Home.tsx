import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Home.scss";

type Levels = "easy" | "normal" | "hard";

export const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStartButton = (level: Levels) => {
    if (name) {
      navigate(`/board/${level}`);
    } else {
      toast.error("Please enter your name");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Digit-Le</h1>
      <input
        className="name-input"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => handleStartButton("easy")} className="start-button">
        Easy Difficulty (4 digits)
      </button>
      <button onClick={() => handleStartButton("normal")} className="start-button">
        Normal Difficulty (5 digits)
      </button>
      <button onClick={() => handleStartButton("hard")} className="start-button">
        Hard Difficulty (9 digits)
      </button>
    </div>
  );
};
