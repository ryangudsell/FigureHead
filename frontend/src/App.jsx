// Imports
import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./css/App.css"

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SingleProduct from "./pages/SingleProduct";
import Payment from "./pages/Payment";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <div>
    <BrowserRouter>
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
