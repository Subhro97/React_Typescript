import { forwardRef } from "react";

const ProductItem = forwardRef<HTMLDivElement, { product: any }>(
  ({ product }, ref) => {
    return (
      <figure ref={ref}>
        <img src={product.images[0]} alt="Product Image" />
        <figcaption>{product.title}</figcaption>
      </figure>
    );
  }
);

export default ProductItem;
