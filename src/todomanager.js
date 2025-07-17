// @ts-check
import Todo from "./todo.js";


class TodoManager {
  #todos;
  /** @param {Todo[]} todos - an array of todo objects */
  constructor(todos) {
    this.#todos = todos || [];
  }

  /**
   * function addTodo will add a todo into the list of todos
   * @param {string} title - the title of todo
   * @param {string} description - description of todo
   * @param {Date} dueDate - due date for todo
   * @param {number} priority - priority of to do 1..4 (1 being highest)
   * @param {string} notes - extra notes on the todo
   * @param {object} checklist - checklist of items for the todo
   *
   * @returns {object} todo
   * */
  addTodo(title, description, dueDate, priority, notes, checklist) {
    const todo = new Todo(title, description, dueDate, priority, notes, checklist);
    this.#todos.push(todo);
    return todo;
  }

  /** 
   * function removeTodo will remove an item by id
   * @param {string} id 
   * @returns {void}
   * */
  removeTodo(id) {
    console.log("ID to remove:", id); // Check the ID being passed
    console.log("Current todos before filter:", this.#todos.map(t => t.id)); // Check IDs before filter
    this.#todos = this.#todos.filter((t) => {
      console.log(`Comparing '${t.id}' with '${id}'. Match: ${t.id === id}`); // Detailed comparison log
      return t.id !== id;
    });

    console.log("Todos after filter:", this.#todos.map(t => t.id)); // Check IDs after filter

  }
  get todos() {
    return this.#todos;
  }

  /** @param {Todo[]} val - an array of Todo elements */
  set todos(val) {
    this.#todos = val;
  }
}
export default TodoManager;
