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
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="p-6 bg-white border-[2px] border-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Buscar CEP</h2>
        <div className="flex">
          <input
            type="text"
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            className="border-[2px] border-gray-800 p-2 rounded-md w-40"
          />
          <button
            onClick={buscarCep}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 hover:cursor-pointer hover:transform hover:scale-105 duration-350"
          >
            Buscar
          </button>
        </div>

        {erro && <p className="text-red-500 mt-2">{erro}</p>}

        {dados && (
          <div className="mt-4 border p-2 rounded bg-gray-100">
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