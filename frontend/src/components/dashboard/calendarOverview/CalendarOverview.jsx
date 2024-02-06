import { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarOverview() {
  const [value, onChange] = useState(new Date());

  return (
    <article className="calender-box card bg-base-300 shadow-xl p-2  rounded-2xl">
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
        className={
          "bg-base-300 h-full w-full border-none font-poppins-bold text-xl"
        }
      />
    </article>
  );
}
