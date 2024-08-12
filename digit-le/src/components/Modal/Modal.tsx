import "./Modal.scss";

interface ModalProps {
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="outlayer">
      <div className="modal">{children}</div>
    </div>
  );
};
