import { forwardRef } from "react";

const ListItem = forwardRef<HTMLDivElement, { listName: string }>(
  ({ listName }, ref) => {
    return (
      <div ref={ref} className="product_item">
        {listName}
      </div>
    );
  }
);

export default ListItem;
