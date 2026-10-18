const express = require("express");
const router = express.Router();
const { readTasksFromFile, writeTasksToFile, backupFile } = require("../utils/file");

router.get("/", (req, res) => {
    const tasks = readTasksFromFile();
    res.json({message: "Tasks retrieved", status: "success", tasks: tasks});
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const task = readTasksFromFile().find((task) => task.id === parseInt(id));
    if (task) {
        res.json({message: "Task found", status: "success", task: task});
    } else {
        res.status(404).json({message: "Task not found", status: "error"});
    }
});

router.post("/", (req, res) => {
    const newTask = req.body;
    newTask.id = Date.now();
    newTask.createdAt = new Date().toISOString();
    newTask.status = "pending";
    const tasks = readTasksFromFile();
    tasks.push(newTask);
    backupFile();
    writeTasksToFile(tasks);
    res.status(201).json({message: "Task created", status: "success", task: newTask});
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    let tasks = readTasksFromFile();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
        Object.assign(task, req.body);
        backupFile();
        writeTasksToFile(tasks);
        res.json({message: "Task updated", status: "success", task: task});
    } else {
        res.status(404).json({message: "Task not found", status: "error"});
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let tasks = readTasksFromFile();
    const lengthBefore = tasks.length;
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    if (tasks.length < lengthBefore) {
        backupFile();
        writeTasksToFile(tasks);
        res.json({message: "Task deleted", status: "success"});
    } else {
        res.status(404).json({message: "Task not found", status: "error"});
    }
});

module.exports = router;
