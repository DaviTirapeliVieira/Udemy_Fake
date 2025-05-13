import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
const endpoint = "/api/courses";

// Função de busca de cursos
export async function Cursos(nome, descricao) {
  try {
    const response = await axios.get(`${baseURL}${endpoint}`, {
      nome, 
      descricao,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao cadastrar." };
  }
}
