import {Button, Col, Row} from "react-bootstrap";
import {Progress} from "@/app/progress";
import {CurrentQuestion} from "@/app/current-question";
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Summary} from "@/app/summary";
import {Stopwatch} from "@/app/stopwatch";

export function Game({questionsResponse, exitGame}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [winGame, setWinGame] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [restartCount, setRestartCount] = useState(0);
    const [summaryShow, setSummaryShow] = useState(false);
    const [timerMs, setTimerMs] = useState(0);
    const [stopStopwatch, setStopStopwatch] = useState(false);
    const [renderTimer, setRenderTimer] = useState(true);

    let currentQuestion = questionsResponse.results[currentQuestionIndex];

    useEffect(() => {
        startGame();
    }, []);

    function startGame() {
        setWinGame(false);
        setClicked(false);
        setCorrect(null);
        setCurrentQuestionIndex(0);
        setStopStopwatch(false);
    }

    function startAgain() {
        setRenderTimer(false);
        setTimeout(() => setRenderTimer(true), 1);
        setRestartCount(restartCount + 1);
        startGame();
    }

    function handleCorrectAnswer() {
        setClicked(true);
        setCorrect(true);

        if (currentQuestionIndex === 9) {
            setWinGame(true);
            setSummaryShow(true);
            setStopStopwatch(true);
        }
    }

    function handleIncorrectAnswer() {
        setClicked(true);
        setCorrect(false);
        setStopStopwatch(true);
    }

    function showSummaryModal() {
        setSummaryShow(true);
    }

    function goToNextQuestion() {
        setClicked(false);
        setCorrect(null);

        if (currentQuestionIndex < 9) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    return <>
        <Row style={{marginTop: "15vh"}}>
            <Col>
                <h1>Quiz Game</h1>
            </Col>
            <Col>
                <Button variant="danger" onClick={exitGame}>Exit Game</Button>
            </Col>
            <Col>
                {renderTimer &&
                    <Stopwatch stopStopwatch={stopStopwatch}/>
                }
            </Col>
        </Row>
        <Progress currentQuestionIndex={currentQuestionIndex}/>
        <div>
            <ul className="list-group">
                <CurrentQuestion currentQuestion={currentQuestion}
                                 handleCorrectAnswer={handleCorrectAnswer}
                                 handleIncorrectAnswer={handleIncorrectAnswer}
                                 clicked={clicked}/>
                {correct && !winGame && (
                    <li className="list-group-item">
                        <h2>Correct answer!</h2>
                        <Button variant="primary" onClick={goToNextQuestion}>
                            Next question
                        </Button>
                    </li>
                )}
                {clicked && !correct && (
                    <li className="list-group-item">
                        <h2>Wrong answer!</h2>
                        <Button variant="primary" onClick={startAgain}>
                            Play Again
                        </Button>
                    </li>
                )}
                {correct && winGame && (
                    <li className="list-group-item">
                        <h2>Congratulations!</h2>
                        <Button variant="primary" onClick={showSummaryModal}>
                            See Summary
                        </Button>
                        <Button className="mx-1" variant="primary" onClick={startAgain}>
                            Play Again
                        </Button>
                    </li>
                )}
            </ul>
        </div>
        <Summary
            show={summaryShow}
            onHide={() => setSummaryShow(false)}
            timerMs={timerMs}
        />
    </>;
}

Game.propTypes = {
    questionsResponse: PropTypes.any,
    exitGame: PropTypes.func
};