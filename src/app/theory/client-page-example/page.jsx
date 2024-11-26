"use client";

import { fetchListOfProducts } from "@/actions";
import { useEffect, useState } from "react";

const ClientPageExample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListOfProducts = async () => {
    setLoading(true);
    const data = await fetchListOfProducts();
    console.log(data);
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListOfProducts();
  }, []);

  if (loading) return <h1>Loading Data! Please Wait</h1>;
  return (
    <div>
      <h1>Client Page Server Actions Example</h1>
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

export default ClientPageExample;
