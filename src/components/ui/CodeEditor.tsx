import { useState } from "react";

interface Props {
  initialCode: string;
  validate: (code: string) => boolean;
  onSuccess: () => void;
}

const CodeEditor = ({ initialCode, validate, onSuccess }: Props) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (validate(code)) {
      onSuccess();
    } else {
      setError("❌ Not quite right. Think about dependency arrays.");
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
          fontFamily: "monospace",
          background: "#111",
          color: "#0f0",
          padding: "1rem",
        }}
      />
      <button onClick={handleSubmit}>Run Fix</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CodeEditor;