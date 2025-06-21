import { getAllProducts } from "@/api/functions/product.api";
import Component1 from "@/components/Component1";
import Component2 from "@/components/Component2";
import AddProductDialog from "@/components/product/add-product-dialog";
import ProductCard from "@/components/product/product-card";
import PureComponent from "@/components/PureComponent";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Home() {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [count, setCount] = useState(0);

  const { data, error, status, isLoading } = useQuery({
    queryKey: ["use-get-product-list", limit, page],
    queryFn: () => getAllProducts(limit, page),
  });

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-red-500 text-xl font-medium">
          Something went wrong.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <button onClick={() => setCount(count + 1)}>+</button>
      <PureComponent count={count} />

      <Component1>
        <h1>This is child</h1>
      </Component1>

      <Component1>
        <h1>This is child 2</h1>
      </Component1>

      <Component1>
        <Component2 />
      </Component1>
      {/* Header actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button onClick={() => setOpen(true)}>Add Product</Button>
        <AddProductDialog open={open} setOpen={setOpen} />
      </div>

      {/* Limit Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium text-sm">Limit:</span>
        {[10, 20, 50].map((p) => (
          <Button
            key={p}
            onClick={() => {
              setPage(1); // reset to page 1 when limit changes
              setLimit(p);
            }}
            variant={limit === p ? "default" : "outline"}
            className="rounded-full text-sm px-4"
          >
            {p}
          </Button>
        ))}
      </div>

      {/* Page Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-sm">Page:</span>
        {Array.from({ length: 11 }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            onClick={() => setPage(p)}
            variant={page === p ? "default" : "outline"}
            className="rounded-full text-sm px-4"
          >
            {p}
          </Button>
        ))}
      </div>

      <div className="text-muted-foreground text-sm">
        <p>
          Status: <strong>{status}</strong>
        </p>
        <p>
          Total products on this page: <strong>{data?.products?.length}</strong>
        </p>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-lg font-medium">Loading...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
