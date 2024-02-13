import { Button } from "react-bootstrap";

export function Answer({
  answer,
  clicked,
  handleCorrectAnswer,
  handleIncorrectAnswer,
}) {
  const onClick = answer.is_correct
    ? handleCorrectAnswer
    : handleIncorrectAnswer;
  const backgroundColorIfClicked = answer.is_correct ? "success" : "danger";

  return (
    <li key={answer.value} className="list-group-item p-0">
      <Button
        size="lg"
        onClick={!clicked ? onClick : null}
        className="rounded-0 w-100 p-3"
        variant={clicked ? backgroundColorIfClicked : "light"}
        active={clicked}
      >
        {answer.value}
      </Button>
    </li>
  );
}
