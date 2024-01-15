import { FaPlayCircle, FaStop } from "react-icons/fa";
import useTimeTracking from "../hooks/useTimeTracking";

export default function StartStopTracker({ user }) {
  const { isTracking, startTracking, stopTracking } = useTimeTracking(user);

  return (
    <div className="flex flex-row gap-12 justify-center items-center">
      <button onClick={startTracking} disabled={isTracking}>
        <FaPlayCircle />
      </button>
      <button onClick={stopTracking} disabled={!isTracking}>
        <FaStop />
      </button>
    </div>
  );
}
