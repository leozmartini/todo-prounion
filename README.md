# ToDo Pro union

> Projeto de gerenciamento de tarefas.

## ☕ Funcionalidade

Esta é uma aplicação de gerenciamento de tarefas desenvolvida utilizando TypeScript, Express e Vite com React. O projeto implementa um CRUD completo para tarefas, permitindo aos usuários criar, visualizar, atualizar e excluir suas tarefas. O backend é construído com Express, garantindo uma API robusta e escalável, enquanto o frontend é desenvolvido com Vite e React, proporcionando uma interface de usuário rápida e interativa.

Banco de dados: O banco de dados escolhido para essa aplicação foi o Redis, o banco de dados EM MEMÓRIA mais utilizado, seguindo assim as instruções solicitadas.

## 🛠️ Principais ferramentas

- [TypeScript](https://www.typescriptlang.org/) - Linguagem utilizada na aplicação.
- [express](https://www.npmjs.com/package/express) - Gerenciar back-end.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Sistema de token de acesso.
- [dotenv](https://www.npmjs.com/package/dotenv) - Variáveis de ambiente.
- [redis](https://redis.io/) - Banco de dados em memória.
- [Vite](https://vitejs.dev/) - Build tool de React.
- [styled-components](https://styled-components.com/) - Estilização de componentes.
- [axios](https://www.npmjs.com/package/axios) - Gerenciar requests.

## ⚙️ API

Comandos da API para consultar e registrar dados.

- Listar tarefas

```
Entrada:
GET
/tasks

Saída:
Lista todas as tarefas, em ordem de criação.
```

- Registrar tarefa

```
Entrada:
POST
/tasks
Body JSON: {
    "title": "titulo da tarefa",
    "description": "descrição da tarefa",
}

Saída:
Tarefa será criada, e response 200 e JSON com a tarefa que foi criada.

```

- Deletar tarefa

```
Entrada:
DELETE

/tasks/:id

Saída:
Task será deletada do bando de dados, response 204.

```

- Atualizar tarefa

```
Entrada:
POST
/tasks/:id
Body JSON: {
    "title": "Novo titulo",
    "description": "Nova descrição",
}

Saída:
Response 200 com os blocos atualizados.

```

## 🔗 Instalando localmente

1. Iniciar container. (Necessário docker)

```
    docker compose up --build
```

2. Instalar dependências

```
    npm run install
```

3. Aguarde o banco de dados iniciar, quando estiver pronto inicie o projeto:

```
    Windows: npm run start
    Linux: npm run start:linux
```
