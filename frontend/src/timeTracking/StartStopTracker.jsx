import { FaPlayCircle, FaStop } from "react-icons/fa";
import useTimeTracking from "../hooks/useTimeTracking";

export default function StartStopTracker({ user }) {
  const { isTracking, startTracking, stopTracking, statusText } =
    useTimeTracking(user);

  return (
    <>
      <div className="flex flex-row gap-12 justify-center items-center mb-16">
        <button onClick={startTracking} disabled={isTracking}>
          <FaPlayCircle />
        </button>
        <button onClick={stopTracking} disabled={!isTracking}>
          <FaStop />
        </button>
      </div>
      <p className="text-4xl">{statusText}</p>
    </>
  );
}
