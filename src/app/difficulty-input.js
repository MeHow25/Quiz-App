
import {Button, ButtonGroup} from "react-bootstrap";
import {useState} from "react";

export function DifficultyInput({ setDifficulty }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    if (selectedDifficulty) {
        setDifficulty(selectedDifficulty);
    }

    return (
                <ButtonGroup aria-label="Basic example" suppressHydrationWarning>
                    <Button variant={selectedDifficulty === "easy" ? "success" : "secondary"} onClick={()=> setSelectedDifficulty("easy")}>Easy</Button>
                    <Button variant={selectedDifficulty === "medium" ? "primary" : "secondary"} onClick={()=> setSelectedDifficulty("medium")}>Medium</Button>
                    <Button variant={selectedDifficulty === "hard" ? "danger" : "secondary"} onClick={()=> setSelectedDifficulty("hard")}>Hard</Button>
                </ButtonGroup>
    )
}