import { useEffect, useState } from "react";
import moment from "moment";

export function Timer({ toAdd, restartCount, onTimerStop }) {
  const [milliseconds, setMilliseconds] = useState(0);
  const [timerRestartCount, setTimerRestartCount] = useState(false);

  useEffect(() => {
    if (timerRestartCount) {
      setMilliseconds(0);
    }
  }, [timerRestartCount])

  useEffect(() => {
    if (toAdd === 0) {
      onTimerStop(milliseconds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toAdd, onTimerStop]);

  useEffect(() => {
    const interval = setInterval(() => {
        setMilliseconds((ms) => ms + toAdd);
    }, 10);
    return () => clearInterval(interval);
  }, [toAdd, milliseconds]);

  useEffect(() => {
    setTimerRestartCount(restartCount);
  }, [restartCount]);

  return (
    <h1>
      {moment()
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: milliseconds * 10,
        })
        .format("m:ss")}{" "}
    </h1>
  );
}
