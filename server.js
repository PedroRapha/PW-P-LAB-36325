require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "My API is working!" });
});

/*---------- EXEMPLO 1 ----------

app.get("/users", (req, res) => {
    res.status(200).json({ message: "OK - GET users" });
});

app.post("/users", (req, res) => {
    res.status(200).json({ message: "OK - POST users" });
});

app.put("/users/:id", (req, res) => {
    res.status(200).json({ message: "OK - PUT users" });
});

app.delete("/users/:id", (req, res) => {
    res.status(200).json({ message: "OK - DELETE users" });
});
*/

/*
---------- EXEMPLO 2 ----------
CRUD com Mock
*/

let users = [
    { id: 1, name: "Ana", email: "ana@email.com" },
    { id: 2, name: "João", email: "joao@email.com" }
];

//GET /users — Listar todos

app.get("/users", (req, res) => {
    res.status(200).json({ data: users });
});

//GET /users/:id — Obter um

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    res.status(200).json({ data: user });
});

//POST /users — Criar
app.post("/users", (req, res) => {
    const { name, email } = req.body;

  // Validação
    if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
    }

    const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email
    };

    users.push(newUser);
    res.status(201).json({ data: newUser });
});

//PUT /users/:id — Atualizar
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    const { name, email } = req.body;

    if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
    }

    users[index] = { id, name, email };
    res.status(200).json({ data: users[index] });
});

//DELETE /users/:id — Apagar
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    users.splice(index, 1);
    res.status(200).json({ message: "Utilizador eliminado com sucesso" });
});

/*
---------- LAB1 ----------
*/

let movies = [ { id: 1, title: "Inception", year: 2010 }, { id: 2, title: "Interstellar", year: 2014 } ];

//GET /movies — Listar todos

app.get("/movies", (req, res) => {
    res.status(200).json({ data: movies });
});

//GET /movies/:id — Obter um

app.get("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find((u) => u.id === id);

    if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ data: movie });
});

//POST /movies — Criar
app.post("/movies", (req, res) => {
    const { title, year } = req.body;

  // Validação
    if (!title || !year) {
    return res.status(400).json({ message: "Fields 'title' and 'year' are required" });
    }

    const newMovie = {
    id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
    title,
    year
    };

    movies.push(newMovie);
    res.status(201).json({ data: newMovie });
});

//PUT /movies/:id — Atualizar
app.put("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Movie not found" });
    }

    const { title, year } = req.body;

    if (!title || !year) {
    return res.status(400).json({ message: "Fields 'title' and 'year' are required" });
    }

    movies[index] = { id, title, year };
    res.status(200).json({ data: movies[index] });
});

//DELETE /movies/:id — Apagar
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Movie not found" });
    }

    movies.splice(index, 1);
    res.status(200).json({ message: "Movie deleted successfully" });
});

/*
---------- LAB2 ----------
*/

let tasks = [
    { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
    { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];
//GET /tasks — Listar todas

app.get("/tasks", (req, res) => {
    res.status(200).json({ data: tasks });
});

//GET /tasks/:id — Obter uma

app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((u) => u.id === id);

    if (!task) {
    return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: task });
});

//GET /tasks?completed=true — Filtrar por estado (usar req.query)
app.get("/tasks?completed=true", (req, res) => {
    let qnt = 0;
    for(let i = 0; i < tasks.length; i++) {
        if (req.query) {
            res.status(200).json({ data: task });
            qnt++;
        }
    }

    if (!qnt) {
        return res.status(404).json({ message: "Task not found" });
    }
});
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR
//IMPLEMENTAR


//POST /tasks — Criar
app.post("/tasks", (req, res) => {
    const { title, completed, priority } = req.body;

  // Validação
    if (!title || completed === undefined || !priority) {
    return res.status(400).json({ message: "Fields 'title', 'completed', and 'priority' are required" });
    }

    const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed,
    priority
    };

    tasks.push(newTask);
    res.status(201).json({ data: newTask });
});

//PUT /tasks/:id — Atualizar
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
    }

    const { title, completed, priority } = req.body;

    if (!title || completed === undefined || !priority) {
    return res.status(400).json({ message: "Fields 'title', 'completed', and 'priority' are required" });
    }

    tasks[index] = { id, title, completed, priority };
    res.status(200).json({ data: tasks[index] });
});

//PATCH /tasks/:id/toggle — Alternar estado completed
app.patch("/tasks/:id/toggle", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
    }

    tasks[index].completed = !tasks[index].completed;
    res.status(200).json({ data: tasks[index] });
});

//DELETE /tasks/:id — Apagar
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((u) => u.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted successfully" });
});

/*
---------- Middlewares de Erro ----------
*/
// Rota não encontrada (404)
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erro interno do servidor" });
});

//Importante para criar a comunicação com o local host
// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
    });
}

// Para a Vercel
module.exports = app;