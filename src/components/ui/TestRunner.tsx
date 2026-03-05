import { useEffect, useState } from "react";

interface Props {
  success: boolean;
}

const logsSuccess = [
  "Running test suite...",
  "Checking dependencies...",
  "Validating state updates...",
  "All tests passed ✅",
];

const logsFail = [
  "Running test suite...",
  "Checking dependencies...",
  "Test failed ❌",
  "Missing dependency in useEffect",
];

const FakeTestRunner = ({ success }: Props) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    const logs = success ? logsSuccess : logsFail;
    let index = 0;

    const interval = setInterval(() => {
      setVisibleLogs((prev) => [...prev, logs[index]]);
      index++;
      if (index >= logs.length) clearInterval(interval);
    }, 800);

    return () => clearInterval(interval);
  }, [success]);

  return (
    <div style={{ background: "#111", color: "#0f0", padding: "1rem" }}>
      {visibleLogs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
};

export default FakeTestRunner;