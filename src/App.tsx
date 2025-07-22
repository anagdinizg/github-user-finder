import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";

export default function App() {
  return (
    <div className="min-h-screen bg-beige text-brown font-serif">
      <Router>
        <nav className="p-4 shadow bg-brown text-white flex justify-center gap-8">
          <NavLink to="/">Buscar</NavLink>

          <NavLink to="/history">Histórico</NavLink>
        </nav>

        <main className="max-w-4xl mx-auto p-6 bg-beige min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
