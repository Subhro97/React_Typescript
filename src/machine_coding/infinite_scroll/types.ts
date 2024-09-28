export interface ProductState {
  productsList: Array<string>;
  count?: number;
  completed: boolean;
}

export type ProductHandler = (state: ProductState, action: any) => ProductState;
