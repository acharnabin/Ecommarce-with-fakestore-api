import InfiniteProductPage from "./pages/InfiniteProductPage";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-products" element={<InfiniteProductPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
