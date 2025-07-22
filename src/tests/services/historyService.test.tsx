import { describe, it, expect, beforeEach, vi } from "vitest";
import { saveToHistory, getHistory } from "../../services/historyService";

interface SearchEntry {
  username: string;
  timestamp: string;
}

describe("historyService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return an empty array if no history is saved", () => {
    const history = getHistory();
    expect(history).toEqual([]);
  });

  it("should save a new search entry to history", () => {
    const username = "anagdinizg";

    saveToHistory(username);

    const stored = localStorage.getItem("search_history");
    expect(stored).not.toBeNull();

    const parsed: SearchEntry[] = stored ? JSON.parse(stored) : [];
    expect(parsed.length).toBe(1);
    expect(parsed[0].username).toBe(username);
    expect(new Date(parsed[0].timestamp).toString()).not.toBe("Invalid Date");
  });

  it("should keep history sorted by timestamp descending", () => {
    const oldEntry: SearchEntry = {
      username: "oldUser",
      timestamp: new Date("2023-01-01T10:00:00Z").toISOString(),
    };
    const newEntry: SearchEntry = {
      username: "newUser",
      timestamp: new Date("2023-01-02T10:00:00Z").toISOString(),
    };

    localStorage.setItem("search_history", JSON.stringify([oldEntry]));

    saveToHistory(newEntry.username);

    const history = getHistory();

    expect(history.length).toBe(2);
    expect(history[0].username).toBe(newEntry.username);
    expect(history[1].username).toBe(oldEntry.username);
  });

  it("should move existing username to top on new save", () => {
    const entry1: SearchEntry = {
      username: "user1",
      timestamp: new Date("2023-01-01T10:00:00Z").toISOString(),
    };
    const entry2: SearchEntry = {
      username: "user2",
      timestamp: new Date("2023-01-02T10:00:00Z").toISOString(),
    };

    localStorage.setItem("search_history", JSON.stringify([entry1, entry2]));

    saveToHistory("user1");

    const history = getHistory();

    expect(history.length).toBe(2);
    expect(history[0].username).toBe("user1");
    expect(new Date(history[0].timestamp).getTime()).toBeGreaterThan(
      new Date(entry2.timestamp).getTime()
    );
  });
});
