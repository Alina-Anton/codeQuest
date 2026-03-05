import { useEffect, useState } from "react";

export const useTimer = (duration: number, onExpire: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const reset = () => setTimeLeft(duration);

  return { timeLeft, reset };
};