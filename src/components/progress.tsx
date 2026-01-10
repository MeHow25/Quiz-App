import { ProgressBar } from "react-bootstrap";

interface ProgressProps {
  currentQuestionIndex: number;
}

export function Progress({ currentQuestionIndex }: ProgressProps) {
  const currentQuestionNumber = currentQuestionIndex + 1;

  return (
    <ProgressBar
      className="mb-1 progress-bar-custom"
      min={1}
      max={10}
      now={currentQuestionNumber}
    />
  );
}
