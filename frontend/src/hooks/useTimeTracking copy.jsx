import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import { formatTime, convertUtcToGermanTime } from "../utils/formatDate";
const useTimeTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [statusText, setStatusText] = useState("Starte die Zeit");
  const [documentTitle, setDocumentTitle] = useState(document.title);
  const [prevDocumentTitle] = useState(documentTitle);
  const [startDate, setStartDate] = useState([]);
  const { user } = useContext(UserContext);
  const startTracking = async () => {
    try {
      const userEmail = user.email;
      const response = await axios.post("/api/timeTracking/addStartTime", {
        email: userEmail,
        date: new Date(),
        startTime: new Date().toISOString(),
      });

      if (response.status === 201) {
        setIsTracking(true);
        // sessionStorage.setItem("timeTrackingToken", new Date().toISOString());

        setStatusText(
          "Deine Zeiterfassung läuft aktuell..Stoppe deine Zeit, wenn du fertig bist"
        );
        // const timeTrackingToken = sessionStorage.getItem("timeTrackingToken");

        setDocumentTitle(
          (document.title = `Zeit läuft seit: ${formatTime(
            new Date(startDate.startTimes)
          )}`)
        );
      } else {
        console.error(`Error starting time tracking: ${response.data}`);
      }
    } catch (error) {
      console.error("Error starting time tracking:", error);
    }
  };

  const stopTracking = async () => {
    try {
      const response = await axios.put("/api/timeTracking/addEndTime", {
        endTime: new Date(),
        email: user.email,
        date: new Date(),
      });

      await axios.post("/api/timeTracking/sendEmailToHr", {
        startTime: new Date(response.data.startTimes),
        endTime: new Date(response.data.endTimes),
        email: user.email,
        date: new Date(),
      });

      setIsTracking(false);
      sessionStorage.removeItem("timeTrackingToken");
      setDocumentTitle((document.title = prevDocumentTitle));
      setStatusText(
        "Deine Zeiterfassung wurde beendet und eine Email wurde an das Personalbüro versendet"
      );
      setStartDate(null);
    } catch (error) {
      console.error("Error stopping time tracking:", error.message);
    }
  };

  useEffect(() => {
    // const timeTrackingToken = sessionStorage.getItem("timeTrackingToken");

    if (isTracking) {
      const getSessionActivity = async () => {
        try {
          const response = await axios.post(
            "/api/timeTracking/getTimeTrackingActivity",

            {
              email: user.email,
              date: new Date(),
            }
          );
          console.log(response);
          setIsTracking(true);

          setStatusText(
            "Deine Zeiterfassung läuft aktuell. Stoppe deine Zeit, wenn du fertig bist."
          );
          setDocumentTitle(
            (document.title = `Zeit läuft seit: ${formatTime(
              new Date(response.data.startTimes)
            )}`)
          );
          setStartDate(response.data);
        } catch (error) {
          console.error("Error getting time tracking activity:", error.message);
        }
      };
      getSessionActivity();
    } else {
      console.log("keine aktivität");
    }
  }, []);

  return { isTracking, startTracking, stopTracking, statusText, startDate };
};

export default useTimeTracking;
