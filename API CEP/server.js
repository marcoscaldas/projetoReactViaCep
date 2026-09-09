import express from "express";
import cors from "cors";
import fs from "fs";

const port = 3001;

const app = express();
app.use(cors());

const ceps = JSON.parse(
  fs.readFileSync("./data/ceps.json", "utf-8")
);

app.get("/cep/:cep", (req, res) => {
  const cepBuscado = req.params.cep.replace(/\D/g, "");

  const endereco = ceps.find(c => c.cep === cepBuscado);

  if (!endereco) {
    return res.status(404).json({
      erro: true,
      mensagem: "CEP não encontrado"
    });
  }

  res.json(endereco);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
