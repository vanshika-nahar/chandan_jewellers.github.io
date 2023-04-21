import Dashboard from "./Components/Administrator/Dashboard";
import AdminLogin from "./Components/Administrator/AdminLogin";
import Home from "./Components/UserInterface/Home";
import BannerImages from "./Components/Administrator/BannerImages";
import SearchBar from "./Components/UserInterface/UserComponents/SearchBar";
import FilterCompomnent from "./Components/UserInterface/UserComponents/FilterComponent";
import SetProductDetails from "./Components/UserInterface/UserComponents/SetProductDetails";
import { SessionContext } from "./Components/Services/SessionContext";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Components/UserInterface/UserComponents/ProductList";
import CartPage from "./Components/UserInterface/UserComponents/CartPage";
import DeliverDetails from "./Components/UserInterface/UserComponents/DeliverDetails";

function App() {
  const [session, setSession] = React.useState(false);
  const [cart, setCart] = React.useState(0);
  return (
    <SessionContext.Provider value={{ session, setSession ,cart,setCart}}>
    <div >
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<Home />} path="/" />
          <Route element={<ProductList/>} path="/productlist/:id/:icon" />
          <Route element={<FilterCompomnent/>} path="/filter" />
          <Route element={<SetProductDetails/>} path="/setproduct" />
          <Route element={<CartPage/>} path="/cart" />
          <Route element={<DeliverDetails/>} path="/details" />
        </Routes>
      </Router>
    </div>
    </SessionContext.Provider>
  );
}

export default App;
