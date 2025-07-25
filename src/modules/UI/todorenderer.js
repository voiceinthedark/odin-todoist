// @ts-check

import Todo from "../todo.js";
import UIManager from "./uimanager.js";

class TodoRenderer {
  #parentElement;
  #ui;
  #onTodoClick;
  #onTodoStatusChange;
  #onTodoDelete;
  /**
   * @class
   * @classdesc A renderer for Todo objects
   * @param {UIManager} uiManager - instance of UIManager to perform DOM
   * @param {Node} parent - parent element of the todo card
   * @param {Function} onTodoClick - callback function to handle click events on the todo item
   * @param {Function} onTodoStatusChange - callback function to handle click events on the todo status
   * @param {Function} onTodoDelete - Callback function to handle delete event on the todo item
   * */
  constructor(
    uiManager,
    parent,
    onTodoClick,
    onTodoStatusChange,
    onTodoDelete,
  ) {
    this.#parentElement = parent;
    this.#ui = uiManager;
    this.#onTodoClick = onTodoClick;
    this.#onTodoStatusChange = onTodoStatusChange;
    this.#onTodoDelete = onTodoDelete;
  }

  /**
   * @method
   * @param {Todo} todo - the todo item to be rendered
   * @description Renders a single todo card to the parent element.
   * */
  renderTodo(todo) {
    const todoCard = this.#ui.addElement(
      "div",
      this.#parentElement,
      "todo-card",
    );

    const headerDiv = this.#ui.addElement("div", todoCard, "todo-header");
    const headerRight = this.#ui.addElement(
      "div",
      headerDiv,
      "todo-header-right",
    );
    const todoTitle = this.#ui.addElement("h3", headerDiv, "todo-title");
    todoTitle.textContent = todo.title;
    const todoDueDate = this.#ui.addElement(
      "span",
      headerRight,
      "todo-due-date",
    );
    if (todoDueDate instanceof HTMLSpanElement) {
      todoDueDate.innerHTML = `<i class="fa-solid fa-calendar"></i> ${todo.dueDate ? todo.dueDate.toLocaleDateString() : "No due date"}`;
    }
    const todoPriority = this.#ui.addElement(
      "span",
      headerRight,
      "todo-priority",
    );
    if (
      todoPriority instanceof HTMLSpanElement &&
      todoCard instanceof HTMLDivElement
    ) {
      todoPriority.innerHTML = `<i class="fa-solid fa-flag"></i>`;
      switch (todo.priority) {
        case 1:
          todoPriority.classList.toggle("priority-lowest");
          todoCard.classList.toggle("todo-card-priority-lowest");
          break;
        case 2:
          todoPriority.classList.toggle("priority-low");
          todoCard.classList.toggle("todo-card-priority-low");
          break;
        case 3:
          todoPriority.classList.toggle("priority-medium");
          todoCard.classList.toggle("todo-card-priority-medium");
          break;
        case 4:
          todoPriority.classList.toggle("priority-high");
          todoCard.classList.toggle("todo-card-priority-high");
          break;
      }
    }

    const todoDescription = this.#ui.addElement(
      "span",
      todoCard,
      "todo-description",
    );
    todoDescription.textContent = todo.description;

    const footerDiv = this.#ui.addElement("div", todoCard, "todo-footer");

    // const todoNotes = this.#ui.addElement('span', footerDiv, 'todo-notes');
    // todoNotes.textContent = `Notes: ${todo.notes ? todo.notes : 'No notes'}`;
    // const todoChecklist = this.#ui.addElement('ul', footerDiv, 'todo-checklist');
    // todo.checklist.forEach(item => {
    //   const checklistItem = this.#ui.addElement('li', todoChecklist, 'checklist-item');
    //   checklistItem.textContent = item;
    // });
    const todoStatus = this.#ui.addElement("span", footerDiv, "todo-status");
    if (todoStatus instanceof HTMLSpanElement) {
      todoStatus.innerHTML = `${todo.status ? '<i class="fa-solid fa-check"></i> Completed' : '<i class="fa-solid fa-clock"></i> Pending'}`;
      if (todo.status) {
        todoStatus.classList.toggle("status-completed");
      } else {
        todoStatus.classList.toggle("status-pending");
      }
      todoStatus.addEventListener("click", (e) => {
        console.log(`Todo status toggled: ${todo.id} - ${!todo.status}`);
        e.stopPropagation();
        this.#onTodoStatusChange(todo);
      });
    }

    // Add delete button
    const deleteButton = this.#ui.addElement(
      "button",
      footerDiv,
      "todo-delete-btn",
    );
    if (deleteButton instanceof HTMLButtonElement) {
      deleteButton.style.opacity = "0";
      deleteButton.style.visibility = "hidden";
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the parent todoCard click event
        if (confirm("Are you sure you want to delete this todo?")) {
          this.#onTodoDelete(todo.id); // Call the delete callback
        }
      });
    }

    // set the data attribute for the todo
    if (todoCard instanceof HTMLDivElement) {
      todoCard.setAttribute("data-todo-id", todo.id);
    }

    // capture click event on the todo card
    todoCard.addEventListener("click", () => {
      this.#onTodoClick(todo);
    });

    todoCard.addEventListener("mouseenter", (e) => {
      if (deleteButton instanceof HTMLButtonElement) {
        deleteButton.style.opacity = "1";
        deleteButton.style.visibility = "visible";
      }
    });
    todoCard.addEventListener("mouseleave", (e) => {
      if (deleteButton instanceof HTMLButtonElement) {
        deleteButton.style.opacity = "0";
        deleteButton.style.visibility = "hidden";
      }
    });
  }

  /**
   * @method
   * @param {Todo[]} todos - an array of Todo objects
   * @description Renders a list of todos
   */
  renderTodoList(todos) {
    if (!Array.isArray(todos)) {
      throw new Error("Expected an array of Todo objects");
    }
    todos.forEach((todo) => {
      this.renderTodo(todo);
    });
  }
}

export default TodoRenderer;
