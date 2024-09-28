const TaskContainer: React.FC<
  React.PropsWithChildren<{ taskName: string }>
> = ({ taskName, children }) => {
  return (
    <div className="task_cont">
      <h3>{taskName}</h3>
      <div className="task_list">{children}</div>
    </div>
  );
};

export default TaskContainer;
