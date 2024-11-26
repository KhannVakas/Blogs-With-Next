// const fetchListOfProducts = async () => {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

import { fetchListOfProducts } from "@/actions";

//   return data?.products;
// };

const ServerActionsExample = async () => {
  // Both functions will work the same

  const products = await fetchListOfProducts();
  //   console.log(products);
  return (
    <div>
      <h1>Server Actions Example - server components</h1>
      <ul>
        {products && products?.length > 0 ? (
          products.map((item) => <li>{item.title}</li>)
        ) : (
          <h2>No Products available</h2>
        )}
      </ul>
    </div>
  );
};

export default ServerActionsExample;
