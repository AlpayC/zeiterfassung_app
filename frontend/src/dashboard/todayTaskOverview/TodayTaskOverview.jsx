import Table from "../../components/ui/tables/Table";

export default function TodayTaskOverview() {
  return (
    <article className="todays-tasks-box overflow-auto p-4 card bg-base-300 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-poppins-bold">Heutige Aufgaben</h2>
      <Table />
    </article>
  );
}
