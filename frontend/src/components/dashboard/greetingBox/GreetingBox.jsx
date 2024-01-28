import ToDoCounter from "./ToDoCounter";
import TodoMiniListContainer from "./TodoMiniListContainer";
import landscapeMountains from "../../../assets/img/landscape-mountains.jpg";
export default function GreetingBox({ userName, todosNumber, nextTodos }) {
  return (
    <article className="card bg-base-300 shadow-xl image-full p-2 greetings-box">
      <figure>
        <img
          src={landscapeMountains}
          alt="landscape-night"
          className="w-[120%] object-left-bottom"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title text-3xl">Guten Morgen {userName}</h1>
        <ToDoCounter todosNumber={todosNumber} />
        <div className="card-actions justify-end">
          <TodoMiniListContainer nextTodos={nextTodos} />
        </div>
      </div>
    </article>
  );
}
