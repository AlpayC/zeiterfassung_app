export default function ToDoMiniListItem({ nextTodo }) {
  console.log(nextTodo.color);
  return (
    <div className="flex items-center justify-start gap-4 my-3">
      <div className={`h-10 w-1 ${nextTodo.color} rounded-2xl`}></div>
      <div>
        <h2 className="text-sm"> {nextTodo.title}</h2>
        <p className="text-sm text-neutral-400">
          {nextTodo.startTime} bis {nextTodo.endTime}
        </p>
      </div>
    </div>
  );
}
