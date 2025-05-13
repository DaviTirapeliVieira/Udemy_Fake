import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/navbar";
import { SidebarAula } from "../components/sidebar_Aula/index.jsx";
import { AulaView } from "../connection/aulaView";
import "../styles/player.css";

export default function Player() {
  const [progresso, setProgresso] = useState(0); // progresso inicial da aula
  const videoRef = useRef(null); // referência ao elemento do vídeo

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const section = JSON.parse(localStorage.getItem("currentSection"));

  useEffect(() => {
    const handleVideoProgress = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime; // tempo atual do video
        const duration = videoRef.current.duration; // tempo total do vídeo
        const progressPercentage = (currentTime / duration) * 100; // progresso do vídeo em porcentagem
        setProgresso(progressPercentage); // atualiza o progresso
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleVideoProgress); // adiciona o evento de progresso enquanto o vídeo é reproduzido
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleVideoProgress); // limpa o evento quando o componente for desmontado
      }
    };
  }, []);

  // chamada quando o vídeo terminar
  const handleVideoEnd = async () => {
    if (section && usuario) {
      try {
        const progress = 100; // quando o vídeo termina, o progresso é 100%
        await AulaView(usuario.token, section.title, progress); // envia o progresso para a API
        localStorage.setItem("videoProgress", JSON.stringify(progress)); // salva o progresso no localStorage
        setProgresso(progress); // atualiza o estado de progresso
        console.log("Progresso de aula finalizado!");
      } catch (error) {
        console.error("Erro ao atualizar o progresso:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-player">
        <div className="video-section">
          <div className="video-container">
            <video
              ref={videoRef}
              id="video"
              controls
              onEnded={handleVideoEnd} // chama a função ao terminar o vídeo
            >
              <source src={section?.videoUrl} type="video/mp4" />{" "}
              {/* O link do vídeo da API */}
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
          <SidebarAula />
        </div>
      </div>
      <div className="head-nome-aula">
        <div className="container-nome-aula">
          <h3 className="nome-aula">{section?.title || "Aula Iniciada!"}</h3>
        </div>
      </div>
    </div>
  );
}
