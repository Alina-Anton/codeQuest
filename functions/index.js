const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const answerKey = {
  level1: { type: "code", points: 30 },
  level2: { type: "choice", pointsByOption: { a: 5, b: 30, c: 15 } },
  level3: { type: "choice", pointsByOption: { a: 0, b: 2, c: 20 } },
  level4: { type: "choice", pointsByOption: { a: 0, b: 20 } },
};

const withCors = (res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
};

const validateSubmission = ({ challengeId, submission }) => {
  if (!challengeId || !answerKey[challengeId]) {
    return { status: 400, payload: { error: "Unknown challengeId" } };
  }

  const challenge = answerKey[challengeId];
  if (challenge.type === "code") {
    const code = typeof submission === "string" ? submission : "";
    const correct = code.includes("[count]");
    return {
      status: 200,
      payload: { correct, points: correct ? challenge.points : 0 },
    };
  }

  const optionId = typeof submission === "string" ? submission : "";
  const points = challenge.pointsByOption[optionId] ?? 0;
  return { status: 200, payload: { correct: points > 0, points } };
};

exports.validateAnswer = onRequest({ cors: false }, async (req, res) => {
  withCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body =
      req.body && typeof req.body === "object"
        ? req.body
        : JSON.parse(req.rawBody?.toString("utf8") || "{}");

    const result = validateSubmission(body);
    res.status(result.status).json(result.payload);
  } catch (error) {
    logger.error("validateAnswer failed", error);
    res.status(400).json({ error: "Invalid JSON payload" });
  }
});
