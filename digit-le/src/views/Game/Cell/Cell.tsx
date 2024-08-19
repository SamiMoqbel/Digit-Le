import { forwardRef, useEffect, useState } from "react";
import { vaildNumber } from "../../../util/Validate";
import { CellStyles } from "../../../types/CellStyles";
import "./Cell.scss";

interface CellProps {
  initialValue?: string;
  cellStyle?: CellStyles;
  moveToCell?: (offset: number) => void;
  moveToNextRow?: () => void;
  updateBoard?: (value: string) => void;
  validateGuess?: () => void;
  isLastCell?: boolean;
}

export type CellRef = HTMLInputElement;

export const Cell = forwardRef<CellRef, CellProps>(
  (
    {
      initialValue = " ",
      cellStyle = "disabled",
      moveToCell,
      moveToNextRow,
      validateGuess,
      updateBoard,
      isLastCell = false,
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(initialValue);
    const [style, setStyle] = useState<string>(cellStyle);

    useEffect(() => {
      setStyle(cellStyle);
    }, [cellStyle]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;

      if (key === "Backspace") {
        setValue(" ");
        updateBoard?.(" ");
        moveToCell?.(-1);
        return;
      }

      if (key === "Enter") {
        if (value === " ") return;
        validateGuess?.();
        moveToNextRow?.();
        return;
      }

      if (vaildNumber(key) === true) {
        setValue(key);
        updateBoard?.(key);
        if (!isLastCell) {
          moveToCell?.(1);
        }
      }
    };

    return (
      <input
        className={`cell ${style}`}
        value={value}
        ref={ref}
        onKeyDown={handleKeyDown}
        onChange={() => {}}
        disabled={cellStyle === "disabled"}
      />
    );
  }
);
