import { useEffect, useState } from "react";
import {
  useGameStore,
  selectStopStopwatch,
  selectStartedAt,
} from "@/lib/store/game-store";

export function Stopwatch() {
  const start = useGameStore(selectStartedAt);
  const stopStopwatch = useGameStore(selectStopStopwatch);
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
  }, [startTimer]);

  useEffect(() => {
    if (stopStopwatch) {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
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
