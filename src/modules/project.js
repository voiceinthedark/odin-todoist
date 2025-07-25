// @ts-check
import { v4 as uuidv4 } from "uuid";
import TodoManager from "./todomanager.js";
import Todo from "./todo.js";

/* class Project - to categorize todos in a list
 * * * * * * * * * * * */
class Project {
  #id;
  #name;
  #description;
  #todoManager;

  /**
   * class Project, containst list of todos associated wit the project
   * @param {string} name - name of the project
   * @param {string} description - description of the project
   * @param {string | null} [id=null]
   * */
  constructor(name, description, id = null) {
    this.#id = id || uuidv4();
    this.#name = name;
    this.#description = description;
    this.#todoManager = new TodoManager([]);
  }

  get id() {
    return this.#id;
  }
  set id(val) {
    this.#id = val;
  }

  get name() {
    return this.#name;
  }

  set name(val) {
    this.#name = val;
  }

  get description() {
    return this.#description;
  }
  set description(val) {
    this.#description = val;
  }

  get todos() {
    return this.#todoManager.todos;
  }
  set todos(val) {
    this.#todoManager.todos = val;
  }

  getCompletedTodos() {
    return this.#todoManager.todos.filter((t) => t.status);
  }

  getPendingTodos() {
    return this.#todoManager.todos.filter((t) => !t.status);
  }

  /**
   * function addTodo - adds a todo associated with the current project
   * @param {Object} todoData - Todo data object
   * @param {string} todoData.title - Todo title
   * @param {string} todoData.description - Todo description
   * @param {Date} todoData.dueDate - Due date
   * @param {number} todoData.priority - Priority level
   * @param {boolean} [todoData.status=false] - Completion status
   * @param {string} [todoData.notes=''] - Additional notes
   * @param {Array} [todoData.checklist=[]] - Checklist items
   * @returns {Todo}
   * */
  addTodo(todoData) {
    return this.#todoManager.addTodo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.status || false,
      todoData.notes || "",
      todoData.checklist || [],
    );
  }

  /**
   * function removeTodo - removes a todo from the project by id
   * @param {string} id
   * */
  removeTodo(id) {
    this.#todoManager.removeTodo(id);
  }

  // get todoManager(){
  //   return this.#todoManager;
  // }
  //
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      todos: this.#todoManager.todos.map((todo) => todo.toJSON()),
    };
  }
}

export default Project;
