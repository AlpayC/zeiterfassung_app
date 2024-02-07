import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useState } from "react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import de from "date-fns/locale/de";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

const locales = {
  de: de,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const messages = {
  allDay: "Ganztägig",
  previous: "Vorher",
  next: "Nachher",
  today: "Heute",
  month: "Monat",
  week: "Woche",
  day: "Tag",
  agenda: "Agenda",
  date: "Datum",
  time: "Zeit",
  event: "Ereignis",
};
const DnDCalendar = withDragAndDrop(Calendar);

export default function BigCalendar() {
  const [events, setEvents] = useState([
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(4, "days").toDate(),
      title: "some title",
    },
    {
      start: moment().toDate(),
      end: moment().add(0, "days").toDate(),
      title: "some title",
    },
    {
      start: moment("20240228"),
      end: moment("20240229"),
      title: "some title",
      titleTwo: "some",
    },
  ]);
  return (
    <main>
      <DnDCalendar
        events={events}
        defaultDate={moment().toDate()}
        defaultView="month"
        localizer={localizer}
        resizable
        style={{ height: "100%" }}
        culture={"de"}
        messages={messages}
        className="bg-base-300 "
      />
    </main>
  );
}
