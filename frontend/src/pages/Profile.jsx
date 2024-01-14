import { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { formatDate, formatTime } from "../utils/formatDate";

export default function Profile() {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [timeEntries, setTimeEntries] = useState([]);
  const { isLoggedIn, user } = useContext(UserContext);

  // useEffect(() => {
  //   fetchTimeEntries();
  // }, []);

  const fetchTimeEntries = async () => {
    try {
      const formattedStartDate = value[0].toLocaleDateString("en-CA");
      const formattedEndDate = value[1].toLocaleDateString("en-CA");

      const { data } = await axios.post("/api/timeTracking/getTimes", {
        email: user.email,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      const mappedEntries = mapTimeEntries(data);
      setTimeEntries(mappedEntries);
    } catch (error) {
      console.error(error);
    }
  };

  const mapTimeEntries = (entries) => {
    const mappedEntries = entries.reduce((acc, entry) => {
      const dateKey = entry.date;

      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, startTimes: [], endTimes: [] };
      }

      acc[dateKey].startTimes.push(entry.startTimes);
      acc[dateKey].endTimes.push(entry.endTimes);

      return acc;
    }, {});

    return Object.values(mappedEntries);
  };

  return (
    <>
      <h1>Zeiterfassung Übersicht</h1>
      {isLoggedIn ? (
        <div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h3>Datum wählen</h3>
            <Calendar onChange={onChange} value={value} selectRange={true} />
          </div>
          <button onClick={fetchTimeEntries}>Abfragen</button>

          <div className="flex gap-7 flex-wrap">
            {timeEntries.map((entry) => (
              <div
                key={entry.date}
                className="flex flex-col border-gray-700 border p-12"
              >
                <h2 className="text-2xl ">
                  {formatDate(new Date(entry.date))}
                </h2>
                {entry.startTimes.map((startTime, index) => (
                  <div key={index} className="flex gap-8">
                    <p>Von</p> <p>{formatTime(new Date(startTime))}</p>
                    <p>bis</p>
                    <p>{formatTime(new Date(entry.endTimes[index]))}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>
            Du bist nicht eingeloggt. Bitte logge dich ein, um zu deinem Profil
            zu gelangen
          </h2>
        </div>
      )}
    </>
  );
}
