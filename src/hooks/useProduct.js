import { useState } from "react";
import { getProductById } from "../lib/api/products";

const useProduct = () => {
  const [status, setStatus] = useState("loading");

  function fetchProducts(id, dataReceiverFn) {
    setStatus("loading");
    getProductById(id)
      .then((data) => {
        dataReceiverFn(data);
        setStatus("success");
      })
      .catch((err) => {
        const notFound = err.response && err.response.status === 404;
        setStatus(notFound ? "notfound" : "error");
      });
  }

  return { status, fetchProducts };
};

export default useProduct;
