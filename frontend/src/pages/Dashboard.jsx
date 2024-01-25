import GreetingBox from "../components/dashboard/greetingBox/GreetingBox";

export default function Dashboard() {
  return (
    <div className="py-6 dashboard-grid">
      <GreetingBox userName={"Alpay"} todosNumber={"5"} />
    </div>
  );
}
