import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import StartStopTracker from "../timeTracking/StartStopTracker";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Zeiterfassung</h1>
      <StartStopTracker user={user} />
    </>
  );
}
