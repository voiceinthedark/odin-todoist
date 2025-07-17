import { v4 as uuidv4 } from 'uuid';
import TodoManager from './todomanager.js';

/* class Project - to categorize todos in a list
 * * * * * * * * * * * */
class Project{
  #id;
  #name;
  #description;
  #todoManager;

  constructor(name, description){
    this.#id = uuidv4();
    this.#name = name;
    this.#description = description;
    this.#todoManager = new TodoManager([]);
  }

  get id(){
    return this.#id;
  }
  set id(val){
    this.#id = val;
  }

  get name(){
    return this.#name;
  }

  set name(val){
    this.#name = val;
  }

  get description(){
    return this.#description;
  }
  set description(val){
    this.#description = val;
  }

  get todos(){
    return this.#todoManager.todos;
  }
  set todos(val){
    this.#todoManager.todos = val;
  }

  addTodo(title, description, dueDate, priority, notes, checklist){
    return this.#todoManager.addTodo(title, description, dueDate, priority, notes, checklist);
  }

  removeTodo(id){
    this.#todoManager.removeTodo(id);
  }
}

export default Project;
