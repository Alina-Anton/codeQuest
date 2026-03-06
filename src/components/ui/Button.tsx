import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "6px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;