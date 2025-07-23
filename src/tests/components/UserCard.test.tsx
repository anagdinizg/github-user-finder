import { render, screen } from "@testing-library/react";
import { UserCard } from "../../components/UserCard";
import type { User } from "../../types/User";

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

describe("UserCard", () => {
  it("Should render user information", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(/Ana Gusmão/)).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvedora front-end/)).toBeInTheDocument();
    expect(screen.getByText(/Paraíba/)).toBeInTheDocument();
    expect(screen.getByText(/100 seguidores/)).toBeInTheDocument();
    expect(screen.getByText(/42 repositórios/)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /ver no github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockUser.html_url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
