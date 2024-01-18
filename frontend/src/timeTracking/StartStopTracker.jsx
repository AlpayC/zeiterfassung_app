import useTimeTracking from "../hooks/useTimeTracking";
import TrackerButton from "../components/ui/buttons/TrackerButton";

export default function StartStopTracker({ user }) {
  const { isTracking, startTracking, stopTracking } = useTimeTracking(user);

  return (
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
  );
}
