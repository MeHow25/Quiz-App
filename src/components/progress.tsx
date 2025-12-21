import { ProgressBar } from "react-bootstrap";

interface ProgressProps {
  currentQuestionIndex: number;
}

export function Progress({ currentQuestionIndex }: ProgressProps) {
  const currentQuestionNumber = currentQuestionIndex + 1;

  return (
    <ProgressBar
      className="mb-1"
      style={{ height: "4vh" }}
      min={1}
      max={10}
      now={currentQuestionNumber}
    />
  );
}
