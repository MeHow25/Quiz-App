import { useEffect, useState } from "react";
import moment from "moment/moment";

export function Stopwatch({ stopStopwatch }) {
  const [start] = useState(Date.now());
  const [now, setNow] = useState(start);
  const counter = now - start;
  const [timerInterval, setTimerInterval] = useState([]);
  const [startTimer, setStartTimer] = useState(true);

  useEffect(() => {
    if (startTimer) {
      const id = setInterval(() => {
        setNow(Date.now());
      }, 100);
      setTimerInterval((prev) => {
        prev.push(id);
        return [...prev];
      });
      return () => {
        clearInterval(id);
      };
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (stopStopwatch) {
      pauseTimer();
    } else {
      setStartTimer(true);
    }
    // eslint-disable-next-line
  }, [stopStopwatch]);

  function pauseTimer() {
    timerInterval.forEach((i) => {
      clearInterval(i);
    });
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
