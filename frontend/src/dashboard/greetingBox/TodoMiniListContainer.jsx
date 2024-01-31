import ToDoMiniListItem from "./ToDoMiniListItem";

export default function TodoMiniListContainer() {
  const nextTodos = [
    {
      title: "Design abschicken",
      startTime: "12:00 Uhr",
      endTime: "14:00 Uhr",
      color: "bg-red-500",
    },
    {
      title: "Angebot absenden",
      startTime: "15:00 Uhr",
      endTime: "17:00 Uhr",
      color: "bg-yellow-500",
    },
    {
      title: "Rechnungen buchen",
      startTime: "19:00 Uhr",
      endTime: "20:00 Uhr",
      color: "bg-green-500",
    },
  ];
  const firstTwoTodos = nextTodos.slice(0, 2);

  return (
    <div className="card w-96  bg-base-100 rounded-2xl ">
      <div className="card-body p-5">
        <h2 className="card-title text-primary">Demnächst</h2>
        <div className="overflow-hidden h-28 ">
          {firstTwoTodos.map((nextTodo, index) => {
            return <ToDoMiniListItem nextTodo={nextTodo} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
