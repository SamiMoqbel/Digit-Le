import "./Cell.scss";

interface CellProps {
  children?: React.ReactNode;
  style: string;
}

export const Cell: React.FC<CellProps> = ({ children, style }) => {
  return <div className={`cell ${style}`}>{children}</div>;
};
