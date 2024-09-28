import { ProductHandler } from "../types";

export const productsReducer: ProductHandler = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS": {
      return {
        ...state,
        productsList: action.payload.productsList.slice(0, state.count),
        count: state.count! + 5,
      };
    }
    case "COMPLETED": {
      return {
        ...state,
        completed: action.payload.completed,
      };
    }

    default:
      return state;
  }
};
