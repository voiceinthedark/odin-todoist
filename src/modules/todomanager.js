// @ts-check
import Todo from "./todo.js";

/**
 * TodoManager class to manage todos
 * @class
 * @author - voiceinthedark
 * */
class TodoManager {
  /**
   * private attribute todos
   * */
  #todos;
  /**
   * @class
   * @param {Todo[]} todos - an array of todo objects */
  constructor(todos) {
    this.#todos = todos || [];
  }

  /**
   * @function - addTodo will add a todo into the list of todos
   * @param {string} title - the title of todo
   * @param {string} description - description of todo
   * @param {Date} dueDate - due date for todo
   * @param {number} priority - priority of to do 1..4 (1 being highest)
   * @param {boolean} status - status of todo (default false)
   *
   * @returns {object} todo
   * */
  /**
   * @function - addTodo will add a todo into the list of todos
   * @param {string} title - the title of todo
   * @param {string} description - description of todo
   * @param {Date} dueDate - due date for todo
   * @param {number} priority - priority of to do 1..4 (1 being highest)
   * @param {boolean} [status=false] - status of todo
   * @param {string} [notes=''] - additional notes
   * @param {Array} [checklist=[]] - checklist items
   * @param {string|null} [id=null] - optional existing ID
   * @returns {Todo} created todo
   * */
  addTodo(
    title,
    description,
    dueDate,
    priority,
    status = false,
    notes = "",
    checklist = [],
    id = null,
  ) {
    const todo = new Todo(
      title,
      description,
      dueDate,
      priority,
      status,
      notes,
      checklist,
      id,
    );
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
    console.log(
      "Current todos before filter:",
      this.#todos.map((t) => t.id),
    ); // Check IDs before filter
    this.#todos = this.#todos.filter((t) => {
      console.log(`Comparing '${t.id}' with '${id}'. Match: ${t.id === id}`); // Detailed comparison log
      return t.id !== id;
    });

    console.log(
      "Todos after filter:",
      this.#todos.map((t) => t.id),
    ); // Check IDs after filter
  }
  get todos() {
    return this.#todos;
  }

  /** @param {Todo[]} val - an array of Todo elements */
  set todos(val) {
    this.#todos = val;
  }

  /**
   * @method to get todo by id
   * @param {string} id
   * */
  getTodoById(id) {
    return this.#todos.find((todo) => todo.id === id);
  }
}

/**
 * @exports TodoManager
 * */
export default TodoManager;
