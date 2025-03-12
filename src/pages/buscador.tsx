import { useState } from "react";
import axios from "axios";

const Buscador = () => {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState<{
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    cep: string;
  } | null>(null);
  const [erro, setErro] = useState("");

  const buscarCep = async () => {
    if (cep.length !== 8 || isNaN(Number(cep))) {
      setErro("Digite um CEP válido (8 números).");
      setDados(null);
      return;
    }

    try {
      setErro("");
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP não encontrado.");
        setDados(null);
      } else {
        setDados(response.data);
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP.");
      setDados(null);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 border-[2px] border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Buscar CEP</h2>
        <div className="flex justify-center">
          <input
            type="text"
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            className="border-[2px] border-gray-700 p-3 rounded-md w-40 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={buscarCep}
            className="bg-blue-600 text-white px-6 py-3 rounded ml-4 hover:bg-blue-700 hover:scale-105 duration-300"
          >
            Buscar
          </button>
        </div>

        {erro && <p className="text-red-400 mt-3 text-center">{erro}</p>}

        {dados && (
          <div className="mt-4 border p-3 rounded bg-gray-700 text-white">
            <p>
              <strong>Rua:</strong> {dados.logradouro}
            </p>
            <p>
              <strong>Bairro:</strong> {dados.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {dados.localidade} - {dados.uf}
            </p>
            <p>
              <strong>CEP:</strong> {dados.cep}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscador;