import { useEffect, useState } from "react";

/**
 *
 * @param {*} props = {initialTime, fnOnTimeFinished}
 */
export function Timer(props) {
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(new Date(props.initialTime.getTime()));

  useEffect(() => {
    if (!props.initialTime) {
      return;
    }
    setTimeLeft(new Date(props.initialTime.getTime()));
    const oneSec = new Date(1000);

    if (intervalId !== null) {
      // there is already an interval
      return;
    }

    setIntervalId(
      setInterval(() => {
        setTimeLeft((prevTime) => {
          return new Date(prevTime - oneSec);
        });
      }, 1000)
    );
  }, [intervalId, props.initialTime]);

  useEffect(() => {
    if (timeLeft <= new Date(0)) {
      props.fnOnTimeFinished();
      clearInterval(intervalId);
    }
  }, [timeLeft, intervalId, props]);

  return (
    <label className="important-label">
      {`${timeLeft.getHours() - 19 !== 0 ? ("0" + timeLeft.getHours()).slice(-2) + ":" : ""}${(
        "0" + timeLeft.getMinutes()
      ).slice(-2)}:${("0" + timeLeft.getSeconds()).slice(-2)}`}
    </label>
  );
}
