import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route, redirect } from "react-router-dom";
import Baselayout from "./components/Baselayout";
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";

function App() {
  return (
    <div className="px-20">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      <Baselayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
      </Baselayout>
    </div>
  );
}

export default App;
