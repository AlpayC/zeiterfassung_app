import landscapeNight from "../../../assets/img/landscape-night.jpg";
import { useState, useEffect } from "react";
import TrackerButton from "../../../components/ui/buttons/TrackerButton";
import TimeAdjustmentComp from "./TimeAdjustmentComp";
import CountDownDisplay from "./CountDownDisplay";

export default function FocusTimer({ user }) {
  // const { isTracking, startTracking, stopTracking } = useTimeTracking(user);
  const [focusTime, setFocusTime] = useState(30);
  const [isTracking, setIsTracking] = useState(false);
  const [countDown, setCountDown] = useState();

  const stopTracking = () => {
    setIsTracking(false);
    setCountDown();
  };
  const startTracking = () => {
    setIsTracking(true);
    setCountDown(focusTime * 60);
  };

  useEffect(() => {
    setCountDown(focusTime * 60);
  }, [focusTime]);

  return (
    <article className="card bg-base-300 shadow-xl image-full p-2 focus-timer-box rounded-2xl">
      <figure>
        <img
          src={landscapeNight}
          alt="landscape-night"
          className="w-[120%] object-left-bottom"
        />
      </figure>
      <div className="card-body justify-between">
        <h1 className="card-title text-3xl ">Focus Timer </h1>
        <TimeAdjustmentComp
          focusTime={focusTime}
          setFocusTime={setFocusTime}
          isTracking={isTracking}
        />
        <CountDownDisplay
          isTracking={isTracking}
          countDown={countDown}
          setCountDown={setCountDown}
        />
        <div className="flex flex-row gap-12 justify-center items-center">
          {isTracking ? (
            <TrackerButton
              type={"submit"}
              label={"Stop"}
              onClick={stopTracking}
              disabled={false}
              trackingType={"Pomodoro"}
            />
          ) : (
            <TrackerButton
              type={"submit"}
              label={"Start"}
              onClick={startTracking}
              disabled={isTracking}
              trackingType={"Pomodoro"}
            />
          )}
        </div>
      </div>
    </article>
  );
}
