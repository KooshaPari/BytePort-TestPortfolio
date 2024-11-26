const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// In-memory storage for projects
let projects = [];

// POST endpoint to receive processed templates and add to the gallery
app.post('/api/templates', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and content are required' });
    }

    const newProject = {
        id: projects.length + 1,
        title,
        content,
    };

    projects.push(newProject);

    // Save project content as a new HTML file for the project
    const projectFilePath = path.join(__dirname, 'public', `project-${newProject.id}.html`);
    fs.writeFileSync(projectFilePath, content);

    res.status(201).send({ message: 'Template processed and project added', project: newProject });
});

// GET endpoint to list all templates (projects)
app.get('/api/templates', (req, res) => {
    res.json(projects);
});

// Serve the project pages dynamically
app.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return res.status(404).send('Project not found');
    }

    const projectFilePath = path.join(__dirname, 'public', `project-${projectId}.html`);
    res.sendFile(projectFilePath);
});

app.listen(PORT, () => {
    console.log(`Test site running at http://localhost:${PORT}`);
});
