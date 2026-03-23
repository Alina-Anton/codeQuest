import "../../styles/levels.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="level-container">
      <div className="level-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;