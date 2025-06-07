import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Card key={product.id} className="transition hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base font-semibold line-clamp-1">
          {product?.title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {product?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-[150px] w-[150px] object-contain rounded"
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Link to={`/product-details/${product?.id}`}>View</Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
