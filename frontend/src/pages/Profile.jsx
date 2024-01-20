import { useContext } from "react";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "../user/UserContext";
import BackButton from "../components/ui/buttons/BackButton";
import TrackingCalendar from "../timeTracking/TrackingCalendar";

export default function Profile() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main>
      <h1>Zeiterfassung Übersicht</h1>
      <BackButton label={"Zurück zur Zeiterfassung"} link={"/tracker"} />
      {isLoggedIn ? (
        <TrackingCalendar />
      ) : (
        <div>
          <h2>
            Du bist nicht eingeloggt. Bitte logge dich ein, um zu deinem Profil
            zu gelangen
          </h2>
        </div>
      )}
    </main>
  );
}
