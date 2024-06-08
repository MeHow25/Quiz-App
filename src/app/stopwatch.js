import {useEffect, useState} from "react";
import moment from "moment/moment";

export function Stopwatch({stopStopwatch}) {
    const [start] = useState(Date.now());
    const [now, setNow] = useState(start);
    const counter = now - start;
    const [timerInterval, setTimerInterval] = useState([]);
    const [startTimer, setStartTimer] = useState(true);

    useEffect(function () {
        console.log("use deffect", {startTimer, timerInterval})
        if (startTimer) {
            const id = setInterval(function () {
                setNow(Date.now());
            }, 100);
            setTimerInterval((prev) => {
                prev.push(id);
                return [...prev];
            });
            return () => {
                console.log("gonwo")
                clearInterval(id);
            };
        }
    }, []);

    useEffect(() => {
        console.log(stopStopwatch);
        if (stopStopwatch) {
            pauseTimer();
        } else {
            setStartTimer(true);
        }
    }, [stopStopwatch]);

    function pauseTimer() {
            timerInterval.forEach((i) => {
                clearInterval(i);
            })
    }

    return (
        <h1>
            {moment()
                .set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: counter,
                })
                .format("m:ss")}
        </h1>
    );
}
