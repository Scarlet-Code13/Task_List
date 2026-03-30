const express = require("express");
const router = express.Router();



const {
    getTasks,
    createTask,
    updateTask, 
    deleteTask
} = require("../controllers/task.controller");

// rutas
router.get("/task", getTasks);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

module.exports = router;