import { useGame } from "../../context/GameContext";
import "../../styles/levels.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { score } = useGame();

  return (
    <div className="level-container">

      <div className="level-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;