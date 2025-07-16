import { v4 as uuidv4 } from 'uuid';

/* 
 * 
 * class Project - to categorize todos in a list
 * 
 * * * * * * * * * * * */
class Project{
  #id;
  #name;
  #description;
  #todos;

  constructor(name, description, todolist = []){
    this.#id = uuidv4();
    this.#name = name;
    this.#description = description;
    this.#todos = todos;
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
    return this.#todos;
  }
  set todos(val){
    this.#todos = val;
  }
}

export default Project;
