import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LevelButton } from "../../components/LevelButton";
import "./Home.scss";

type Levels = "easy" | "normal" | "hard";

export const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLevelButton = (level: Levels) => {
    if (name.trim()) {
      navigate(`/board/${level}/${name}`);
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
        onChange={(e) => handleNameChange(e)}
      />
      <LevelButton onClick={() => handleLevelButton("easy")}>
        Easy Difficulty (4 digits)
      </LevelButton>
      <LevelButton onClick={() => handleLevelButton("normal")}>
        Normal Difficulty (5 digits)
      </LevelButton>
      <LevelButton onClick={() => handleLevelButton("hard")}>
        Hard Difficulty (9 digits)
      </LevelButton>
    </div>
  );
};
