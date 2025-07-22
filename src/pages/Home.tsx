import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserFromGithub } from "../api/githubService";
import { getFromCache, saveToCache } from "../services/cacheService";
import { UserCard } from "../components/UserCard";
import type { User } from "../types/User";

export function Home() {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const fetchUser = async (userToSearch: string) => {
    setError("");
    setUser(null);
    const cached = getFromCache(userToSearch);
    if (cached) {
      setUser(cached);
      return;
    }

    try {
      const data = await getUserFromGithub(userToSearch);
      setUser(data);
      saveToCache(userToSearch, data);
    } catch {
      setError("Usuário não encontrado");
    }
  };

  useEffect(() => {
    const paramUser = searchParams.get("user");
    if (paramUser) {
      setUsername(paramUser);
      fetchUser(paramUser);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (username.trim()) {
      fetchUser(username.trim());
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-serif mb-8 mt-6 text-brown-dark">
        Buscar Usuário do GitHub
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-xl mx-auto">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o username"
          className="border border-brown rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-dark focus:border-transparent flex-grow bg-beige text-brown-dark placeholder-brown"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-brown text-beige rounded-md px-6 py-2 hover:bg-brown-dark transition font-semibold"
        >
          Buscar
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-6 text-center font-medium">{error}</p>
      )}
      {user && <UserCard user={user} />}
    </div>
  );
}
