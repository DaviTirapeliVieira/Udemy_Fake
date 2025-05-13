import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../connection/login";
import { CadastroAPI } from "../connection/cadastro";
import "../styles/login.css";

export default function Login() {
  const [LoginAtivo, setLoginAtivo] = useState(true);

  // Estados do Login
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [errorLogin, setErrorLogin] = useState({
    emailLogin: "",
    senhaLogin: "",
  });

  // Estados do Cadastro
  const [nome, setNome] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [errorCadastro, setErrorCadastro] = useState({
    nome: "",
    emailCadastro: "",
    senhaCadastro: "",
  });

  const [erros, setErros] = useState({});

  const navigate = useNavigate();

  const SubmitLogin = async (e) => {
    e.preventDefault();

    const ErrosLog = {
      emailLogin: emailLogin.trim() === "" ? "Preencha o e-mail" : "",
      senhaLogin: senhaLogin.trim() === "" ? "Preencha a senha" : "",
    };

    setErrorLogin(ErrosLog);

    if (Object.values(ErrosLog).some((msg) => msg !== "")) {
      return; // impede o envio se houver erro
    }

    try {
      const data = await LoginAPI(emailLogin, senhaLogin);
      console.log("Login bem-sucedido:", data);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);

      console.log("Login bem-sucedido:", data);

      navigate("/home");
    } catch (error) {
      setErros({
        emailLogin: error.message.includes("email") ? error.message : "",
        senhaLogin: error.message.includes("senha") ? error.message : "",
      });
    }
  };

  const SubmitCadastro = async (e) => {
    e.preventDefault();

    const ErrosCad = {
      nome: nome.trim() === "" ? "Preencha o nome" : "",
      emailCadastro: emailCadastro.trim() === "" ? "Preencha o email" : "",
      senhaCadastro: senhaCadastro.trim() === "" ? "Preencha a senha" : "",
    };

    setErrorCadastro(ErrosCad);

    if (Object.values(ErrosCad).some((msg) => msg !== "")) {
      return; // impede o envio se houver erro
    }

    try {
      const data = await CadastroAPI(nome, emailCadastro, senhaCadastro);
      console.log("Cadastro bem-sucedido:", data);

      localStorage.setItem("nome", data.nome);
      localStorage.setItem("email", data.email);

      setLoginAtivo(true); // Vai para tela de login após cadastro
    } catch (error) {
      setErros({
        nome: error.message.includes("nome") ? error.message : "",
        emailCadastro: error.message.includes("email") ? error.message : "",
        senhaCadastro: error.message.includes("senha") ? error.message : "",
      });
    }
  };

  return (
    <div className="container-screen">
      <div className="container-sobreposto">
        <div className="container-left">
          <div className="container-imagem">
            <img src="/paisagem.png" alt="imagem" />
          </div>
        </div>
      </div>

      <div className="formulario-conteiner">
        <a href="./index.html" className="form-logo">
          <img src="/logo.png" alt="Logo" />
        </a>

        {/* Formulário de Login */}
        <div
          className={`form-container form-login ${
            LoginAtivo ? "active-form" : "inactive-form"
          }`}
        >
          <h2>Login</h2>
          <form className="login-form" onSubmit={SubmitLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <div className={`cont-error${errorLogin.emailLogin || erros.emailLogin ? 'show' : ''}`}>
              <i class="bi bi-exclamation-triangle-fill img-error"></i>
              <span className="span-error">
                {errorLogin.emailLogin || erros.emailLogin || ""}
              </span>
            </div>
            <input
              type="password"
              placeholder="Senha"
              value={senhaLogin}
              onChange={(e) => setSenhaLogin(e.target.value)}
            />
            <div className={`cont-error${errorLogin.senhaLogin || erros.senhaLogin ? 'show' : ''}`}>
              <i class="bi bi-exclamation-triangle-fill img-error"></i>
              <span className="span-error">
                {errorLogin.senhaLogin || erros.senhaLogin || ""}
              </span>
            </div>
            <button type="submit">Entrar</button>
          </form>
          <p className="signup-link">
            Não tem conta?{" "}
            <button className="btn-mov" onClick={() => setLoginAtivo(false)}>
              Cadastre-se
            </button>
          </p>
        </div>

        {/* Formulário de Cadastro */}
        <div
          className={`form-container form-cadastro ${
            !LoginAtivo ? "active-form" : "inactive-form"
          }`}
        >
          <h2>Cadastro</h2>
          <form className="cadastro-form" onSubmit={SubmitCadastro}>
            <input
              type="text"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <div className={`cont-error${errorCadastro.nome || erros.nome ? 'show' : ''}`}>
              <i class="bi bi-exclamation-triangle-fill img-error"></i>
              <span className="span-error">
                {errorCadastro.nome || erros.nome || ""}
              </span>
            </div>
            <input
              type="email"
              placeholder="E-mail"
              value={emailCadastro}
              onChange={(e) => setEmailCadastro(e.target.value)}
            />
            <div className={`cont-error${errorCadastro.emailCadastro || erros.emailCadastro ? 'show' : ''}`}>
              <i class="bi bi-exclamation-triangle-fill img-error"></i>
              <span className="span-error">
                {errorCadastro.emailCadastro || erros.emailCadastro || ""}
              </span>
            </div>
            <input
              type="password"
              placeholder="Senha"
              value={senhaCadastro}
              onChange={(e) => setSenhaCadastro(e.target.value)}
            />
            <div className={`cont-error${errorCadastro.senhaCadastro || erros.senhaCadastro ? 'show' : ''}`}>
              <i class="bi bi-exclamation-triangle-fill img-error"></i>
              <span className="span-error">
                {errorCadastro.senhaCadastro || erros.senhaCadastro || ""}
              </span>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
          <p className="signup-link">
            Já tem conta?{" "}
            <button className="btn-mov" onClick={() => setLoginAtivo(true)}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
