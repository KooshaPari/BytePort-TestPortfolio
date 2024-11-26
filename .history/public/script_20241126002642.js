document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');

    try {
        const response = await fetch('/api/templates');
        const projects = await response.json();

        projects.forEach((project) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h2>${project.title}</h2>
                <a href="/project/${project.id}">View Project</a>
            `;
            gallery.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
});
