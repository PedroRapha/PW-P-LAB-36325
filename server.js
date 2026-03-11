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


/*
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
--------------------- Exemplo1 ---------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

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
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
--------------------- Exemplo2 ---------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
----------------------- LAB1 -----------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
----------------------- LAB2 -----------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*/

let tasks = [
    { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
    { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];
//GET /tasks — Listar todas + GET /tasks?completed=true — Filtrar por estado
app.get("/tasks", (req, res) => {

    const { completed } = req.query;

    // Lista tudo (se não houver query)
    if (completed === undefined) {
        return res.status(200).json({ data: tasks });
    }

    // Valida query
    if (completed !== "true" && completed !== "false") {
        return res.status(400).json({
            message: "Query parameter 'completed' must be 'true' or 'false'"
        });
    }

    // Lista com filtro
    const filteredTasks = tasks.filter(
        task => task.completed === (completed === "true")
    );

    res.status(200).json({ data: filteredTasks });
});

//GET /tasks/stats - lista nº de tarefas, quantas completadas e quantas pendentes
app.get("/tasks/stats", (req, res) => {
    const numTasks = tasks.length;
    let qntFinished = 0;
    let qntUnfinished = 0;

    for(let i = 0; i < numTasks; i++) {
        if(tasks[i].completed) {
            qntFinished++;
        } else if(!tasks[i].completed) {
            qntUnfinished++;
        }
    }

    res.status(200).json({
        "Number of Tasks": numTasks,
        "Finished": qntFinished,
        "Unfinished": qntUnfinished
    });
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

//POST /tasks — Criar
app.post("/tasks", (req, res) => {
    const { title, completed, priority } = req.body;

    // Validação:
    if (!title || completed === undefined || !priority) {
        return res.status(400).json({ message: "Fields 'title', 'completed', and 'priority' are required" });
    }
    if (priority !== "low" && priority !== "medium" && priority !== "high") {
        return res.status(400).json({ message: "Priority can only be 'low', 'medium' or 'high'"});
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

    // Validação:
    if (!title || completed === undefined || !priority) {
    return res.status(400).json({ message: "Fields 'title', 'completed', and 'priority' are required" });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
        return res.status(400).json({ message: "Priority can only be 'low', 'medium' or 'high'"});
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
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
---------------------- PRISMA ----------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
----------------------- LAB3 -----------------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*/

// src/db.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//POST /tarefas — Criar
app.post("/tarefas", async (req, res) => {
    try {
        const { title, priority } = req.body;

        //Validação
        if (!title || !priority) {
            return res
                .status(400)
                .json({ message: "Fields 'title' and 'priority' are required" });
        }
        if (priority !== "low" && priority !== "medium" && priority !== "high") {
            return res.status(400).json({ message: "Priority can only be 'low', 'medium' or 'high'"});
    }

        const newTask = await prisma.task.create({
            data: { title, completed: false, priority },
        });

        return res
            .status(201)
            .json({ message: "Task created successfully", data: newTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating task" });
    }
});

//GET /tarefas — Listar todas + GET /tarefas?completed=true — Filtrar por estado
app.get("/tarefas", async (req, res) => {
    try {
        const { completed } = req.query;

        //lista todos (se não houver query)
        if (completed === undefined) {
            const tarefas = await prisma.task.findMany();
            return res.status(200).json({ data: tarefas });
        }

        // Valida query
        if (completed !== "true" && completed !== "false") {
            return res.status(400).json({
                message: "Query parameter 'completed' must be 'true' or 'false'"
            });
        }

        // Lista com filtro
        const filteredTasks = await prisma.task.findMany({
            where: {
                completed: completed === "true"
            }
        });

        return res.status(200).json({ data: filteredTasks });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching tasks" });
    }
});

//GET /tarefas/stats - lista nº de tarefas, quantas completadas e quantas pendentes
app.get("/tarefas/stats", async (req, res) => {
    try {
        const allTasks = await prisma.task.findMany();

        const numTasks = allTasks.length;
        let qntFinished = 0;
        let qntUnfinished = 0;

        for(let i = 0; i < numTasks; i++) {
            if(allTasks[i].completed) {
                qntFinished++;
            } else {
                qntUnfinished++;
            }
        }

        return res.status(200).json({
            "Number of Tasks": numTasks,
            "Finished": qntFinished,
            "Unfinished": qntUnfinished
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching task stats" });
    }
});

//GET /tarefas/:id — Listar Um
app.get("/tarefas/:id", async (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        if (isNaN(taskID)) {
            return res.status(400).json({ message: "Invalid task id" });
        }

        const tarefa = await prisma.task.findUnique({
            where: { id: taskID }
        });

        if (!tarefa) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ data: tarefa });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching task" });
    }
});

//PUT /tarefas/:id — Atualizar
app.put("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    const { title, priority } = req.body;
    try {
        const taskID = parseInt(id);

        //Validação
        if (isNaN(taskID)) {
            return res.status(400).json({ message: "Invalid task id" });
        }
        if (!title || !priority) {
            return res.status(400).json({ message: "Fields 'title' and 'priority' are required" });
        }
        if (priority !== "low" && priority !== "medium" && priority !== "high") {
            return res.status(400).json({ message: "Priority can only be 'low', 'medium' or 'high'"});
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskID },
            data: { title, priority },
        });

        return res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Error updating task" });
    }
});

//PATCH /tarefas/:id/toggle — Alternar estado completed
app.patch("/tarefas/:id/toggle", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid task id" });
        }

        const task = await prisma.task.findUnique({
            where: { id }
        })

        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                completed: !task.completed
            }
        });

        return res.status(200).json({ data: updatedTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error toggling task"})
    }
});

//DELETE /tarefas/:id — Apagar
app.delete("/tarefas/:id", async (req, res) => {
    try {
        const taskID = parseInt(req.params.id);

        if (isNaN(taskID)) {
            return res.status(400).json({ message: "Invalid task id" });
        }

        await prisma.task.delete({
            where: { id: taskID },
        });
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Error deleting task" });
    }
});

/*
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
---------------- Middlewares de Erro ---------------
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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