import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

type ValidateAnswerRequest = {
  challengeId: "level1" | "level2" | "level3" | "level4";
  submission: string;
};

type ValidateAnswerResponse = {
  correct: boolean;
  points: number;
  error?: string;
};

const getPointsForSubmission = (payload: ValidateAnswerRequest): number => {
  if (payload.challengeId === "level1") {
    return payload.submission.includes("[count]") ? 30 : 0;
  }

  if (payload.challengeId === "level2") {
    const pointsByOption: Record<string, number> = { a: 5, b: 30, c: 15 };
    return pointsByOption[payload.submission] ?? 0;
  }

  if (payload.challengeId === "level3") {
    const pointsByOption: Record<string, number> = { a: 0, b: 2, c: 20 };
    return pointsByOption[payload.submission] ?? 0;
  }

  const pointsByOption: Record<string, number> = { a: 0, b: 20 };
  return pointsByOption[payload.submission] ?? 0;
};

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Validation timeout")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

export const validateAnswer = async (
  payload: ValidateAnswerRequest,
): Promise<ValidateAnswerResponse> => {
  const points = getPointsForSubmission(payload);
  const isCorrect = points > 0;

  // Fast-fail obviously wrong debug submissions without waiting on network.
  if (payload.challengeId === "level1" && !isCorrect) {
    return { correct: false, points: 0 };
  }

  try {
    await withTimeout(
      addDoc(collection(db, "challengeAttempts"), {
        challengeId: payload.challengeId,
        submission: payload.submission,
        createdAt: serverTimestamp(),
      }),
      1500,
    );
  } catch {
    // Keep gameplay responsive when Firestore is slow/unreachable.
    return { correct: isCorrect, points };
  }

  return { correct: isCorrect, points };
};
