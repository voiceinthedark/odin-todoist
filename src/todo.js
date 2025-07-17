import { v4 as uuidv4 } from 'uuid';

/* class Todo 
 * * * * * * * */
class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;

  constructor(title, description, dueDate, priority, notes, checklist) {
    this.#id = uuidv4();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#checklist = checklist;
  }

  get id() {
    return this.#id;
  }

  set priority(val) {
    this.#priority = val;
  }

  get priority() {
    return this.#priority;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(val) {
    this.#dueDate = val;
  }

  set description(val) {
    this.#description = val;
  }

  get description() {
    return this.#description;
  }

  set title(val) {
    this.#title = val;
  }

  get title() {
    return this.#title;
  }

  get notes(){
    return this.#notes;
  }
  set notes(val){
    this.#notes = val;
  }

  get checklist(){
    return this.#checklist;
  }
  set checklist(val){
    this.#checklist = val;
  }
}

export default Todo;
