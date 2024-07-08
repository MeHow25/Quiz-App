import { Button, ButtonGroup } from "react-bootstrap";

export function AnswerTypeInput({ setMode, mode }) {
  return (
    <ButtonGroup aria-label="Basic example" suppressHydrationWarning>
      <Button
        data-testid={"true-false-disabled"}
        suppressHydrationWarning
        variant={mode === "disabled" ? "primary" : "secondary"}
        onClick={() => setMode("disabled")}
      >
        Disabled
      </Button>
      <Button
        data-testid={"true-false-enabled"}
        suppressHydrationWarning
        variant={mode === "enabled" ? "primary" : "secondary"}
        onClick={() => setMode("enabled")}
      >
        Enabled
      </Button>
    </ButtonGroup>
  );
}
