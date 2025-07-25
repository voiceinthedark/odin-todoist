// @ts-check
import UIManager from "./uimanager.js";
import Todo from "../todo.js";
import Project from "../project.js";
import { format } from "date-fns";

/**
 * @class
 * @classdesc Module to render modals
 * */
class ModalRenderer {
  #parentElement;
  #ui;
  #todo;
  #project;
  /**
   * @constructor
   * @param {Todo | null | undefined} todo
   * @param {Project | null | undefined} project
   * @param {Node} parentElement
   * @param {UIManager} uiManager
   * */
  constructor(todo = null, project = null, parentElement, uiManager) {
    this.#todo = todo;
    this.#project = project;
    this.#ui = uiManager;
    this.#parentElement = parentElement;
  }

  /**
   * @method - show new project modal
   * @param {(name: string, description: string) => void} [onSubmit=(name, description) => { }]
   * */
  showNewProjectModal(onSubmit = (name, description) => {}) {
    const modal = this.#ui.addElement("div", this.#parentElement, "modal");
    if (modal instanceof HTMLDivElement) {
      modal.classList.add("show");
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa-solid fa-x"></i></span>
        <h2>Add new Project</h2>
        <form id="add-project-form">
          <label for="project-name">Name:</label>
          <input type="text" id="project-name" name="name" required>
          <label for="project-description">Description:</label>
          <textarea id="project-description" name="description" rows="5"></textarea>
          <button type="submit">Save</button>
        </form>
      </div>`;

      const closeButton = modal.querySelector(".close");
      closeButton?.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      });

      const addProjectForm = modal.querySelector("#add-project-form");
      if (addProjectForm instanceof HTMLFormElement) {
        addProjectForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(addProjectForm);
          const name = formData.get("name")?.toString() || "";
          const description = formData.get("description")?.toString() || "";

          // call submit function wit the project data
          onSubmit(name, description);

          // Close the modal
          modal.classList.remove("show");
          modal.classList.add("hide");
        });
      }
    }
  }

  /**
   * @method - show the edit project modal
   * @param {(name: string, description: string) => void} [onEdit=(name, description) => {}]
   * */
  showEditProjectModal(onEdit = (name, description) => {}) {
    const modal = this.#ui.addElement("div", this.#parentElement, "modal");
    if (modal instanceof HTMLDivElement) {
      modal.classList.add("show");
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa-solid fa-x"></i></span>
        <h2>Edit Project</h2>
        <form id="edit-project-form">
          <label for="project-name">Name:</label>
          <input type="text" id="project-name" name="name" value="${this.#project?.name}" required>
          <label for="project-description">Description:</label>
          <textarea id="project-description" name="description" rows="5">${this.#project?.description}</textarea>
          <button type="submit">Save</button>
        </form>
      </div>`;
      const closeButton = modal.querySelector(".close");
      closeButton?.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      });

