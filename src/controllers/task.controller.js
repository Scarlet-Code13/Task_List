const fs = require("fs");
const path = require("path");

// GET
const getTasks = (req, res) => {
    res.send("GET funcionando");
};


// EndPoint Post

const filePath = path.join(__dirname, "../data.json");

// POST - crear tarea
const createTask = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    // Leer el archivo
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newTask = {
        id: Date.now(),
        title,
        description
    };

    data.push(newTask);

    // Guardar en el archivo
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
};

module.exports = {
    createTask
};

// PUT
const updateTask = (req, res) => {
    res.send("PUT funcionando");
};

// DELETE
const deleteTask = (req, res) => {
    res.send("DELETE funcionando");
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};