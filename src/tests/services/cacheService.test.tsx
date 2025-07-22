import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFromCache, saveToCache } from "../../services/cacheService";
import type { User } from "../../types/User";

describe("cacheService", () => {
  const mockUser: User = {
    login: "anagdinizg",
    avatar_url: "https://example.com/avatar.png",
    name: "Ana Gusmão",
    bio: "Desenvolvedora front-end",
    location: "Paraíba",
    followers: 100,
    public_repos: 42,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("saveToCache should save the user to localStorage", () => {
    saveToCache("anagdinizg", mockUser);
    const stored = localStorage.getItem("user_anagdinizg");
    expect(stored).toBe(JSON.stringify(mockUser));
  });

  it("getFromCache should return the user saved in localStorage", () => {
    localStorage.setItem("user_anagdinizg", JSON.stringify(mockUser));
    const user = getFromCache("anagdinizg");
    expect(user).toEqual(mockUser);
  });

  it("getFromCache should return null if localStorage is empty", () => {
    const user = getFromCache("naoexiste");
    expect(user).toBeNull();
  });
});
