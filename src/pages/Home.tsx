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
    <div className="home-container">
      <h1>Buscar Usuário do GitHub</h1>
      <div className="search-area">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o username"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}
      {user && <UserCard user={user} />}
    </div>
  );
}
