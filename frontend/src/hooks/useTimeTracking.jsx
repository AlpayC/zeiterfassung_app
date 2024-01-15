import { useState, useEffect } from "react";
import axios from "axios";

const useTimeTracking = (user) => {
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    try {
      const response = await axios.post("/api/timeTracking/addStartTime", {
        email: user.email,
        date: new Date(),
        startTime: new Date().toISOString(),
      });

      if (response.status === 201) {
        setIsTracking(true);
        sessionStorage.setItem("timeTrackingToken", new Date().toISOString());
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
    } catch (error) {
      console.error("Error stopping time tracking:", error.message);
    }
  };

  useEffect(() => {
    const timeTrackingToken = sessionStorage.getItem("timeTrackingToken");

    if (timeTrackingToken) {
      setIsTracking(true);
    }
  }, []);

  return { isTracking, startTracking, stopTracking };
};

export default useTimeTracking;
