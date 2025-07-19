// @ts-check

import Todo from "../todo.js";
import UIManager from "./uimanager.js";

class TodoRenderer{
  #parentElement;
  #ui;
  /**
   * @param {UIManager} uiManager 
   * @param {Node} parent 
   * */
  constructor(uiManager, parent){
    this.#parentElement = parent;
    this.#ui = uiManager;
  }

  /**
   * @param {Todo} todo - the todo item to be rendered
   * */
  renderTodo(todo){
    const todoCard = this.#ui.addElement('div', this.#parentElement, 'todo-card');
    const todoTitle = this.#ui.addElement('h3', todoCard, 'todo-title');
    todoTitle.textContent = todo.title;

    const todoDescription = this.#ui.addElement('p', todoCard, 'todo-description');
    todoDescription.textContent = todo.description;

    const todoDueDate = this.#ui.addElement('p', todoCard, 'todo-due-date');
    todoDueDate.textContent = `Due: ${todo.dueDate ? todo.dueDate.toLocaleDateString() : 'No due date'}`;
    const todoPriority = this.#ui.addElement('p', todoCard, 'todo-priority');
    todoPriority.textContent = `Priority: ${todo.priority ? todo.priority : 'None'}`;
    const todoNotes = this.#ui.addElement('p', todoCard, 'todo-notes');
    todoNotes.textContent = `Notes: ${todo.notes ? todo.notes : 'No notes'}`;
    const todoChecklist = this.#ui.addElement('ul', todoCard, 'todo-checklist');
    todo.checklist.forEach(item => {
      const checklistItem = this.#ui.addElement('li', todoChecklist, 'checklist-item');
      checklistItem.textContent = item;
    });
    const todoStatus = this.#ui.addElement('p', todoCard, 'todo-status');
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
