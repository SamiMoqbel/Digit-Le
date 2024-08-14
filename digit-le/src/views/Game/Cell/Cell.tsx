import { useEffect, useState } from "react";
import { vaildNumber } from "../../../util/Validate";
import { CellStyles } from "../../../types/CellStyles";
import "./Cell.scss";

interface CellProps {
  initialValue?: string;
  status?: CellStyles;
  moveNext?: () => void;
  updateBoard?: (value: string) => void;
  validateGuess?: () => void;
}

export const Cell: React.FC<CellProps> = ({
  initialValue = " ",
  status = "disabled",
  moveNext,
  validateGuess,
  updateBoard,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [style, setStyle] = useState<string>(status);

  useEffect(() => {
    setStyle(status);
  }, [status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === "Backspace") {
      setValue(" ");
      return;
    }

    if (key === "Enter") {
      validateGuess?.();
      moveNext?.();
      return;
    }

    if (vaildNumber(key) === false) {
      return;
    }

    setValue(key);
    updateBoard?.(key);
  };

  return (
    <input
      className={`cell ${style}`}
      value={value}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
      disabled={status === "disabled"}
    />
  );
};
