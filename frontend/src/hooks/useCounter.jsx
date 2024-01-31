import { useState, useEffect } from "react";

export default function useCounter({
  countValue,
  setCountValue,
  isTracking,
  direction,
}) {
  const [hoursCounter, setHoursCounter] = useState();
  const [minutesCounter, setMinutesCounter] = useState();
  const [secondsCounter, setSecondsCounter] = useState();

  useEffect(() => {
    const hours = Math.floor(countValue / 3600);
    const minutes = Math.floor((countValue % 3600) / 60);
    const seconds = countValue % 60;

    setHoursCounter(hours);
    setMinutesCounter(minutes);
    setSecondsCounter(seconds);
  }, [countValue]);

  useEffect(() => {
    const interval =
      isTracking &&
      setInterval(() => {
        setCountValue((prevCountDown) => {
          if (direction === "up") {
            return prevCountDown + 1;
          } else {
            return prevCountDown - 1;
          }
        });
      }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, setCountValue, direction]);

  return { hoursCounter, minutesCounter, secondsCounter };
}
