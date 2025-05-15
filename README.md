# Plataforma de Cursos Online

## Descrição

Este repositório abriga o código-fonte de uma **plataforma de ensino à distância**, semelhante a serviços como a **Udemy**, construída com **React**. A aplicação tem como objetivo de fornecer uma solução completa e responsiva para publicação, aquisição e consumo de cursos online, tanto para alunos quanto para instrutores.

## Funcionalidades Principais

- Cadastro e login de usuários
- Sistema de aulas com progresso do aluno
- Página de visualização das aulas 
- Interface responsiva para dispositivos
- Interface de visualização de certificado
- Ícones ilustrativos com Bootstrap Icons

## Tecnologias Utilizadas

### Frontend

- **React** `v19.1.0` — biblioteca principal da interface
- **React Router DOM** `v7.6.0` — controle de navegação e rotas SPA
- **Axios** `v1.9.0` — consumo de APIs REST
- **CSS Puro** — estilização personalizada e modularizada
- **Bootstrap Icons** `v1.13.1` — ícones vetoriais responsivos

### Ambiente

- **Node.js** `v22.14.0`
- **npm** `v10.9.2`

## Estrutura de Diretórios

components/
├── footer/ # Componente de rodape da aplicação
├── navbar/ # Componente de navbar da aplicação
├── sidebar_Aula/ # Componente de visualização das seções de determinado curso

connection/ # Pasta com axios para o consumo de APIs REST

src/
├── components/ # Componentes reutilizáveis da UI
├── connection/ # Configuração e chamadas de API via Axios
├── pages/ # Páginas principais da aplicação
├── styles/ # Estilos Personalizados da Aplicação
├── App.css/ # Estilo Global da Aplicação
├── App.js # Componente principal de rotas
└── index.js # Ponto de entrada do React

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js `>= 22.14.0`
- npm `>= 10.9.2`

### Passos para rodar localmente

```bash
# Clone o repositório
git clone https://github.com/DaviTirapeliVieira/Udemy_Fake.git
cd Udemy_Fake

# Instale as dependências
npm install

# Execute o projeto
npm start


## Contato

Para sugestões, dúvidas ou oportunidades de parceria:

- Desenvolvedor: **Davi Tirapeli Vieira**
- Email: = **davitirapelivieira@outlook.com**
