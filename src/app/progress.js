import { ProgressBar } from "react-bootstrap";

export function Progress({ currentQuestionIndex }) {
  let currentQuestionNumber = currentQuestionIndex + 1;

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
