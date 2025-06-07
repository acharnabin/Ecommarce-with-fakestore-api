import { getSingleProduct } from "@/api/functions/product.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getSingleProduct(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex justify-center items-center text-lg font-medium">
        Loading product details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[60vh] flex justify-center items-center text-red-500">
        Error loading product.
      </div>
    );
  }

  if (!data?.product) {
    return (
      <div className="h-[60vh] flex justify-center items-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const product = data.product;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      <img
        src={product.image}
        alt={product.title}
        className="w-[300px] h-[300px] object-contain rounded shadow-md"
      />
      {/* You can add more fields like price, category, etc. here */}
    </div>
  );
};

export default ProductDetailsPage;
