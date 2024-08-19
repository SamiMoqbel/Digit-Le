import "./Header.scss";

interface HeaderProps {
  name: string;
  difficulty: string;
  settings: { digits: number };
}

export const Header: React.FC<HeaderProps> = ({
  name,
  difficulty,
  settings,
}) => {
  return (
    <>
      <h1 className="game-title">Digit-Le</h1>
      <p className="game-subtitle">
        {name?.toUpperCase()} - {difficulty!.toUpperCase()}- {settings.digits}{" "}
        digits
      </p>
    </> 
  );
};
