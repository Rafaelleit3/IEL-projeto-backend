# IEL-projeto-backend

Este é o backend do projeto **IEL**, que gerencia produtos, categorias, imagens, e opções de produtos. O projeto utiliza Node.js, Express.js, e Sequelize para comunicação com o banco de dados MySQL.

## Funcionalidades

- Cadastro, edição e remoção de produtos.
- Gerenciamento de categorias.
- Upload e gerenciamento de imagens associadas a produtos.
- Criação de opções de produtos, como tamanhos e cores.
- Sistema de autenticação com JWT.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express.js**: Framework web para criação de APIs.
- **Sequelize**: ORM para banco de dados relacional.
- **MySQL**: Banco de dados relacional utilizado.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **JWT**: Controle de autenticação e autorização.
- **Postman**: Ferramenta para testar as rotas.

## Pré-requisitos

- Node.js (versão 14 ou superior).
- MySQL instalado e configurado.
- Postman (opcional, para testar as rotas).

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/IEL-projeto-backend.git
   cd IEL-projeto-backend

2. Instale as dependências:
npm install

3.Configure o arquivo .env com suas variáveis de ambiente:
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=database_development
DB_HOST=127.0.0.1
PORT=3000
JWT_SECRET_KEY=sua_chave_secreta

4.Configure o banco de dados:
npx sequelize db:create
npx sequelize db:migrate

5. Inicie o servidor:
npm start

Rotas Principais
Autenticação
POST /login: Gera um token de autenticação.
Produtos
GET /products: Lista todos os produtos.
POST /products: Cria um novo produto. (Requer token)
PUT /products/:id: Atualiza um produto. (Requer token)
DELETE /products/:id: Remove um produto. (Requer token)
Categorias
GET /categories: Lista todas as categorias.
POST /categories: Cria uma nova categoria. (Requer token)
PUT /categories/:id: Atualiza uma categoria. (Requer token)
DELETE /categories/:id: Remove uma categoria. (Requer token)

### Testando com o Postman
1. Configure o header Authorization com o token no formato:
Bearer <seu-token-jwt>
2. Utilize as rotas acima para testar as funcionalidades.

Estrutura do Projeto
├── src/
│   ├── config/          # Configurações da aplicação
│   ├── controllers/     # Lógica de controle
│   ├── middleware/      # Middlewares para segurança e validações
│   ├── models/          # Definição do banco de dados (ORM)
│   ├── routes/          # Rotas da API
│   ├── services/        # Regras de negócio
│   ├── app.js           # Inicialização da aplicação
│   └── server.js        # Configuração do servidor
├── .env                 # Variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo Git
└── package.json         # Dependências e scripts do projeto








