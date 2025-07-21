// @ts-check
import UIManager from "./uimanager.js";
import Todo from "../todo.js";
import { format } from "date-fns";
/**
 * @class
 * @classdesc Module to render modals
 * */
class ModalRenderer {
  #parentElement;
  #ui;
  #todo;
  /**
   * @constructor
   * @param {Todo} todo 
   * @param {Node} parentElement 
   * @param {UIManager} uiManager
   * */
  constructor(todo, parentElement, uiManager) {
    this.#todo = todo;
    this.#ui = uiManager;
    this.#parentElement = parentElement;
  }

  /**
   * @method showEditModal to show the modal ui
   * */
  showEditModal() {
    const modal = this.#ui.addElement('div', this.#parentElement, 'modal');

    if (modal instanceof HTMLDivElement) {
      modal.classList.add('show');
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
            <option value="1" ${this.#todo.priority === 1 ? 'selected' : ''}>Lowest</option>
            <option value="2" ${this.#todo.priority === 2 ? 'selected' : ''}>Low</option>
            <option value="3" ${this.#todo.priority === 3 ? 'selected' : ''}>Medium</option>
            <option value="4" ${this.#todo.priority === 4 ? 'selected' : ''}>High</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>`;
    }




  }
}

/**
 * @module ModalRenderer
 * */
export default ModalRenderer;
