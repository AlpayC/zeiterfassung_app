import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import StartStopTracker from "../timeTracking/StartStopTracker";
import TrackingCalendar from "../timeTracking/TrackingCalendar";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <main>
      <StartStopTracker user={user} />
      <TrackingCalendar />
    </main>
  );
}
