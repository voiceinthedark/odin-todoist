// @ts-check
import { v4 as uuidv4 } from 'uuid';
import TodoManager from './todomanager.js';
import Todo from './todo.js';

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
   * */
  constructor(name, description) {
    this.#id = uuidv4();
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


  /**
   * function addTodo - adds a todo associated with the current project   
   * @param {string} title 
   * @param {string} description 
   * @param {Date} dueDate 
   * @param {number} priority 
   * @param {boolean} [status=false] - todo status (default false)
   * @param {string} [notes='']
   * @param {[]} [checklist = []] - an array of checklist items
   * @returns {Todo} 
   * */
  addTodo(title, description, dueDate, priority, status = false, notes = '', checklist = []) {
    return this.#todoManager.addTodo(title, description, dueDate, priority, status, notes, checklist);
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
      todos: this.#todoManager.todos.map(todo => todo.toJSON ? todo.toJSON() : todo),

    }
  }

}

export default Project;
