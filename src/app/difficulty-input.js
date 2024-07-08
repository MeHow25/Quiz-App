import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

export function DifficultyInput({ setDifficulty }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  if (selectedDifficulty) {
    setDifficulty(selectedDifficulty);
  }

  return (
    <ButtonGroup aria-label="Basic example" suppressHydrationWarning>
      <Button
        data-testid={"difficulty-mode-easy"}
        variant={selectedDifficulty === "easy" ? "success" : "secondary"}
        onClick={() => setSelectedDifficulty("easy")}
      >
        Easy
      </Button>
      <Button
        data-testid={"difficulty-mode-medium"}
        variant={selectedDifficulty === "medium" ? "primary" : "secondary"}
        onClick={() => setSelectedDifficulty("medium")}
      >
        Medium
      </Button>
      <Button
        data-testid={"difficulty-mode-hard"}
        variant={selectedDifficulty === "hard" ? "danger" : "secondary"}
        onClick={() => setSelectedDifficulty("hard")}
      >
        Hard
      </Button>
    </ButtonGroup>
  );
}
