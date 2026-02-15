
<h1 align="center"> CRUD de Tarefas </h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- JavaScript (Node)
- Node.js HTTP Server (node:http)
- File System (fs)
- CSV Parse

## 💻 Projeto

Este projeto consiste em uma API REST desenvolvida com Node.js puro, sem uso de frameworks como Express, com o objetivo de compreender os fundamentos do backend, incluindo:

- Criação de servidor HTTP

- Sistema de rotas manual

- Middlewares

- Manipulação de requisições e respostas

- CRUD completo (Create, Read, Update, Delete)

- Persistência em arquivo

- Importação de dados via CSV utilizando async iterators

- Organização de código por responsabilidade

A API permite o gerenciamento de tarefas (tasks), seguindo os princípios básicos de uma aplicação REST.

## ▶️ Como executar

-- Clone o repositório: git clone https://github.com/seu-usuario/tasks-api-node.git

-- Acesse a pasta do projeto: cd CRUD

-- Instale as dependências: npm install

-- Execute o servidor: npm run dev

O servidor será iniciado em: http://localhost:3333

## 🔁 Rotas

<h3>POST /tasks</h3>

-Cria uma nova tarefa.

-- Body:
{
  "title": "Título da tarefa",
  "description": "Descrição da tarefa"
}
<br><br><br>
<h3>GET /tasks</h3>

-Lista todas as tarefas.

🔎 Permite busca por:

- title

- description

Exemplo:

GET /tasks?search=estudo
<br><br><br>
<h3>PUT /tasks/:id</h3>

Atualiza uma tarefa existente pelo id.

Permite atualizar:

- title

- description
<br><br><br>
<h3>PATCH /tasks/:id/complete</h3>
Alterna o status da tarefa entre completa e não completa, modificando o campo completed_at.
<br><br><br>
<h3>DELETE /tasks/:id</h3>
Remove uma tarefa pelo id.

## 📥 Importação CSV

O projeto possui um script de importação de tarefas via CSV, utilizando a biblioteca csv-parse com iterador assíncrono (for await), conforme recomendado na documentação oficial.

<h3>📄 Formato do CSV (tasks/tasks.csv)</h3>
title,description

Task 01,Descrição da Task 01
<br>
Task 02,Descrição da Task 02
<br>
Task 03,Descrição da Task 03

<h3>▶️ Executar importação</h3>
Com o servidor rodando: npm run import:csv
<br><br>
O script irá:

- Ler o arquivo CSV como stream

- Ignorar o header

- Criar uma tarefa para cada linha via POST /tasks

## 📁 Estrutura do projeto

- **src/**
  - **middlewares/**
    - `json.js`
  - **utils/**
    - `build-route-path.js`
    - `extract-query-params.js`
  - **tasks/**
    - `tasks.csv`
  - `database.js`
  - `routes.js`
  - `server.js`
  - `import-csv.js`


## :memo: Licença

Esse projeto está sob a licença MIT.

---

Feito com 💙 durante os estudos de Node.js