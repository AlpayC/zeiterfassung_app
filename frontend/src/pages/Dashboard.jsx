import AddTaskBox from "../components/dashboard/addTaskBox/AddTaskBox";
import CalendarOverview from "../components/dashboard/calendarOverview/CalendarOverview";
import FocusTimer from "../components/dashboard/focusTimer/FocusTimer";
import GreetingBox from "../components/dashboard/greetingBox/GreetingBox";
import TodayTaskOverview from "../components/dashboard/todayTaskOverview/TodayTaskOverview";

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
