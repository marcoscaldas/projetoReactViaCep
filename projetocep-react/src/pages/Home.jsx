import { useState } from "react";
import CepCard from "../components/CepCard";
import "./Home.css";

/**
 * true  → usa API mock (local)
 * false → usa ViaCEP (produção)
 */
const USE_MOCK_API = false;

const API_BASE = USE_MOCK_API
  ? "http://localhost:3001"
  : "https://viacep.com.br";

export default function Home() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function buscarCep() {
    if (!cep) {
      alert("Informe um CEP");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const url = USE_MOCK_API
        ? `${API_BASE}/cep/${cep}`
        : `${API_BASE}/ws/${cep}/json/`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Serviço indisponível");
      }

      const json = await response.json();

      if (json.erro) {
        setError("CEP não encontrado.");
      } else {
        setData(json);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar CEP. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card-glass">
        <h1>Busca de CEP</h1>

        <p className="subtitle">
          Digite um CEP (ex: 01001000)
        </p>

        <div className="form-row">
          <input
            type="text"
            value={cep}
            placeholder="Digite o CEP"
            onChange={(e) => setCep(e.target.value)}
          />

          <button onClick={buscarCep}>
            Buscar
          </button>
        </div>

        {loading && (
          <p className="status">Carregando...</p>
        )}

        {error && (
          <p className="status error">{error}</p>
        )}

        {data && <CepCard endereco={data} />}
      </div>
    </div>
  );
}
