import useCountDown from "../../../hooks/useCountDown";

export default function CountDownDisplay({
  countDown,
  setCountDown,
  isTracking,
}) {
  const { hoursCounter, secondsCounter, minutesCounter } = useCountDown({
    countDown,
    setCountDown,
    isTracking,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown text-5xl">
            <span style={{ "--value": hoursCounter }}></span>
          </span>
          h
        </div>
        <div className="flex flex-col">
          <span className="countdown text-5xl">
            <span style={{ "--value": minutesCounter }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col">
          <span className="countdown text-5xl">
            <span style={{ "--value": secondsCounter }}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}
