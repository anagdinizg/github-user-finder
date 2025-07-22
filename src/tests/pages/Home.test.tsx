import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../../pages/Home";

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
});
