import { useState, useEffect } from "react";
import { CertificadoPDF } from "../connection/certificado";

export default function Certificado() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("usuario"));

  const nome = userData?.nome;
  const nome_do_curso = userData?.nome_do_curso;
  const data_de_conclusao = userData?.data_de_conclusao;

  useEffect(() => {
    const loadPdf = async () => {
      try {
        if (!nome || !nome_do_curso || !data_de_conclusao) {
          setError("Dados insuficientes para gerar o certificado.");
          return;
        }

        // Faz a requisição ao backend e obtém o ArrayBuffer
        const pdfArrayBuffer = await CertificadoPDF(
          nome,
          nome_do_curso,
          data_de_conclusao
        );

        // ArrayBuffer para Blob
        const blob = new Blob([pdfArrayBuffer], { type: "application/pdf" });

        // Cria uma URL para o Blob
        const url = URL.createObjectURL(blob);

        // estado com a URL do PDF
        setPdfUrl(url);
      } catch (err) {
        setError("Erro ao carregar o PDF.");
        console.error(err);
      }
    };

    if (userData) {
      loadPdf();
    }
  }, [userData, nome, nome_do_curso, data_de_conclusao]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {pdfUrl ? (
        <div>
          <h2>Certificado</h2>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="Visualização do Certificado"
          ></iframe>
          <br />
          <a href={pdfUrl} download="certificado.pdf">
            <button>Baixar PDF</button>
          </a>
        </div>
      ) : (
        <div>Carregando certificado...</div>
      )}
    </div>
  );
}
