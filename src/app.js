const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use('/tasks', tasksRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found', status: 'error' });
});

app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error', status: 'error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});