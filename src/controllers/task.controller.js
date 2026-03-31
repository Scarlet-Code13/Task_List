const fs = require("fs");
const path = require("path");

// GET
const getTasks = (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        res.status(200).json({
            message: "Tasks obtained successfully",
            tasks: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Error reading tasks",
            error: error.message
        });
    }
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
    const id = req.params.id;
    const { title, description } = req.body;

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const taskIndex = data.findIndex(task => task.id == id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    // Actualizar datos
    data[taskIndex].title = title || data[taskIndex].title;
    data[taskIndex].description = description || data[taskIndex].description;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({
        message: "Task updated successfully",
        task: data[taskIndex]
    });
};
// DELETE

const deleteTask = (req, res) => {
    const id = Number(req.params.id); // <-- convertir a número

    try {
        const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const filteredTasks = tasks.filter(task => task.id !== id);

        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ message: `Task with id ${id} not found` });
        }

        fs.writeFileSync(filePath, JSON.stringify(filteredTasks, null, 2));

        res.json({ message: `Task with id ${id} deleted successfully` });

    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};




module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};