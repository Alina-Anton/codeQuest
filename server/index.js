import http from "node:http";

const PORT = Number(process.env.PORT) || 3001;

const answerKey = {
  level1: { type: "code", points: 30 },
  level2: { type: "choice", pointsByOption: { a: 5, b: 30, c: 15 } },
  level3: { type: "choice", pointsByOption: { a: 0, b: 2, c: 20 } },
  level4: { type: "choice", pointsByOption: { a: 0, b: 20 } },
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });

const validateSubmission = ({ challengeId, submission }) => {
  if (!challengeId || !answerKey[challengeId]) {
    return { status: 400, payload: { error: "Unknown challengeId" } };
  }

  const challenge = answerKey[challengeId];

  if (challenge.type === "code") {
    const code = typeof submission === "string" ? submission : "";
    const correct = code.includes("[count]");
    return { status: 200, payload: { correct, points: correct ? challenge.points : 0 } };
  }

  const optionId = typeof submission === "string" ? submission : "";
  const points = challenge.pointsByOption[optionId] ?? 0;
  return { status: 200, payload: { correct: points > 0, points } };
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === "POST" && req.url === "/api/validate-answer") {
    try {
      const body = await parseBody(req);
      const result = validateSubmission(body);
      sendJson(res, result.status, result.payload);
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Bad request" });
    }
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Validation API running on http://localhost:${PORT}`);
});
