import AddTaskBox from "../dashboard/addTaskBox/AddTaskBox";
import CalendarOverview from "../dashboard/calendarOverview/CalendarOverview";
import FocusTimer from "../dashboard/focusTimer/FocusTimer";
import GreetingBox from "../dashboard/greetingBox/GreetingBox";
import TodayTaskOverview from "../dashboard/todayTaskOverview/TodayTaskOverview";

export default function Dashboard() {
  return (
    <div className="py-6 px-2 dashboard-grid">
      <GreetingBox userName={"Alpay"} todosNumber={"5"} />
      <CalendarOverview />
      <AddTaskBox />
      <FocusTimer />
      <TodayTaskOverview />
    </div>
  );
}
