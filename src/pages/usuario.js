import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { getCursosDoUsuario, getCertificadosDoUsuario } from "../connection/usuario";
import "../styles/usuario.css";

export default function Usuario() {
  const [ativoBcc, setAtivoBcc] = useState("cursos");
  const [usuario, setUsuario] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      const userData = JSON.parse(usuarioLocal);
      setUsuario(userData);

      carregarDados(userData.token);
    }
  }, []);

  const carregarDados = async (userId) => {
    try {
      const cursosResponse = await getCursosDoUsuario(userId);
      const certificadosResponse = await getCertificadosDoUsuario(userId);

      setCursos(cursosResponse);
      setCertificados(certificadosResponse);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-usuario">
        <div className="header-perfil">
          <div className="user-info">
            <span className="role">{usuario?.role}</span>
            <h1 className="nome">Olá, {usuario?.nome}</h1>
            <span className="email">{usuario?.email}</span>
          </div>
          <div className="box-usuario">
            <div className="avatar-usuario">
              <img className="user-photo" src="/paisagem.png" alt="Usuário" />
            </div>
            <Link to="/">
              <button className="button-editor">Editar perfil</button>
            </Link>
          </div>
        </div>

        <div className="btn-curso-e-certif">
          <button
            className={`btn-c-c ${ativoBcc === "cursos" ? "active" : ""}`}
            onClick={() => setAtivoBcc("cursos")}
          >
            Cursos
          </button>
          <button
            className={`btn-c-c ${ativoBcc === "certificados" ? "active" : ""}`}
            onClick={() => setAtivoBcc("certificados")}
          >
            Certificados
          </button>
        </div>

        {error && <div className="erro-api">{error}</div>}

        <div className="cursos-e-certificado">
          {ativoBcc === "cursos" &&
            cursos.map((curso, index) => (
              <div key={index} className="card-cursos">
                <div className="imagem-curso">
                  <img src={curso.image} alt={curso.title} />
                  <span className="progresso">{curso.progress}</span>
                </div>
                <div className="info-curso">
                  <h3>{curso.title}</h3>
                  <p>{curso.description}</p>
                </div>
              </div>
            ))}

          {ativoBcc === "certificados" &&
            certificados.map((certificado, index) => (
              <div key={index} className="card-certificado">
                <div className="imagem-certificado">
                  <img
                    src={certificado.image}
                    alt={certificado.nome_do_curso}
                  />
                </div>
                <div className="info-certificado">
                  <h3>{certificado.nome}</h3>
                  <p>{certificado.nome_do_curso}</p>
                  <p>Data da Conclusão: {certificado.data_de_conclusao}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
