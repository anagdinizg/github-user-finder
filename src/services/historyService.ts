interface SearchEntry {
  username: string;
  timestamp: string;
}

const STORAGE_KEY = "search_history";

export const saveToHistory = (username: string): void => {
  const history = getHistory();
  const newEntry: SearchEntry = {
    username,
    timestamp: new Date().toISOString(),
  };

  const updated = [
    newEntry,
    ...history.filter((entry) => entry.username !== username),
  ];
  localStorage.setItem("search_history", JSON.stringify(updated));
};

export const getHistory = (): SearchEntry[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const history: SearchEntry[] = raw ? JSON.parse(raw) : [];

  return history.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};
