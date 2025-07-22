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
    <Router>
      <nav>
        <NavLink to="/">Buscar</NavLink>

        <NavLink to="/history">Histórico</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
