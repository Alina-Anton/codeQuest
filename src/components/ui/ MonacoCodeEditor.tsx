import Editor from "@monaco-editor/react";
import { useState } from "react";
import Button from "../ui/Button";


interface Props {
  initialCode: string;
  validate: (code: string) => boolean;
  onSuccess: () => void;
}

const MonacoCodeEditor = ({ initialCode, validate, onSuccess }: Props) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");

  const handleRun = () => {
    if (validate(code)) {
      setError("");
      onSuccess();
    } else {
      setError("❌ Tests failing. Check your dependency array.");
    }
  };

  return (
    <div>
      <Editor
        height="200px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
      <Button  onClick={handleRun}>Run Tests</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MonacoCodeEditor;