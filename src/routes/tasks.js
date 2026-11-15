const express = require("express");
const router = express.Router();
const { readTasksFromFile, writeTasksToFile, backupFile } = require("../utils/file");

const isEmptyText = (value) => typeof value !== "string" || value.trim() === "";

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
    const body = req.body || {};
    if (isEmptyText(body.title)) {
        return res.status(400).json({message: "Title is required", status: "error"});
    }
    const newTask = {
        ...body,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "pending"
    };
    const tasks = readTasksFromFile();
    tasks.push(newTask);
    backupFile();
    if (!writeTasksToFile(tasks)) {
        return res.status(500).json({message: "Task could not be saved", status: "error"});
    }
    res.status(201).json({message: "Task created", status: "success", task: newTask});
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updates = { ...(req.body || {}) };
    delete updates.id;
    delete updates.createdAt;
    if (updates.title !== undefined && isEmptyText(updates.title)) {
        return res.status(400).json({message: "Title cannot be empty", status: "error"});
    }
    let tasks = readTasksFromFile();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
        Object.assign(task, updates);
        backupFile();
        if (!writeTasksToFile(tasks)) {
            return res.status(500).json({message: "Task could not be saved", status: "error"});
        }
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
        if (!writeTasksToFile(tasks)) {
            return res.status(500).json({message: "Task could not be deleted", status: "error"});
        }
        res.json({message: "Task deleted", status: "success"});
    } else {
        res.status(404).json({message: "Task not found", status: "error"});
    }
});

module.exports = router;
