// @ts-check
import UIManager from "./uimanager.js";
import Project from "../project.js";
import TodoRenderer from "./todorenderer.js";

/**
 * @class ProjectRenderer
 * @classdesc A renderer for projects objects
 * @author voiceinthedark
 * */
class ProjectRenderer {
  #ui;

  /**
   * @class
   * @param {UIManager} uiManager - An instance of UIManager to perform DOM operations.
   */
  constructor(uiManager) {
    this.#ui = uiManager;
  }

  /**
   * @method
   * Renders a single project card to a given parent element.
   * @param {Node} parentElement - The DOM element where the project card will be appended.
   * @param {Project} project - The project object to render.
   * @returns {Node} Project card
   */
  renderProjectCard(parentElement, project) {
    const projectCard = this.#ui.addElement(
      "div",
      parentElement,
      "project-card",
    );

    const titleElement = this.#ui.addElement(
      "h3",
      projectCard,
      "project-title",
    );
    titleElement.textContent = project.name;

    const descElement = this.#ui.addElement(
      "p",
      projectCard,
      "project-description",
    );
    descElement.textContent = project.description;

    const todoListContainer = this.#ui.addElement(
      "ul",
      projectCard,
      "project-todos",
    );
    project.todos.forEach((todo) => {
      const todoItem = this.#ui.addElement(
        "li",
        todoListContainer,
        "todo-item",
      );
      todoItem.textContent = todo.title;
    });
    return projectCard;
  }

  /**
   * Renders a list of projects made by the user
   * @method
   * @param {Node} parentElement - parent element node where the list should be displayed under
   * @param {Array<Project>} projects - An array of project elements
   * @param {Function} onProjectClickCallback - callback function to handle project click events.
   * @param {Function} onEditClickCallback - callback function to handle the edit button
   * @param {Function} onDeleteClickCallback - callback function to handle the delete event
   * */
  renderProjectList(
    parentElement,
    projects,
    onProjectClickCallback,
    onEditClickCallback,
    onDeleteClickCallback,
  ) {
    const projectListContainer = this.#ui.addElement(
      "div",
      parentElement,
      "project-list",
    );
    const projectList = this.#ui.addElement(
      "ul",
      projectListContainer,
      "project-list-items",
    );
    projects.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.classList.add("project-item");
      projectItem.dataset.projectId = project.id;
      const projectDiv = document.createElement("div");
      const projectName = this.#ui.addElement(
        "span",
        projectDiv,
        "project-name",
      );
      if (projectName instanceof HTMLSpanElement) {
        projectName.textContent = project.name;
      }
      const projectTodosCount = this.#ui.addElement(
        "span",
        projectDiv,
        "project-todos-count",
      );
      if (projectTodosCount instanceof HTMLSpanElement) {
        projectTodosCount.textContent = `${project.todos.length}`;
      }

      // add edit button
      const projectEditButton = this.#ui.addElement(
        "i",
        projectDiv,
        "project-edit-btn",
      );
      if (projectEditButton instanceof HTMLElement) {
        projectEditButton.style.visibility = "hidden";
        projectEditButton.style.opacity = "0";
        projectEditButton.classList.add("fa-solid");
        projectEditButton.classList.add("fa-pen-to-square");
      }

      projectEditButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if (typeof onEditClickCallback === "function") {
          console.log("in edit");
          onEditClickCallback(project);
        }
      });
      // add delete button
      const projectDeleteButton = this.#ui.addElement(
        "i",
        projectDiv,
        "project-delete-btn",
      );
      if (projectDeleteButton instanceof HTMLElement) {
        projectDeleteButton.style.visibility = "hidden";
        projectDeleteButton.style.opacity = "0";
        projectDeleteButton.classList.add("fa-solid");
        projectDeleteButton.classList.add("fa-trash");

        projectDeleteButton.addEventListener("click", (event) => {
          event.stopPropagation();

          if (confirm("Are you sure you want to delete this project?")) {
            onDeleteClickCallback(project.id);
          }
        });
      }

      projectItem.appendChild(projectDiv);
      projectList.appendChild(projectItem);
      // set default project item as active
      if (projects.indexOf(project) === 0) {
        projectItem.classList.add("active");
      }
      // Add a link to each project item to render its todos
      projectItem.addEventListener("click", () => {
        // Remove 'active' class from all other project items
        document.querySelectorAll(".project-item").forEach((item) => {
          item.classList.remove("active");
        });
        // Add 'active' class to the clicked item
        projectItem.classList.add("active");

        // Delegate the actual content rendering to the AppController
        if (typeof onProjectClickCallback === "function") {
          onProjectClickCallback(project);
        }
      });

      projectItem.addEventListener("mouseenter", () => {
        if (
          projectEditButton instanceof HTMLElement &&
          projectDeleteButton instanceof HTMLElement
        ) {
          projectEditButton.style.visibility = "visible";
          projectEditButton.style.opacity = "1";

          projectDeleteButton.style.visibility = "visible";
          projectDeleteButton.style.opacity = "1";
        }
      });
      projectItem.addEventListener("mouseleave", () => {
        if (
          projectEditButton instanceof HTMLElement &&
          projectDeleteButton instanceof HTMLElement
        ) {
          projectEditButton.style.visibility = "hidden";
          projectEditButton.style.opacity = "0";
          projectDeleteButton.style.visibility = "hidden";
          projectDeleteButton.style.opacity = "0";
        }
      });
    });
    projectListContainer.appendChild(projectList);
  }
}

/**
 * @module ProjectRenderer
 * */
export default ProjectRenderer;
