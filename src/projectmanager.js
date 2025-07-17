// @ts-check
import Project from './project.js';
import Todo from './todo.js';

class ProjectManager {
  #projects;
  constructor() {
    this.#projects = [];
  }

  /**
   * function addProject will add a project into the list of projects
   * @param {string} name - the name of the project
   * @param {string} description - description of the project
   * @param {Todo[]} [todos=[]] - an array of todos associated with the project
   * @returns {Project} project
   */
  addProject(name, description, todos = []) {
    const project = new Project(name, description, todos);
    this.#projects.push(project);
    return project;
  }

  /**
   * function getProjects will return the list of projects
   * @param {string} id - the id of the project
   */
  removeProject(id) {
    this.#projects = this.#projects.filter((p) => {
      return p.id !== id;
    });
  }

  get getProjects(){
    return this.#projects;
  }
  /** 
   * @param {Project[]} val - an array of Project elements
   */
  set setProjects(val) {
    this.#projects = val;
  }
  /** 
   *  function getProjectById will return a project by id
   *  @param {string} id 
   *  @returns {Project} project
   *  
   * */
  getProjectById(id) {
    return this.#projects.find((p) => p.id === id);
  }
  /**
   * function getProjectByName gets a project by name
   * @param {string} name 
   * */
  getProjectByName(name) {
    return this.#projects.find((p) => p.name === name);
  }
}

const projectManager = new ProjectManager();
export default projectManager;
