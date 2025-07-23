import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  getUserFromGithub,
  getTopFollowedUsers,
} from "../../api/githubService";
import type { User } from "../../types/User";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe("githubService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should fetch user data from GitHub API", async () => {
    const mockUser: User = {
      login: "anagdinizg",
      avatar_url: "https://example.com/avatar.png",
      name: "Ana Gusmão",
      bio: "Desenvolvedora front-end",
      location: "Paraíba",
      followers: 100,
      public_repos: 42,
      html_url: "https://github.com/anagdinizg",
    };

    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockUser });

    const user = await getUserFromGithub("anagdinizg");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/anagdinizg"
    );
    expect(user).toEqual(mockUser);
  });

  it("Should throw an error if the request fails", async () => {
    mockedAxios.get = vi.fn().mockRejectedValue(new Error("Not Found"));

    await expect(getUserFromGithub("invalid_user")).rejects.toThrow(
      "Not Found"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/invalid_user"
    );
  });

  describe("getTopFollowedUsers", () => {
    it("Should fetch top followed users", async () => {
      const mockSearchResponse = {
        total_count: 2,
        incomplete_results: false,
        items: [{ login: "user1" }, { login: "user2" }],
      };

      const mockUser1: User = {
        login: "user1",
        avatar_url: "https://example.com/user1.png",
        name: "User 1",
        bio: "Bio user 1",
        location: "Location1",
        followers: 5000,
        public_repos: 100,
        html_url: "https://github.com/user1",
      };

      const mockUser2: User = {
        login: "user2",
        avatar_url: "https://example.com/user2.png",
        name: "User 2",
        bio: "Bio user 2",
        location: "Location2",
        followers: 4000,
        public_repos: 80,
        html_url: "https://github.com/user2",
      };

      mockedAxios.get = vi
        .fn()
        .mockResolvedValueOnce({ data: mockSearchResponse })
        .mockResolvedValueOnce({ data: mockUser1 })
        .mockResolvedValueOnce({ data: mockUser2 });

      const users = await getTopFollowedUsers();

      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        1,
        "https://api.github.com/search/users?q=followers:%3E1000&sort=followers&order=desc&per_page=4"
      );

      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        "https://api.github.com/users/user1"
      );

      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        3,
        "https://api.github.com/users/user2"
      );

      expect(users).toEqual([mockUser1, mockUser2]);
    });

    it("Should throw error if search request fails", async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error("API error"));

      await expect(getTopFollowedUsers()).rejects.toThrow("API error");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.github.com/search/users?q=followers:%3E1000&sort=followers&order=desc&per_page=4"
      );
    });
  });
});
