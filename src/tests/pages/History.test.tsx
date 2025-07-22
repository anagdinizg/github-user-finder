import { vi } from "vitest";

vi.mock("../../services/historyService", () => ({
  getHistory: () => [
    { username: "anagdinizg", timestamp: "2025-07-22T19:00:00.000Z" },
    { username: "yagogusmao", timestamp: "2025-07-21T18:00:00.000Z" },
  ],
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { History } from "../../pages/History";

describe("History", () => {
  it("Should display search history", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    expect(screen.getByText(/Histórico de Buscas/i)).toBeInTheDocument();
    expect(screen.getByText("anagdinizg")).toBeInTheDocument();
    expect(screen.getByText("yagogusmao")).toBeInTheDocument();
  });
});
