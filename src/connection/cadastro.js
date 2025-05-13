import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL; 
const endpoint = "/api/auth/register";

// Função de cadastro
export async function CadastroAPI(nome, email, senha) {
  try {
    const response = await axios.post(`${baseURL}${endpoint}`, {
      nome,
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao cadastrar." };
  }
}
