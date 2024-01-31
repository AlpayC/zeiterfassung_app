import { useState, useContext } from "react";
import { UserContext } from "../user/UserContext";
import Calendar from "react-calendar";
import TimeEntries from "../components/TimeEntries";

export default function TrackingCalendar() {
  const { user } = useContext(UserContext);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [fetchButtonClicked, setFetchButtonClicked] = useState(false);

  const handleFetchButtonClick = () => {
    setFetchButtonClicked(true);
  };

  const projectData = [
    { title: "applet bauen", date: new Date() },
    { title: "applet bauen", date: new Date() },
    { title: "applet bauen", date: new Date() },
    { title: "aspplet bauen", date: new Date("2024-01-30") },
  ];

  console.log(projectData);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 my-10">
        <h3>Datum wählen</h3>
        <Calendar
          onChange={onChange}
          value={value}
          selectRange={true}
          tileContent={({ date, view }) => {
            const matchingProjects = projectData.filter(
              (project) => project.date.getDate() === date.getDate()
            );

            return view === "month" && matchingProjects.length > 0 ? (
              <div className="flex gap-1">
                {matchingProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-red-600 w-2 h-2 rounded-full"
                  ></div>
                ))}
              </div>
            ) : (
              <></>
            );
          }}
        />
        <button onClick={handleFetchButtonClick}>Abfragen</button>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <h3>Von: {value[0].toLocaleDateString()}</h3>
        <h3>bis: {value[1].toLocaleDateString()}</h3>
      </div>
      <TimeEntries
        value={value}
        user={user}
        fetchButtonClicked={fetchButtonClicked}
      />
    </>
  );
}
