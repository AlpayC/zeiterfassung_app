import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";

export default function Profile() {
  const [isTracking, setIsTracking] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Überprüfe, ob das Startdatum in der SessionStorage vorhanden ist
    const startDateTime = sessionStorage.getItem("startDateTime");
    if (startDateTime) {
      setIsTracking(true);
    }
  }, []); // Leere Abhängigkeitsliste, um sicherzustellen, dass dies nur einmal beim Laden der Komponente ausgeführt wird

  const handleStart = () => {
    // Überprüfe, ob das Startdatum bereits in der SessionStorage vorhanden ist
    const startDateTime = sessionStorage.getItem("startDateTime");
    if (!startDateTime) {
      // Wenn nicht, speichere das aktuelle Datum in der SessionStorage
      sessionStorage.setItem("startDateTime", new Date().toISOString());
      setIsTracking(true);
    }
  };

  const handleStop = async () => {
    try {
      // Holen Sie das Startdatum aus der SessionStorage
      const startDateTime = sessionStorage.getItem("startDateTime");

      // Stellen Sie sicher, dass ein Startdatum vorhanden ist, bevor Sie die API-Aufruf machen
      if (startDateTime) {
        const response = await axios.post("/api/timeTracking/addTimes", {
          startTime: new Date(startDateTime),
          endTime: new Date(),
          email: user.email,
          date: new Date(),
        });
        console.log(response.data);

        // Lösche das Startdatum aus der SessionStorage nach erfolgreichem API-Aufruf
        sessionStorage.removeItem("startDateTime");
        setIsTracking(false);
      }
    } catch (error) {
      console.error("Error stopping time tracking:", error.message);
    }
  };

  return (
    <>
      <h1>Tracker</h1>
      <div>
        <button onClick={handleStart} disabled={isTracking}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isTracking}>
          Stop
        </button>
      </div>
    </>
  );
}
