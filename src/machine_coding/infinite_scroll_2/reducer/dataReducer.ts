import { DataReducer } from "../types";

export const dataReducer: DataReducer = (state, action) => {
  switch (action.type) {
    case "FECTH_MORE": {
      return {
        ...state,
        products: action.products.slice(0, state.count),
        count: state.count + 5,
      };
    }

    case "COMPLETED": {
      return {
        ...state,
        completed: true,
      };
    }

    default: {
      return state;
    }
  }
};
