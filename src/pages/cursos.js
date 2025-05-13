import { useState, useEffect } from "react";
import { AulaView as fetchCursos } from "../connection/aulaView";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import "../styles/cursos.css";

export default function Cursos() {
  // Estado para armazenar os cursos
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os cursos
  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const dados = await fetchCursos(); // Busca os cursos
        setCursos(dados); // Atualiza o estado com os cursos
      } catch (erro) {
        setError("Erro ao carregar cursos");
      } finally {
        setLoading(false);
      }
    };

    carregarCursos();
  }, []); 

  return (
    <div>
      <Navbar />
      <section className="section-title">
        <div className="head-title">
          <div className="container-title">
            <h3>Meus cursos</h3>
          </div>
        </div>
      </section>

      {loading ? (
        <div>Carregando cursos...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="cursos">
          {cursos.map((curso, index) => (
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
        </div>
      )}

      <Footer />
    </div>
  );
}
