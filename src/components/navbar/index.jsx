import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

// Navbar
export function Navbar() {
  const [modalVisivel, setmodalVisivel] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Verifica se o usuário está logado
  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    }
  }, []);

  // altera a visibilidade do modal
  const verModal = () => {
    setmodalVisivel((prev) => !prev);
  };

  // fecha o modal ao clicar fora
  const ClicarFora = (e) => {
    const avatar = document.getElementById("user_photo");
    const modalUser = document.getElementById("modal_user");

    if (
      avatar &&
      modalUser &&
      !avatar.contains(e.target) &&
      !modalUser.contains(e.target)
    ) {
      setmodalVisivel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", ClicarFora);

    return () => {
      document.removeEventListener("click", ClicarFora);
    };
  }, []);

  // Função de logout
  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null); // remove o usuario
    navigate("/login"); // manda para a pagina de login
  };

  return (
    <nav className="header">
      <Link to="/" className="logo">
        <img className="img-logo" src="/logo.png" alt="Logo" />
      </Link>
      <div className="nav-container">
        <div className="busca-box">
          <input type="text" placeholder="Buscar" />
          <i class="bi bi-search icon-busca"></i>
        </div>

        {usuario ? (
          <>
            {/* Meus Cursos */}
            <div className="meu-aprendizado-container">
              <button className="meu-aprendizado" id="btn-meu-aprendizado">
                <Link className="link-meu-aprendizado" to="/cursos">
                  Meus cursos
                </Link>
              </button>
              <div className="modal-meu-aprendizado" id="modal-meu-aprendizado">
                <ul id="lista-meu-aprendizado"></ul>
              </div>
            </div>

            {/* Notificações */}
            <div className="notificacao-container">
              <button className="notificacao" id="btn-notificacao">
                <i className="bi bi-bell"></i>
              </button>
              <div className="modal-notificacao" id="modal-notificacao">
                <ul id="lista-notificacoes"></ul>
              </div>
            </div>

            {/* Menu do usuário */}
            <div className="user-menu-container">
              <img
                src={usuario?.imagem}
                alt="Usuário"
                className="user"
                id="user_photo"
                onClick={verModal}
              />
              <div
                className="modal-user"
                id="modal_user"
                style={{ display: modalVisivel ? "flex" : "none" }}
              >
                <Link to="/conta">Perfil</Link>
                <Link to="/cursos">Meus cursos</Link>
                <Link to="/" id="logout" onClick={Logout}>
                  Sair
                </Link>
              </div>
            </div>
          </>
        ) : (
          <ul className="navbar">
            <li>
              <Link to="/login">Fazer login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
