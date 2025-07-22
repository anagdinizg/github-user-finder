import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import { useNavigate } from "react-router-dom";

interface SearchEntry {
  username: string;
  timestamp: string;
}

export function History() {
  const [history, setHistory] = useState<SearchEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return isNaN(date.getTime()) ? "Data inválida" : date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-beige p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brown mb-6 text-center">
          Histórico de Buscas
        </h1>{" "}
        <ul>
          {history.length === 0 ? (
            <p className="text-center text-brown-dark text-lg">
              Nenhuma busca registrada.
            </p>
          ) : (
            <ul className="space-y-4">
              {history.map((entry, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <button
                    className="text-brown font-semibold hover:underline text-lg"
                    onClick={() => navigate(`/?user=${entry.username}`)}
                  >
                    {entry.username}
                  </button>
                  <span className="text-sm text-brown-dark">
                    {formatDate(entry.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}
