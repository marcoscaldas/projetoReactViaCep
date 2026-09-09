import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      < Navbar/>

      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:cep" element={<Detalhes />} />
        </Routes>

      
      </BrowserRouter>
      
      < Footer/>
   </>
  );
}
