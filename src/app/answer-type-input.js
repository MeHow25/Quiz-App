
import {Button, ButtonGroup} from "react-bootstrap";
import {useState} from "react";

export function AnswerTypeInput({ setMode, mode }) {
    return (
                <ButtonGroup aria-label="Basic example" suppressHydrationWarning>
                    <Button suppressHydrationWarning variant={mode === "disabled" ? "primary" : "secondary"} onClick={()=> setMode("disabled")}>Disabled</Button>
                    <Button suppressHydrationWarning variant={mode === "enabled" ? "primary" : "secondary"} onClick={()=> setMode("enabled")}>Enabled</Button>
                </ButtonGroup>
    )
}