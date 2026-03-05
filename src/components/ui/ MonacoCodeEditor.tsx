// import Editor from "@monaco-editor/react";
// import { useState } from "react";

// interface Props {
//   initialCode: string;
//   validate: (code: string) => boolean;
//   onSuccess: () => void;
// }

// const MonacoCodeEditor = ({ initialCode, validate, onSuccess }: Props) => {
//   const [code, setCode] = useState(initialCode);
//   const [error, setError] = useState("");

//   const handleRun = () => {
//     if (validate(code)) {
//       setError("");
//       onSuccess();
//     } else {
//       setError("❌ Tests failing. Check your dependency array.");
//     }
//   };

//   return (
//     <div>
//       <Editor
//         height="300px"
//         defaultLanguage="typescript"
//         theme="vs-dark"
//         value={code}
//         onChange={(value) => setCode(value || "")}
//         options={{
//           fontSize: 14,
//           minimap: { enabled: false },
//           automaticLayout: true,
//         }}
//       />

//       <button onClick={handleRun}>Run Tests</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default MonacoCodeEditor;