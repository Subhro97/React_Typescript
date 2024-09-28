import { useEffect, useReducer, useRef, useState } from "react";
import { DataReducer } from "./types";

import { dataReducer } from "./reducer/dataReducer";
import { fetchData } from "./api/fetchData";
import ProductItem from "./ProductItem";

import "./InfiniteScroll2.css";

const InfiniteScroll2 = () => {
  let [data, dispatch] = useReducer<DataReducer>(dataReducer, {
    products: [],
    count: 5,
    completed: false,
  });

  const [loading, setLoading] = useState(true);

  let lastItemRef = useRef<HTMLDivElement>(null);
  const productsContRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData().then((data) => {
      dispatch({ type: "FECTH_MORE", products: data });
    });
  }, []);

  useEffect(() => {
    if (!lastItemRef.current) return;

    let observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        observer.unobserve(lastItemRef.current!);
        setLoading(true);

        if (data.completed) {
          setLoading(false);
          return;
        }

        fetchData().then((productsList) => {
          setLoading(false);
          dispatch({ type: "FECTH_MORE", products: productsList });

          if (productsList.length === data.products.length + 5) {
            dispatch({ type: "COMPLETED" });
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(lastItemRef.current!);
  }, [data.products]);

  return (
    <div className="product_cont" ref={productsContRef}>
      {data.products.length > 0 &&
        data.products.map((item, idx, prodArr) =>
          idx + 1 === prodArr.length ? (
            <ProductItem key={item.title} product={item} ref={lastItemRef} />
          ) : (
            <ProductItem key={item.title} product={item} />
          )
        )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll2;

/*
1. Fect the data in multiples of 10.
2. Attach a Observer to the last item and fetch the next 10 items and update the observer
 */
