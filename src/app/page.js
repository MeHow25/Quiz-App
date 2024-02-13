"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {shuffle} from "lodash";
import {Button, Col, ListGroup, Row, Form} from "react-bootstrap";
import {CurrentQuestion} from "@/app/current-question";
import {fetchCategories, fetchData, fetchQuestions} from "@/app/api.service";
import {Progress} from "@/app/progress";
import {Timer} from "@/app/timer";
import {Summary} from "@/app/summary";
import {DifficultyInput} from "@/app/difficulty-input";
import {AnswerTypeInput} from "@/app/answer-type-input";
import {select} from "underscore";

export default function Page() {
    const [response, setResponse] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [winGame, setWinGame] = useState(false);
    const [summaryShow, setSummaryShow] = useState(false);
    const [restartCount, setRestartCount] = useState(0);
    const [toAdd, setToAdd] = useState(0);
    const [timerMs, setTimerMs] = useState(0);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [trueFalseMode, setTrueFalseMode] = useState(false);

    if (response == null && selectedCategory != null && gameStarted) {
        console.log("Trying to fetch questions, because: {}", {
            response, selectedCategory, gameStarted
        });
        console.log("Trying to fetch questions with given params: {}", {
            selectedCategory, selectedDifficulty, trueFalseMode
        });
        fetchQuestions(selectedCategory, selectedDifficulty, trueFalseMode).then((result) => {
            console.log("Questions fetched successfully: {}", result);
            if (result && result.response_code != 5) {
                setResponse(result);
                console.log("Response set as: {}", result);
            }
        });
    }

    useEffect(() => {
        fetchCategories().then((result) => {
            setCategories(result);
            console.log("Categories set: {}", result);
        });
    }, []);

    function setDifficulty(level) {
        setSelectedDifficulty(level);
    }

    function setMode(mode) {
        setTrueFalseMode(mode);
    }

    function handleCorrectAnswer() {
        setClicked(true);
        setCorrect(true);

        if (currentQuestionIndex === 9) {
            setWinGame(true);
            setToAdd(0);
        }
    }

    function handleIncorrectAnswer() {
        setClicked(true);
        setCorrect(false);
        setToAdd(0);
    }

    function startGame() {
        setWinGame(false);
        setClicked(false);
        setCorrect(null);
        setGameStarted(true);
        setCurrentQuestionIndex(0);
        setToAdd(1);
    }

    function startAgain() {
        setRestartCount(restartCount + 1);
        startGame();
    }

    function goToNextQuestion() {
        setClicked(false);
        setCorrect(null);

        if (currentQuestionIndex < 9) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    function showSummaryModal() {
        setSummaryShow(true);
    }

    function onTimerStop(ms) {
        setTimerMs(ms);
    }

    return (
        <div>
            {!gameStarted && (
                <Col md={{span: 4, offset: 4}}>
                    <h1 style={{marginTop: "15vh"}}>Quiz Game</h1>
                    <Form.Label className="mt-3">Category</Form.Label>
                    <Form.Select onChange={(event) => setSelectedCategory(event.target.value)}>
                        <option value="general-category">Any category</option>
                        {categories != null && categories.map((category) => {
                            return <option key={category.id} value={category.id}>{category.name}</option>;
                        })}
                    </Form.Select>
                    <Form.Label className="mt-3">Difficulty</Form.Label>
                    <Col>
                        <DifficultyInput setDifficulty={setDifficulty} />
                    </Col>
                    <Form.Label className="mt-3">True/False answers mode</Form.Label>
                    <Col>
                        <AnswerTypeInput setMode={setMode} />
                    </Col>
                    <Button
                        onClick={startGame}
                        variant="primary"
                        size="lg"
                        className="mt-3"
                    >
                        Start Quiz
                    </Button>
                </Col>
            )}
            {gameStarted && response?.results != null && (
                <>
                    <Row style={{marginTop: "15vh"}}>
                        <Col>
                            <h1>Quiz Game</h1>
                        </Col>
                        <Col>
                            <Timer onTimerStop={onTimerStop} restartCount={restartCount} toAdd={toAdd}/>
                        </Col>
                    </Row>
                    <Progress currentQuestionIndex={currentQuestionIndex}/>
                    <CurrentQuestion
                        goToNextQuestion={goToNextQuestion}
                        currentQuestion={response.results[currentQuestionIndex]}
                        currentQuestionIndex={currentQuestionIndex}
                        clicked={clicked}
                        correct={correct}
                        handleCorrectAnswer={handleCorrectAnswer}
                        handleIncorrectAnswer={handleIncorrectAnswer}
                        startGame={startAgain}
                        winGame={winGame}
                        showSummaryModal={showSummaryModal}
                    />
                </>
            )}
            <Summary
                show={summaryShow}
                onHide={() => setSummaryShow(false)}
                timerMs={timerMs}
            />
        </div>
    );
}
