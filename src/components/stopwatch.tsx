import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStopStopwatch, selectStartedAt } from "@/lib/redux/game-slice";

export function Stopwatch() {
  const start = useSelector(selectStartedAt);
  const stopStopwatch = useSelector(selectStopStopwatch);
  const [now, setNow] = useState(start);
  const [startTimer, setStartTimer] = useState(true);

  useEffect(() => {
    if (startTimer) {
      const id = setInterval(() => {
        setNow(Date.now());
      }, 100);
      return () => {
        clearInterval(id);
      };
    }
    // eslint-disable-next-line
  }, [startTimer]);

  useEffect(() => {
    if (stopStopwatch) {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
    // eslint-disable-next-line
  }, [stopStopwatch]);

  useEffect(() => {
    setNow(start);
  }, [start]);

  const diff = Math.max(0, now - start);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 60000);

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return <h1>{formattedTime}</h1>;
}
