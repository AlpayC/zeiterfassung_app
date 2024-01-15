import { useFetchTimeEntries } from "../hooks/useFetchTimeEntries";
import { formatTime, formatDate } from "../utils/formatDate";

export default function TimeEntries({ value, user, fetchButtonClicked }) {
  const timeEntries = useFetchTimeEntries(value, user, fetchButtonClicked);

  return (
    <div className="flex gap-6 flex-wrap">
      {timeEntries.map((entry) => (
        <div
          key={entry.date}
          className="flex flex-col border-gray-700 border p-12"
        >
          <h2 className="text-4xl mb-5">{formatDate(new Date(entry.date))}</h2>
          {entry.times.map((time, index) => (
            <div key={index} className="flex gap-8">
              <p>Von</p> <p>{formatTime(new Date(time.startTime))}</p>
              <p>bis</p>
              <p>{formatTime(new Date(time.endTime))}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
