// @ts-check
import UIManager from "./uimanager.js";
import Project from "../project.js";

class ProjectRenderer {
  #ui;

  /**
     * @param {UIManager} uiManager - An instance of UIManager to perform DOM operations.
     */
  constructor(uiManager) {
    this.#ui = uiManager;

  }

  /**
     * Renders a single project card to a given parent element.
     * @param {Node} parentElement - The DOM element where the project card will be appended.
     * @param {Project} project - The project object to render.
     */
  renderProjectCard(parentElement, project) {
    const projectCard = this.#ui.addElement('div', parentElement, 'project-card');

    const titleElement = this.#ui.addElement('h3', projectCard, 'project-title');
    titleElement.textContent = project.name; // Assuming Project has a .title getter

    const descElement = this.#ui.addElement('p', projectCard, 'project-description');
    descElement.textContent = project.description; // Assuming Project has a .description getter

    // Add more elements for todos, buttons, etc.
    // Example: Render a list of todos within the project card
    const todoListContainer = this.#ui.addElement('ul', projectCard, 'project-todos');
    project.todos.forEach(todo => {
      const todoItem = this.#ui.addElement('li', todoListContainer, 'todo-item');
      todoItem.textContent = todo.title; // Assuming Todo has a .title getter
    });

    return projectCard;
  }
}

export default ProjectRenderer;
