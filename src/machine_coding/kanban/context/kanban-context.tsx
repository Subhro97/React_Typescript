import React, { createContext, useContext, useReducer } from "react";
import { Task, Stage } from "../types";

type KanbanHandler = (state: kanbanTodo, action: any) => kanbanTodo;

type kanbanTodo = {
  newTodo: Array<Task>;
  ongoingTodo: Array<Task>;
  completedTodo: Array<Task>;
  addTodo: (task: Task) => void;
  deleteTodo: (task: Task) => void;
  next: (task: Task) => void;
  prev: (task: Task) => void;
};

const kanbanIntitalState: kanbanTodo = {
  newTodo: [],
  ongoingTodo: [],
  completedTodo: [],
  addTodo: () => {},
  deleteTodo: () => {},
  next: () => {},
  prev: () => {},
};

const kanbanCtx = createContext<kanbanTodo>({
  newTodo: [],
  ongoingTodo: [],
  completedTodo: [],
  addTodo: () => {},
  deleteTodo: () => {},
  next: () => {},
  prev: () => {},
});

const kanbanReducerHandler: KanbanHandler = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      return {
        ...state,
        newTodo: [...state.newTodo, action.payload],
      };
    }

    case "DELETE_TASK": {
      const stage: Stage = action.payload.stage;
      const todoList: Array<Task> = state[stage];

      return {
        ...state,
        [stage]: todoList.filter((task: Task) => task.id !== action.payload.id),
      };
    }

    case "PREV_STAGE": {
      const stage: Stage = action.payload.stage;

      if (stage === "ongoingTodo") {
        action.payload.stage = "newTodo";
        return {
          ...state,
          ongoingTodo: state.newTodo.filter(
            (task: Task) => task.id !== action.payload.id
          ),
          newTodo: [...state.newTodo, action.payload],
        };
      } else {
        action.payload.stage = "ongoingTodo";
        return {
          ...state,
          completedTodo: state.newTodo.filter(
            (task: Task) => task.id !== action.payload.id
          ),
          ongoingTodo: [...state.ongoingTodo, action.payload],
        };
      }
    }

    case "NEXT_STAGE": {
      const stage: Stage = action.payload.stage;

      if (stage === "newTodo") {
        action.payload.stage = "ongoingTodo";
        return {
          ...state,
          newTodo: state.newTodo.filter(
            (task: Task) => task.id !== action.payload.id
          ),
          ongoingTodo: [...state.ongoingTodo, action.payload],
        };
      } else {
        action.payload.stage = "completedTodo";
        return {
          ...state,
          ongoingTodo: state.newTodo.filter(
            (task: Task) => task.id !== action.payload.id
          ),
          completedTodo: [...state.completedTodo, action.payload],
        };
      }
    }

    default:
      return state;
  }
};

export const KanbanCtxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [kanban, dispatch] = useReducer<KanbanHandler>(
    kanbanReducerHandler,
    kanbanIntitalState
  );

  const kanbanValues: kanbanTodo = {
    newTodo: kanban.newTodo,
    ongoingTodo: kanban.ongoingTodo,
    completedTodo: kanban.completedTodo,
    addTodo: (task) => {
      dispatch({ type: "ADD_TASK", payload: task });
    },
    deleteTodo: (task) => {
      dispatch({ type: "DELETE_TASK", payload: task });
    },
    next: (task) => {
      dispatch({ type: "NEXT_STAGE", payload: task });
    },
    prev: (task) => {
      dispatch({ type: "PREV_STAGE", payload: task });
    },
  };

  return (
    <kanbanCtx.Provider value={kanbanValues}>{children}</kanbanCtx.Provider>
  );
};

export const useKanbanConsumer = (): kanbanTodo => {
  return useContext<kanbanTodo>(kanbanCtx);
};
