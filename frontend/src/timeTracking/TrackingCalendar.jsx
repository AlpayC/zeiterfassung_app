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
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 my-10">
        <h3>Datum wählen</h3>
        <Calendar onChange={onChange} value={value} selectRange={true} />
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
