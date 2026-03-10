import "../../styles/button.css";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button className="dev-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;