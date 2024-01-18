import useTimeTracking from "../hooks/useTimeTracking";
import TrackerButton from "../components/ui/buttons/TrackerButton";
import Popup from "../components/Popup";
import { formatDate, formatTime } from "../utils/formatDate";
export default function StartStopTracker({ user }) {
  const { isTracking, startTracking, stopTracking, statusText } =
    useTimeTracking(user);
  const timeTrackingToken = sessionStorage.getItem("timeTrackingToken");
  const startedTime = formatTime(new Date(timeTrackingToken));
  const startedDate = formatDate(new Date(timeTrackingToken));
  return (
    <section className="flex flex-col gap-12 mt-12">
      <div className="flex flex-row gap-12 justify-center items-center">
        <TrackerButton
          type={"submit"}
          label={"Start"}
          onClick={startTracking}
          disabled={isTracking}
        />
        <TrackerButton
          type={"submit"}
          label={"Stop"}
          onClick={stopTracking}
          disabled={!isTracking}
        />
      </div>
      <p className="text-4xl">{statusText}</p>
      {timeTrackingToken && (
        <p>
          Deine Zeit läuft seit: {startedTime}Uhr, den {startedDate}
        </p>
      )}
    </section>
  );
}
