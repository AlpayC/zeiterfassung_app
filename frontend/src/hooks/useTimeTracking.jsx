import { useState } from "react";
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
    } catch (error) {
      console.error("Error stopping time tracking:", error.message);
    }
  };

  return { isTracking, startTracking, stopTracking };
};

export default useTimeTracking;
