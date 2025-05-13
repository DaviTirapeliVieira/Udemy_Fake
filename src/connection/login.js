import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL; 
const endpoint = "/api/auth/login";

// Função de Login
export async function LoginAPI(email, senha) {
  try {
    const response = await axios.post(`${baseURL}${endpoint}`, {
      email,
      senha,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro de conexão." };
  }
}