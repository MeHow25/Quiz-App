import { Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard" | null;

interface DifficultyInputProps {
  setDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultyInput({ setDifficulty }: DifficultyInputProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>(null);

  useEffect(() => {
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty);
    }
  }, [selectedDifficulty, setDifficulty]);

  return (
    <ButtonGroup aria-label="difficulty mode" suppressHydrationWarning>
      <Button
        data-testid="difficulty-mode-easy"
        variant={selectedDifficulty === "easy" ? "success" : "secondary"}
        onClick={() => setSelectedDifficulty("easy")}
      >
        Easy
      </Button>
      <Button
        data-testid="difficulty-mode-medium"
        variant={selectedDifficulty === "medium" ? "primary" : "secondary"}
        onClick={() => setSelectedDifficulty("medium")}
      >
        Medium
      </Button>
      <Button
        data-testid="difficulty-mode-hard"
        variant={selectedDifficulty === "hard" ? "danger" : "secondary"}
        onClick={() => setSelectedDifficulty("hard")}
      >
        Hard
      </Button>
    </ButtonGroup>
  );
}
