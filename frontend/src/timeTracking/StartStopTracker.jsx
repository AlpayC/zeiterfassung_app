import useTimeTracking from "../hooks/useTimeTracking";
import TrackerButton from "../components/ui/buttons/TrackerButton";
import {
  formatDate,
  formatTime,
  calculateTimeDifferenceInSeconds,
} from "../utils/formatDate";
import CounterDisplay from "../components/ui/counter/CounterDisplay";
import { useState, useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";

export default function StartStopTracker({ user }) {
  const { showAlert } = useContext(AlertContext);

  const [countValue, setCountValue] = useState(0);
  const { isTracking, startTracking, stopTracking, statusText, startDate } =
    useTimeTracking(user);
  const startedTime = formatTime(new Date(startDate));
  const startedDate = formatDate(new Date(startDate));
  const currentTime = formatTime(new Date());
  const difference = calculateTimeDifferenceInSeconds(currentTime, startedTime);

  useEffect(() => {
    showAlert(statusText, "alert-info", 3000);
  }, [statusText]);
  console.log(countValue);
  return (
    <section className="mt-12  card task-box p-4 rounded-2xl bg-base-300 shadow-xl flex flex-col gap-3">
      <div className="flex flex-row gap-12 justify-center items-center">
        <TrackerButton
          type={"submit"}
          label={"Start"}
          onClick={startTracking}
          disabled={isTracking}
          trackingType={"Zeiterfassung"}
        />

        <TrackerButton
          type={"submit"}
          label={"Stop"}
          onClick={stopTracking}
          disabled={!isTracking}
          trackingType={"Zeiterfassung"}
        />
      </div>
      <CounterDisplay
        isTracking={isTracking}
        countValue={isTracking ? difference : 0}
        setCountValue={setCountValue}
        direction={"up"}
      />
      {/* <p className="text-4xl">{statusText}</p> */}
      {isTracking && (
        <>
          <p>
            Deine Zeit läuft seit: {startedTime}Uhr, den {startedDate}
          </p>
          <p>Aktuelle Uhrzeit: {currentTime} </p>
        </>
      )}
    </section>
  );
}
