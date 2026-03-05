import { ReactNode } from "react";
import { useGame } from "../../context/GameContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { score } = useGame();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>HIRE.ME()</h1>
      <p>An interactive frontend engineering simulation</p>
      <p>Score: {score}</p>
      <hr />
      {children}
    </div>
  );
};

export default Layout;