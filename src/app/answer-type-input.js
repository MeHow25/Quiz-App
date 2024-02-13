
import {Button, ButtonGroup} from "react-bootstrap";
import {useState} from "react";

export function AnswerTypeInput({ setMode }) {
    const [answerType, setAnswerType] = useState("disabled");

    if (answerType) {
        setMode(answerType);
    }

    return (
                <ButtonGroup aria-label="Basic example" suppressHydrationWarning>
                    <Button suppressHydrationWarning variant={answerType === "disabled" ? "primary" : "secondary"} onClick={()=> setAnswerType("disabled")}>Disabled</Button>
                    <Button suppressHydrationWarning variant={answerType === "enabled" ? "primary" : "secondary"} onClick={()=> setAnswerType("enabled")}>Enabled</Button>
                </ButtonGroup>
    )
}