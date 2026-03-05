import { useEffect, useState } from "react";

interface Props {
  from: number;
  to: number;
}

const LighthouseScore = ({ from, to }: Props) => {
  const [score, setScore] = useState(from);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= to) {
          clearInterval(interval);
          return to;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [to]);

  const color =
    score > 89 ? "green" : score > 50 ? "orange" : "red";

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <h3>Lighthouse Performance</h3>
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color,
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default LighthouseScore;