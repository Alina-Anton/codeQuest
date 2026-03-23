import React, { createContext, useContext, useState, type ReactNode } from "react";

type Level = 0 | 1 | 2 | 3 | 4 | 5;

interface GameContextType {
  currentLevel: Level;
  score: number;
  nextLevel: () => void;
  addScore: (points: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState<Level>(0);
  const [score, setScore] = useState(0);

  const nextLevel = () => {
    setCurrentLevel((prev) => (prev < 5 ? ((prev + 1) as Level) : prev));
  };

  const addScore = (points: number) => {
    setScore((prev) => prev + points);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
  };

  return (
    <GameContext.Provider
      value={{ currentLevel, score, nextLevel, addScore, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};