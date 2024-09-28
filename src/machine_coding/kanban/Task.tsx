import { useKanbanConsumer } from "./context/kanban-context";
import { Task as TaskType } from "./types";

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
  const { prev, next, deleteTodo } = useKanbanConsumer();

  const deleteHandler = (): void => {
    deleteTodo(task);
  };

  const nextHandler = (): void => {
    next(task);
  };

  const prevHandler = (): void => {
    prev(task);
  };

  return (
    <div className="task">
      <p>{task.taskName}</p>
      <div className="btn_cont">
        <button
          className="previous"
          disabled={task.stage === "newTodo"}
          onClick={prevHandler}
        >
          &laquo;
        </button>
        <button
          className="next"
          disabled={task.stage === "completedTodo"}
          onClick={nextHandler}
        >
          &raquo;
        </button>
        <button className="delete" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
