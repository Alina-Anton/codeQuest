import Editor from "@monaco-editor/react";
import { useState } from "react";
import "../../styles/monacoEditor.css";

interface Props {
  initialCode: string;
  onCodeChange?: (code: string) => void;
}

const MonacoCodeEditor = ({ initialCode, onCodeChange }: Props) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  return (
    <div className="vscode-window">

      {/* VS Code titlebar */}
      <div className="vscode-titlebar">
        <div className="vscode-buttons">
          <span className="circle red"></span>
          <span className="circle yellow"></span>
          <span className="circle green"></span>
        </div>

        <div className="vscode-title">VS Code</div>
      </div>

      <Editor
        height="220px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default MonacoCodeEditor;