import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../../pages/Home";
import type { User } from "../../types/User";
import * as githubService from "../../api/githubService";

describe("Home", () => {
  it("Should render the title and search input", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /Buscar Usuário/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite o username/i)
    ).toBeInTheDocument();
  });

  it("Should allow user to type in the search field", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Digite o username/i);
    await userEvent.type(input, "anagdinizg");
    expect(input).toHaveValue("anagdinizg");
  });

  describe("Top followed users section", () => {
    const mockTopUsers: User[] = [
      {
        login: "topuser1",
        avatar_url: "https://example.com/avatar1.png",
        name: "Top User 1",
        bio: "Bio 1",
        location: "Loc1",
        followers: 5000,
        public_repos: 100,
        html_url: "https://github.com/topuser1",
      },
      {
        login: "topuser2",
        avatar_url: "https://example.com/avatar2.png",
        name: "Top User 2",
        bio: "Bio 2",
        location: "Loc2",
        followers: 4000,
        public_repos: 80,
        html_url: "https://github.com/topuser2",
      },
    ];

    beforeEach(() => {
      vi.spyOn(githubService, "getTopFollowedUsers").mockResolvedValue(
        mockTopUsers
      );
    });

    it("Should render top followed users section with user cards", async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      expect(
        await screen.findByRole("heading", {
          name: /Usuários com mais seguidores no GitHub/i,
        })
      ).toBeInTheDocument();

      expect(screen.getByText("Top User 1")).toBeInTheDocument();
      expect(screen.getByText("Top User 2")).toBeInTheDocument();

      expect(screen.getByText(/5000 seguidores/)).toBeInTheDocument();
      expect(screen.getByText(/100 repositórios/)).toBeInTheDocument();
      expect(screen.getByText(/4000 seguidores/)).toBeInTheDocument();
      expect(screen.getByText(/80 repositórios/)).toBeInTheDocument();
    });
  });
});
