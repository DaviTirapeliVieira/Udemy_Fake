import "./App.css";
import * as ReactRouterDOM from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cursos from "./pages/cursos";
import Player from "./pages/player";
import Usuario from "./pages/usuario";
import ViewCertificado from "./pages/viewcertificado";

function App() {
  return (
    <ReactRouterDOM.BrowserRouter>
      <div className="container">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<Home />} />
          <ReactRouterDOM.Route path="/login" element={<Login />} />
          <ReactRouterDOM.Route path="/cursos" element={<Cursos />} />
          <ReactRouterDOM.Route path="/player" element={<Player />} />
          <ReactRouterDOM.Route path="/conta" element={<Usuario />} />
          <ReactRouterDOM.Route path="/viewcertificado" element={<ViewCertificado />} />
        </ReactRouterDOM.Routes>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

export default App;
