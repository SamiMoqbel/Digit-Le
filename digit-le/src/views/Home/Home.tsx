import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  const [name, setName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
      <Link to={`board/${name ? name : "guest"}`} className="start-button">
        Start Game
      </Link>
    </div>
  );
};
