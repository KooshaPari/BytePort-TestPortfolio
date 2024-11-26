document.addEventListener("DOMContentLoaded", async () => {
	const gallery = document.getElementById("gallery");

	try {
		const response = await fetch("/api/templates");
		const projects = await response.json();

		projects.forEach((project) => {
			if (project.type === "list-entry") {
				const card = document.createElement("div");
				card.className = "project-card";
				card.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.content}</p>
                `;
				gallery.appendChild(card);
			}
		});
	} catch (error) {
		console.error("Error fetching projects:", error);
	}
});
