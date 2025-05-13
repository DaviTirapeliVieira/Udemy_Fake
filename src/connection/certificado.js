import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const endpoint = "/api/certificate";

export async function CertificadoPDF(nome, nome_do_curso, data_de_conclusao) {
  try {
    const response = await axios.post(
      `${baseURL}${endpoint}`,
      {
        nome: nome,
        nome_do_curso: nome_do_curso,
        data_de_conclusao: data_de_conclusao,
      },
      {
        responseType: "arraybuffer", // Espera um arraybuffer de PDF como resposta
      }
    );
    return response.data; // Retorna o arraybuffer do PDF
  } catch (error) {
    throw new Error("Erro ao carregar o PDF: " + error.message); // Em caso de erro
  }
}
