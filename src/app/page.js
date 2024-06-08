"use client";

import {useEffect, useState} from "react";
import {Button, Col, Form, Spinner, Toast} from "react-bootstrap";
import {fetchCategories, fetchQuestions} from "@/app/api.service";
import {Summary} from "@/app/summary";
import {DifficultyInput} from "@/app/difficulty-input";
import {AnswerTypeInput} from "@/app/answer-type-input";
import {Game} from "@/app/game";
import {ErrorToast} from "@/app/error-toast";
import Stopwatch from "@/app/stopwatch";
import TimerB from "@/app/stopwatch";
// todo
// fetch loading
// fetch errors handling
export default function Page() {
    const [questionsResponse, setQuestionsResponse] = useState(null);
    const [noResults, setNoResults] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [trueFalseMode, setTrueFalseMode] = useState("disabled");
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

    useEffect(() => {
        fetchCategories().then((result) => {
            setCategories(result);
        });
    }, []);

    function setDifficulty(level) {
        setSelectedDifficulty(level);
    }

    function startGame() {
        setIsFetchingQuestions(true);
        fetchQuestions(selectedCategory, selectedDifficulty, trueFalseMode).then((result) => {
            setIsFetchingQuestions(false);
            if (result == null || result === "noResults") {
                setNoResults(true);
            } else {
                setNoResults(false);
                setGameStarted(true);
                setQuestionsResponse(result);
            }
        });
    }

    function exitGame() {
        setGameStarted(false);
        setQuestionsResponse(null);
    }

    return (
        <div>
            {!questionsResponse?.results && (
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
                        <DifficultyInput setDifficulty={setDifficulty}/>
                    </Col>
                    <Form.Label className="mt-3">True/False answers mode</Form.Label>
                    <Col>
                        <AnswerTypeInput setMode={setTrueFalseMode} mode={trueFalseMode}/>
                    </Col>
                    {isFetchingQuestions && (
                        <Spinner className="mt-4" animation="border" variant="primary" />
                    )}
                    {!isFetchingQuestions && (
                        <Button
                            onClick={startGame}
                            variant="primary"
                            size="lg"
                            className="mt-3"
                        >
                            Start Quiz
                        </Button>
                    )}
                    <ErrorToast className="d-inline-block m-1" onClose={() => setNoResults(false)} show={noResults}></ErrorToast>
                </Col>
            )}
            {gameStarted && questionsResponse?.results != null && (
                <Game questionsResponse={questionsResponse}
                      startGame={startGame}
                      exitGame={exitGame}
                />
            )}
        </div>
    );
}
