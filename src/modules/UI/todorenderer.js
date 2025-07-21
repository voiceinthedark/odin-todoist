// @ts-check

import Todo from "../todo.js";
import UIManager from "./uimanager.js";

class TodoRenderer {
  #parentElement;
  #ui;
  /**
   * @param {UIManager} uiManager 
   * @param {Node} parent 
   * */
  constructor(uiManager, parent) {
    this.#parentElement = parent;
    this.#ui = uiManager;
  }

  /**
   * @param {Todo} todo - the todo item to be rendered
   * */
  renderTodo(todo) {
    const todoCard = this.#ui.addElement('div', this.#parentElement, 'todo-card');

    const headerDiv = this.#ui.addElement('div', todoCard, 'todo-header');
    const headerRight = this.#ui.addElement('div', headerDiv, 'todo-header-right');
    const todoTitle = this.#ui.addElement('h3', headerDiv, 'todo-title');
    todoTitle.textContent = todo.title;
    const todoDueDate = this.#ui.addElement('span', headerRight, 'todo-due-date');
    todoDueDate.textContent = `Due: ${todo.dueDate ? todo.dueDate.toLocaleDateString() : 'No due date'}`;
    const todoPriority = this.#ui.addElement('span', headerRight, 'todo-priority');
    todoPriority.textContent = `Priority: ${todo.priority ? todo.priority : 'None'}`;


    const todoDescription = this.#ui.addElement('span', todoCard, 'todo-description');
    todoDescription.textContent = todo.description;

const footerDiv = this.#ui.addElement('div', todoCard, 'todo-footer');


    const todoNotes = this.#ui.addElement('span', footerDiv, 'todo-notes');
    todoNotes.textContent = `Notes: ${todo.notes ? todo.notes : 'No notes'}`;
    const todoChecklist = this.#ui.addElement('ul', footerDiv, 'todo-checklist');
    todo.checklist.forEach(item => {
      const checklistItem = this.#ui.addElement('li', todoChecklist, 'checklist-item');
      checklistItem.textContent = item;
    });
    const todoStatus = this.#ui.addElement('span', footerDiv, 'todo-status');
    todoStatus.textContent = `Status: ${todo.status ? 'Completed' : 'Pending'}`;

  }

  /**
   * Renders a list of todos
   * @param {Todo[]} todos - an array of Todo objects
   */
  renderTodoList(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Expected an array of Todo objects');
    }
    todos.forEach(todo => {
      this.renderTodo(todo);
    });
  }
}

export default TodoRenderer;
