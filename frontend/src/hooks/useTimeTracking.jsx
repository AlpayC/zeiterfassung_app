import { useState, useEffect } from "react";
import axios from "axios";
import { formatTime } from "../utils/formatDate";

const useTimeTracking = (user) => {
  const [isTracking, setIsTracking] = useState(false);
  const [statusTitle, setStatusTitle] = useState("Starte die Zeit");
  const [statusDescription, setStatusDescription] = useState("");
  const [documentTitle, setDocumentTitle] = useState(document.title);
  const [prevDocumentTitle] = useState(documentTitle);
  const [startDate, setStartDate] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const refetch = () => setShouldRefetch((prev) => !prev);

  const startTracking = async () => {
    try {
      const response = await axios.post("/api/timeTracking/addStartTime", {
        email: user.email,
        date: new Date(),
        startTime: new Date().toISOString(),
      });
      if (response.status === 201) {
        refetch();
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
      setDocumentTitle((document.title = prevDocumentTitle));
      setStatusTitle("Deine Zeiterfassung wurde beendet!");
      setStatusDescription("Eine Email wurde an das Personalbüro versendet");
      setStartDate(null);
      refetch();
    } catch (error) {
      console.error("Error stopping time tracking:", error.message);
    }
  };

  useEffect(() => {
    const fetchSessionActivity = async () => {
      try {
        if (user && user.email) {
          const response = await axios.post(
            "/api/timeTracking/getTimeTrackingActivity",
            {
              email: user.email,
              date: new Date(),
            }
          );
          if (response && response.data) {
            setStartDate(response.data.startTimes);
            setIsTracking(true);

            setStatusTitle("Deine Zeiterfassung läuft aktuell.");
            setStatusDescription("Stoppe deine Zeit, wenn du fertig bist.");
            setDocumentTitle(
              (document.title = `Zeit läuft seit: ${formatTime(
                new Date(response.data.startTimes)
              )}`)
            );
          } else {
            setStartDate(null);
          }
        } else {
          setStartDate(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStartDate(null);
      }
    };

    fetchSessionActivity();
  }, [shouldRefetch, user]);

  return {
    isTracking,
    startTracking,
    stopTracking,
    statusTitle,
    statusDescription,
    startDate,
    refetch,
  };
};

export default useTimeTracking;
