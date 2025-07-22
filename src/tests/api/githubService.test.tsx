import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getUserFromGithub } from "../../api/githubService";
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
});
