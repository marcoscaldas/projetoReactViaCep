import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detalhes.css";

/**
 * true  → API mock local
 * false → ViaCEP (produção)
 */
const USE_MOCK_API = false;

const API_BASE = USE_MOCK_API
  ? "http://localhost:3001"
  : "https://viacep.com.br";

export default function Detalhes() {
  const { cep } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const url = USE_MOCK_API
          ? `${API_BASE}/cep/${cep}`
          : `${API_BASE}/ws/${cep}/json/`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Erro ao buscar detalhes do CEP");
        }

        const json = await res.json();

        if (json.erro) {
          setError("CEP não encontrado.");
        } else {
          setData(json);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os dados do CEP.");
      }
    }

    load();
  }, [cep]);

  if (error) {
    return (
      <p className="detalhes-loading error">
        {error}
      </p>
    );
  }

  if (!data) {
    return (
      <p className="detalhes-loading">
        Carregando...
      </p>
    );
  }

  return (
    <div className="container">
      <div className="card-glass detalhes-card">
        <Link to="/" className="voltar-link">
          ← Voltar
        </Link>

        <h1>Detalhes do CEP {data.cep}</h1>

        <div className="detalhes-info">
          <p><strong>Rua:</strong> {data.logradouro}</p>
          <p><strong>Bairro:</strong> {data.bairro}</p>
          <p><strong>Cidade:</strong> {data.localidade}</p>
          <p><strong>Estado:</strong> {data.uf}</p>
          <p><strong>DDD:</strong> {data.ddd || "—"}</p>
        </div>
      </div>
    </div>
  );
}
