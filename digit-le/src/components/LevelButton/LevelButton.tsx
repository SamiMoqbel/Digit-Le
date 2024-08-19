import "./LevelButton.scss";

interface LevelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const LevelButton: React.FC<LevelButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="level-button">
      {children}
    </button>
  );
};
