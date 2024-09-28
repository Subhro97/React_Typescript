export interface ProductState {
  products: Array<any>;
  count: number;
  completed: boolean;
}

export type DataReducer = (state: ProductState, action: any) => ProductState;
