import { useState, useEffect } from "react";
import { AulaView } from "../../connection/aulaView";
import axios from "axios";
import "./style.css";

export function SidebarAula() {
  const [openSections, setOpenSections] = useState([]); // controla quais seções estão abertas
  const [sidebarOpen, setSidebarOpen] = useState(false); // visibilidade da sidebar
  const [sections, setSections] = useState([]); // armazena as seções do curso
  const [loading, setLoading] = useState(true); // estado de loading
  const [progresso, setProgresso] = useState({}); // armazena o progresso de cada seção

  useEffect(() => {
    const fetchSections = async () => {
      try {
        // API que retorna as seções do curso
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/sections`
        );
        setSections(response.data); // atualiza as seções
        setLoading(false); // finaliza o loading
      } catch (error) {
        console.error("Erro ao buscar as seções:", error);
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // alterna o estado de abertura das seções
  const SectionAnimation = (index) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // alterna a visibilidade da sidebar
  const btnSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // chamada quando uma aula é clicada, registrando o progresso
  const handleAulaClick = async (section) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return console.error("Usuário não encontrado");

    try {
      const response = await AulaView(
        usuario.token,
        section.title,
        100 // Envia o progresso como 100% quando a aula é completa
      );
      console.log("Progresso enviado:", response);
      setProgresso((prevProgresso) => ({
        ...prevProgresso,
        [section._id]: 100, // Atualiza o progresso para 100% para essa seção
      }));
    } catch (error) {
      console.error("Erro ao registrar progresso:", error.message);
    }
  };

  return (
    <div>
      <button className="sidebar-btn" onClick={btnSidebar}>
        {sidebarOpen ? "X" : "≡"}
      </button>

      <aside className={`curso-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Conteúdo do curso</h2>
        </div>

        <div className="sidebar-corpo">
          {loading ? (
            <p>Carregando as aulas...</p>
          ) : (
            sections.map((section, index) => (
              <div
                key={section._id}
                className={`section ${
                  openSections.includes(index) ? "open" : ""
                }`}
              >
                <div
                  className="section-header"
                  onClick={() => {
                    SectionAnimation(index);
                    handleAulaClick(section);
                  }}
                >
                  <span>
                    Aula {index + 1}: {section.title}
                  </span>
                  <span className="seta">▼</span>
                </div>
                <div className="section-content">{section.aula}</div>

                {progresso[section._id] !== undefined && (
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${progresso[section._id]}%`,
                      }}
                    />
                    <span>{progresso[section._id]}%</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
