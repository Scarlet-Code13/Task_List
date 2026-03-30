// GET
const getTasks = (req, res) => {
    res.send("GET funcionando");
};

// POST
const createTask = (req, res) => {
    res.send("POST funcionando");
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