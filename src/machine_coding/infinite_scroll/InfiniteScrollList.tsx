import { useEffect, useRef, useReducer, useState } from "react";

import ListItem from "./ListItem";

import { fetchProducts } from "./api/fetchProducts";
import { productsReducer } from "./reducers/productsReducer";
import { ProductHandler, ProductState } from "./types";
import useObserver from "./hooks/use-observer";

import "./InfiniteScrollList.css";

const productState: ProductState = {
  productsList: [],
  count: 5,
  completed: false,
};

const InfiniteScrollList: React.FC = () => {
  const [products, dispatch] = useReducer<ProductHandler>(
    productsReducer,
    productState
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lastItemref = useRef<HTMLDivElement>(null);
  const productsContRef = useRef<HTMLDivElement>(null);

  const scrollFetchHandler = () => {
    setIsLoading(true);

    // If the list is completed, to prevent un-necessary API calls
    if (products.completed) {
      setIsLoading(false);
      return;
    }

    fetchProducts().then((productsList) => {
      setIsLoading(false);
      dispatch({
        type: "ADD_PRODUCTS",
        payload: { productsList: productsList },
      });

      // To check if the call should be the last call, if list completes
      if (productsList.length === products.productsList.length + 5) {
        dispatch({
          type: "COMPLETED",
          payload: { completed: true },
        });
      }
    });
  };

  // To Fetch the list for the first time
  useEffect(() => {
    fetchProducts().then((productsList) => {
      dispatch({
        type: "ADD_PRODUCTS",
        payload: { productsList: productsList },
      });
    });
  }, []);

  // To handle the fetching of lists on scroll
  useEffect(() => {
    if (!lastItemref.current) return;

    useObserver(
      scrollFetchHandler,
      lastItemref.current!,
      productsContRef.current
    );
  }, [products.productsList]);

  return (
    <div className="products_cont" ref={productsContRef}>
      {products.productsList.length > 0 &&
        products.productsList.map((item, idx, productsArray) =>
          productsArray.length === idx + 1 ? (
            <ListItem key={item} listName={item} ref={lastItemref} />
          ) : (
            <ListItem key={item} listName={item} />
          )
        )}
      {isLoading ? <p>Loading...</p> : ""}
    </div>
  );
};

export default InfiniteScrollList;
