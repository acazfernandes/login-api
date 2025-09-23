# Login API

> Uma API de autenticação de usuários desenvolvida para fins de estudo, com foco em boas práticas e controle de acesso baseado em perfis (Role-Based Access Control).

<p align="center">
  </p>

## 📝 Sobre o Projeto

Este projeto foi criado como uma ferramenta de aprendizado prático para aprofundar o conhecimento no desenvolvimento de APIs de autenticação e autorização, um componente fundamental em aplicações web modernas.

O foco principal está na implementação de um sistema seguro de login que utiliza perfis de permissão distintos, demonstrando um cenário real onde diferentes tipos de usuários possuem acesso a diferentes funcionalidades do sistema.

## ✨ Features

-   **Autenticação de Usuários:** Sistema seguro para registro e login de usuários.
-   **Controle de Acesso Baseado em Perfis (RBAC):** Implementação de diferentes níveis de permissão para os perfis:
    -   `ADMIN`: Acesso total ao sistema.
    -   `SUPPORT`: Acesso a funcionalidades de gerenciamento de usuários.
    -   `CLIENT`: Acesso limitado às suas próprias informações e funcionalidades básicas.
-   **Endpoints Protegidos:** Rotas da API que requerem autenticação e autorização específica para serem acessadas.

## 🚀 Começando

Esta seção guiará novos usuários a rodar o projeto em suas máquinas locais.

### **Pré-requisitos**

Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

-   [Node.js](https://nodejs.org/) (v20.x ou superior)
-   [NPM](https://www.npmjs.com/) (v10.x ou superior)
-   [PostgreSQL](https://www.postgresql.org/)

### **Instalação**

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/acazfernandes/login-api.git](https://github.com/acazfernandes/login-api.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```sh
    cd login-api
    ```
3.  **Instale as dependências:**
    ```sh
    npm install
    ```
4.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo chamado `.env` na raiz do projeto.
    -   Dentro dele, adicione a sua `DATABASE_URL` para o PostgreSQL. Exemplo:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    ```
5.  **Execute as migrations do Prisma para criar as tabelas no banco de dados:**
    ```sh
    npx prisma migrate dev
    ```
6.  **Gere o cliente do Prisma:**
    ```sh
    npx prisma generate
    ```

### **Uso**

Para iniciar o servidor em modo de desenvolvimento, execute o comando:

```sh
npm run dev