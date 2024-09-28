interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Define the API response structure
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (): Promise<string[]> => {
  const response = await fetch("https://dummyjson.com/products");

  const data: ProductsResponse = await response.json();

  const productList: Array<string> = data.products.map((product: Product) => {
    return product.title;
  });

  return productList;
};
