export type Stage = "newTodo" | "ongoingTodo" | "completedTodo";

export type Task = {
  id: string;
  taskName: string;
  stage: Stage;
};
