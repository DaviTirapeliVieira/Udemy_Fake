import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
const endpoint = "/api/progress/assistir";

// Função de busca de aulas do curso
export async function AulaView(token, nome, progress) {
  try {
    const response = await axios.post(`${baseURL}${endpoint}`, {token, nome, progress});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao cadastrar." };
  }
}
