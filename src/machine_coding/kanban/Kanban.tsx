import "./Kanban.css";

import Addtask from "./Addtask";
import TaskList from "./TaskList";

import { KanbanCtxProvider } from "./context/kanban-context";

const Kanban: React.FC = () => {
  return (
    <KanbanCtxProvider>
      <section className="kanban_cont">
        <Addtask />
        <TaskList />
      </section>
    </KanbanCtxProvider>
  );
};

export default Kanban;
