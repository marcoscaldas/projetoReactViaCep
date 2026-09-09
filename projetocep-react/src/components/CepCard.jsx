import { Link } from "react-router-dom";
import "./CepCard.css";

export default function CepCard({ endereco }) {
  const clean = endereco.cep.replace(/\D/g, "");
  /* 
    \D → qualquer caractere que NÃO seja número
    g  → global (substitui todos)
  */

  return (
    <div className="cep-card">
      <h2>CEP {endereco.cep}</h2>

      <div className="cep-info">
        <p><strong>Rua:</strong> {endereco.logradouro}</p>
        <p><strong>Bairro:</strong> {endereco.bairro}</p>
        <p><strong>Cidade:</strong> {endereco.localidade}</p>
      </div>

      <Link
        to={`/detalhes/${clean}`}
        className="cep-link"
      >
        Ver detalhes
      </Link>
    </div>
  );
}
