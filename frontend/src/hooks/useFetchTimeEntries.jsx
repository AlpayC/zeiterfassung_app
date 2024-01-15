import { useState, useEffect } from "react";
import axios from "axios";
import { mapTimeEntries } from "../utils/mapTimeEntries";

export const useFetchTimeEntries = (value, user, shouldFetch = true) => {
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const formattedStartDate = value[0].toLocaleDateString("en-CA");
        const formattedEndDate = value[1].toLocaleDateString("en-CA");

        const { data } = await axios.post("/api/timeTracking/getTimes", {
          email: user.email,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });

        const mappedEntries = Object.values(mapTimeEntries(data));
        setTimeEntries(mappedEntries);
      } catch (error) {
        console.error(error);
      }
    };

    if (shouldFetch) {
      fetchTimeEntries();
    }
  }, [value, user.email, shouldFetch]);

  return timeEntries;
};
