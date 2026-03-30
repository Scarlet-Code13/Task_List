// Import modules
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');

// IMPORTAR ROUTER
const taskRoutes = require("./routes/task.routes");



// Instance
const app = express();

// Config dotenv
dotenv.config();

// Middleware
app.use(express.json());

// USAR ROUTER 
app.use("/api", taskRoutes);

// Path del archivo JSON
const filePath = process.env.FilePath || './data.json';

// Port
const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});