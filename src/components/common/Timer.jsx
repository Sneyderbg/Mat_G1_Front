import React, { useEffect, useState } from "react";

/**
 *
 * @param {*} props = {initialTime, fnOnTimeFinished}
 */
export function Timer({ initialTime, fnOnTimeFinished }) {
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(new Date(initialTime.getTime()));

  useEffect(() => {
    if (!initialTime) {
      return;
    }
    setTimeLeft(new Date(initialTime.getTime()));
    const oneSec = new Date(1000);

    if (intervalId !== null) {
      // there is already an interval
      return;
    }

    setIntervalId(
      setInterval(() => {
        setTimeLeft((prevTime) => new Date(prevTime - oneSec));
      }, 1000)
    );
  }, [intervalId, initialTime]);

  useEffect(() => {
    if (timeLeft <= new Date(0)) {
      fnOnTimeFinished();
      clearInterval(intervalId);
    }
  }, [timeLeft, intervalId]);

  return (
    <label className="important-label">
      {`${
        timeLeft.getHours() - 19 !== 0
          ? `${`0${timeLeft.getHours()}`.slice(-2)}:`
          : ""
      }${`0${timeLeft.getMinutes()}`.slice(
        -2
      )}:${`0${timeLeft.getSeconds()}`.slice(-2)}`}
    </label>
  );
}
