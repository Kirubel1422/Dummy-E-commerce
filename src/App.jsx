import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import UserDetail from "./pages/UserDetail";
const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ProductDetail />} path="/product/:productId" />
        <Route element={<UserDetail />} path="/user/:userId" />
      </Routes>
    </div>
  );
};

export default App;
