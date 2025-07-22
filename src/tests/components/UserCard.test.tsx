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
};

describe("UserCard", () => {
  it("Should render user information", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(/Ana Gusmão/)).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvedora front-end/)).toBeInTheDocument();
    expect(screen.getByText(/Paraíba/)).toBeInTheDocument();
    expect(screen.getByText(/100 seguidores/)).toBeInTheDocument();
    expect(screen.getByText(/42 repositórios/)).toBeInTheDocument();
  });
});
