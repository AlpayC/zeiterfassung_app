import landscapeNight from "../../../assets/img/landscape-night.jpg";
import { useState } from "react";
import TrackerButton from "../../../components/ui/buttons/TrackerButton";
import useTimeTracking from "../../../hooks/useTimeTracking";
import TimeAdjustmentComp from "./TimeAdjustmentComp";

export default function FocusTimer({ user }) {
  const { isTracking, startTracking, stopTracking } = useTimeTracking(user);
  const [focusTime, setFocusTime] = useState(30);

  return (
    <article className="card bg-base-300 shadow-xl image-full p-2 focus-timer-box">
      <figure>
        <img
          src={landscapeNight}
          alt="landscape-night"
          className="w-[120%] object-left-bottom"
        />
      </figure>
      <div className="card-body justify-between">
        <h1 className="card-title text-3xl ">Focus Timer </h1>
        <TimeAdjustmentComp focusTime={focusTime} setFocusTime={setFocusTime} />
        <div className="flex flex-row gap-12 justify-center items-center">
          {isTracking ? (
            <TrackerButton
              type={"submit"}
              label={"Stop"}
              onClick={stopTracking}
              disabled={!isTracking}
            />
          ) : (
            <TrackerButton
              type={"submit"}
              label={"Start"}
              onClick={startTracking}
              disabled={isTracking}
            />
          )}
        </div>
      </div>
    </article>
  );
}
