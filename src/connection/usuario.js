import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function getCursosDoUsuario(userToken) {
  try {
    const response = await axios.get(`${baseURL}/api/courses?userId=${userToken}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar cursos: " + error.message);
  }
}

export async function getCertificadosDoUsuario(userToken) {
  try {
    const response = await axios.get(`${baseURL}/api/certificates?userId=${userToken}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar certificados: " + error.message);
  }
}
