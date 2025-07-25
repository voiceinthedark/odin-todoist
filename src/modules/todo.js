// @ts-check
import { v4 as uuidv4 } from "uuid";

/* class Todo
 * * * * * * * */
class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #status = false;
  #notes;
  #checklist;

  /**
   * @param {string} title - Todo title
   * @param {string} description - todo description
   * @param {Date | null}  dueDate - todo Date
   * @param {number} priority - todo priority 1..4
   * @param {boolean} [status=false] -  todo status (default false)
   * @param {string} [notes=''] - notes (default none)
   * @param {any[]} [checklist=[]] - checklist options (default none)
   * @param {string | null} [id=null] - Todo id (optional, generated)
   * */
  constructor(
    title,
    description,
    dueDate,
    priority,
    status = false,
    notes = "",
    checklist = [],
    id = null,
  ) {
    this.#id = id || uuidv4();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#status = status;
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

  set status(val) {
    this.#status = val;
  }
  get status() {
    return this.#status;
  }

  set title(val) {
    this.#title = val;
  }

  get title() {
    return this.#title;
  }

  get notes() {
    return this.#notes;
  }
  set notes(val) {
    this.#notes = val;
  }

  get checklist() {
    return this.#checklist;
  }
  set checklist(val) {
    this.#checklist = val;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      status: this.#status,
      notes: this.#notes,
      checklist: this.#checklist,
    };
  }
}

export default Todo;
