import { useState } from "react";
import ProductList from "./components/ProductCard";
import Basket from "./pages/Basket";
import Navbar from "./components/Navbar";
import Invoice from "./pages/Invoice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [basketItems, setBasketItems] = useState([]);
  return (
    <div className="App">
      <Router>
        <Navbar basketItems={basketItems} />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Basket
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            }
          ></Route>
          <Route
            path="/invoice"
            element={<Invoice items={basketItems} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
