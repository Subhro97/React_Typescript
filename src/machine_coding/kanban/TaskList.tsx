import TaskContainer from "./TaskContainer";
import Task from "./Task";

import { useKanbanConsumer } from "./context/kanban-context";
// import useThrottle from "../../polyfills/use-throttle";

const TaskList: React.FC = () => {
  const { newTodo, ongoingTodo, completedTodo } = useKanbanConsumer();

  // const log = (msg: string) => console.log("Lodash library method", msg);

  // const throttledLog = useThrottle(log, 5000);

  // setInterval(() => throttledLog("Subhro"), 500); [1,1,1,2,2,2,3,3]

  return (
    <section className="all_tasks">
      <TaskContainer taskName="New Todo's">
        {newTodo.length > 0 ? (
          newTodo.map((task) => <Task key={task.taskName} task={task} />)
        ) : (
          <p className="fallback_msg">No Todo's</p>
        )}
      </TaskContainer>
      <TaskContainer taskName="Ongoing Todo's">
        {ongoingTodo.length > 0 ? (
          ongoingTodo.map((task) => <Task key={task.taskName} task={task} />)
        ) : (
          <p className="fallback_msg">No Todo's</p>
        )}
      </TaskContainer>
      <TaskContainer taskName="Completed Todo's">
        {completedTodo.length > 0 ? (
          completedTodo.map((task) => <Task key={task.taskName} task={task} />)
        ) : (
          <p className="fallback_msg">No Todo's</p>
        )}
      </TaskContainer>
    </section>
  );
};

export default TaskList;
