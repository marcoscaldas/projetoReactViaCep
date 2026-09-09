import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [aberto, setAberto] = useState(false);

  function toggleMenu() {
    setAberto(!aberto);
  }

  const menuClasse = aberto ? "menu ativo" : "menu";

  return (
    <nav className="nav">
      <h2 className="logo">Localizar CEP</h2>

      <button className="btn-menu" onClick={toggleMenu}>
        &#9776;
      </button>

      <ul className={menuClasse}>
        <li>Home</li>
        <li>Endereços</li>
        <li>Trabalhe Conosco</li>
        <li>Sobre</li>
      </ul>
    </nav>
  );
}