      const editProjectForm = modal.querySelector("#edit-project-form");
      if (editProjectForm instanceof HTMLFormElement) {
        editProjectForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(editProjectForm);
          const name = formData.get("name")?.toString() || "";
          const description = formData.get("description")?.toString() || "";

          onEdit(name, description);

          // Close the modal
          modal.classList.remove("show");
          modal.classList.add("hide");
        });
      }
    }
  }

  /**
   * @method - show new todo modal
   * @param {(todo: Todo) => void} [onSubmit=(todo) => { }]
   * */
  showNewTodoModal(onSubmit = (todo) => {}) {
    const modal = this.#ui.addElement("div", this.#parentElement, "modal");
    if (modal instanceof HTMLDivElement) {
      modal.classList.add("show");
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa-solid fa-x"></i></span>
        <h2>Add new Todo</h2>
        <form id="add-todo-form">
          <label for="todo-title">Title:</label>
          <input type="text" id="todo-title" name="title" required>
          <label for="todo-description">Description:</label>
          <textarea id="todo-description" name="description" rows="5"></textarea>
          <label for="todo-due-date">Due Date:</label>
          <input type="datetime-local" id="todo-due-date" name="dueDate">
          <label for="todo-priority">Priority:</label>
          <select id="todo-priority" name="priority">
            <option value="1">Lowest</option>
            <option value="2">Low</option>
            <option value="3">Medium</option>
            <option value="4">High</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>`;

      const closeButton = modal.querySelector(".close");
      closeButton?.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      });
      const addTodoForm = modal.querySelector("#add-todo-form");
      if (addTodoForm instanceof HTMLFormElement) {
        addTodoForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(addTodoForm);
          const title = formData.get("title")?.toString() || "";
          const description = formData.get("description")?.toString() || "";
          const dueDateString = formData.get("dueDate");
          const dueDate =
            typeof dueDateString === "string" && dueDateString.length > 0
              ? new Date(dueDateString)
              : new Date();
          const priorityString = formData.get("priority");
          const priority =
            typeof priorityString === "string"
              ? parseInt(priorityString, 10)
              : 3; // Default to Medium if not provided
          console.log(
            `Creating new Todo with title: ${title}, description: ${description}, dueDate: ${dueDate}, priority: ${priority}`,
          );

          // Create a new Todo object
          const todo = new Todo(title, description, dueDate, priority);

          // Call the onSubmit function with the new todo
          onSubmit(todo);

          // Close the modal
          modal.classList.remove("show");
          modal.classList.add("hide");
        });
      }
    }
  }

  /**
   * @method showEditModal to show the modal ui
   * @param {Function} onUpdate
   * */
  showEditModal(onUpdate = () => {}) {
    if (!this.#todo) {
      console.error(
        "ModalRenderer: Cannot show edit modal without a todo object.",
      );
      return;
    }
    const modal = this.#ui.addElement("div", this.#parentElement, "modal");

    if (modal instanceof HTMLDivElement) {
      modal.classList.add("show");
      if (this.#todo.dueDate === null) {
        this.#todo.dueDate = new Date();
      }
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa-solid fa-x"></i></span>
        <h2>Edit ${this.#todo.title}</h2>
        <form id="edit-todo-form">
          <label for="todo-title">Title:</label>
          <input type="text" id="todo-title" name="title" value="${this.#todo.title}" required>
          <label for="todo-description">Description:</label>
          <textarea id="todo-description" name="description" rows="5">${this.#todo.description}</textarea>
          <label for="todo-due-date">Due Date:</label>
          <input type="datetime-local" id="todo-due-date" name="dueDate" value="${format(this.#todo.dueDate, `yyyy-MM-dd'T'HH:mm`)}">
          <label for="todo-priority">Priority:</label>
          <select id="todo-priority" name="priority">
            <option value="1" ${this.#todo.priority === 1 ? "selected" : ""}>Lowest</option>
            <option value="2" ${this.#todo.priority === 2 ? "selected" : ""}>Low</option>
            <option value="3" ${this.#todo.priority === 3 ? "selected" : ""}>Medium</option>
            <option value="4" ${this.#todo.priority === 4 ? "selected" : ""}>High</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>`;

      const close = () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      };

      const closeButton = modal.querySelector(".close");
      if (closeButton) {
        closeButton.addEventListener("click", close);
      }

      const editForm = modal.querySelector("#edit-todo-form");
      if (editForm instanceof HTMLFormElement) {
        editForm.addEventListener("submit", (event) => {
          event.preventDefault();

          console.log("form submitted");

          const formData = new FormData(editForm);
          for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
          if (!this.#todo) {
            console.error("ModalRenderer: todo object is null or undefined");
            return;
          }
          // update todo
          this.#todo.title = "" + formData.get("title") || "";
          this.#todo.description = "" + formData.get("description") || "";
          const dueDateString = formData.get("dueDate");
          if (typeof dueDateString === "string" && dueDateString.length > 0) {
            this.#todo.dueDate = new Date(dueDateString);
          } else {
            this.#todo.dueDate = new Date(); // Fallback to current date if not provided
          }
          const priorityString = formData.get("priority");
          if (typeof priorityString === "string") {
            const priorityNumber = parseInt(priorityString, 10);
            if (!isNaN(priorityNumber)) {
              this.#todo.priority = priorityNumber;
            }
          }

          onUpdate(this.#todo);

          close();
        });
      }
    }
  }
}

/**
 * @module ModalRenderer
 * */
export default ModalRenderer;
