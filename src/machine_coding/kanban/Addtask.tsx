import { useRef } from "react";
import { useKanbanConsumer } from "./context/kanban-context";

const Addtask: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addTodo } = useKanbanConsumer();

  const addTaskHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    const task = inputRef.current!.value.trim();

    if (task.length > 0) {
      addTodo({ id: crypto.randomUUID(), taskName: task, stage: "newTodo" });
    }
  };

  return (
    <form onSubmit={addTaskHandler}>
      <label htmlFor="task_input">Add Task:</label>
      <input
        ref={inputRef}
        type="text"
        id="task_input"
        name="task"
        placeholder="Type here..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Addtask;
