export const fetchData = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products");

    let data = await response.json();

    return data["products"];
  } catch (err) {
    throw Error("Failed Request " + err);
  }
};
