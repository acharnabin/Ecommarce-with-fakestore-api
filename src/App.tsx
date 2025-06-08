import InfiniteProductPage from "./pages/InfiniteProductPage";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import { Header } from "./layout/Header";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-products" element={<InfiniteProductPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        
      </Routes>
    </div>
  );
};

export default App;
