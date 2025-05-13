import { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import "../styles/home.css";

export default function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <section className="section-welcome">
        <div className="head-nome">
          <div className="photo-user">
            <img className="photo" src={usuario?.imagem} alt="photo-user" />
          </div>
          <div className="container-nome">
            {usuario ? (
              <h3 className="nome-user">
                Bem-Vindo(a) de volta, {usuario?.nome}
              </h3>
            ) : (
              <h3 className="nome-user">Bem-Vindo(a), visitante!</h3>
            )}
          </div>
        </div>
      </section>

      {/*CONTEUDO DA PAGINA INICIAL*/}

      <Footer />
    </div>
  );
}
