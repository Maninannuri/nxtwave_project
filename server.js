const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = { id: idCounter++, title, description };
    tasks.push(task);
    res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const { title, description } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
