import { getAllProducts } from "@/api/functions/product.api";
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function InfiniteProductPage() {
  const [limit, setLimit] = useState(10);
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["use-infinite-product-list", limit],
    queryFn: ({ pageParam = 1 }) => getAllProducts(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage >= 10 ? undefined : nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex gap-3 items-center">
        <span className="font-semibold text-sm text-gray-600">Limit:</span>
        {[10, 20, 50].map((p) => (
          <Button
            key={p}
            onClick={() => setLimit(p)}
            variant={limit === p ? "default" : "outline"}
            className="rounded-full text-sm px-4"
          >
            {p}
          </Button>
        ))}
      </div>

      <div className="h-[80vh] overflow-auto border rounded-lg p-4 bg-muted">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {infiniteData?.pages?.map((page) =>
            page.products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))
          )}
        </div>

        {isFetchingNextPage && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Loading more products...
          </div>
        )}

        <div ref={ref} className="h-10" />

        {hasNextPage && !isFetchingNextPage && (
          <div className="flex justify-center mt-6">
            <Button onClick={() => fetchNextPage()}>Load More</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfiniteProductPage;
