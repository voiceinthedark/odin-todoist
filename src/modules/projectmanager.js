// @ts-check
import Project from './project.js';

class ProjectManager {
  /**
   * @type {Project[]}
   * */
  #projects;
  constructor() {
    this.#projects = [];
  }

  /**
   * function addProject will add a project into the list of projects
   * @param {string} name - the name of the project
   * @param {string} description - description of the project
   * @returns {Project} project
   */
  addProject(name, description ) {
    const project = new Project(name, description);
    this.#projects.push(project);
    return project;
  }

  /**
   * function removeProject will remove a project by id
   * @param {string} id - the id of the project
   * @returns {boolean} - returns true if project removed
   */
  removeProject(id) {
    const initialLength = this.#projects.length;
    this.#projects = this.#projects.filter((p) => {
      return p.id !== id;
    });
    return this.#projects.length < initialLength;
  }

/**
   * Returns the list of projects managed by the ProjectManager.
   * A shallow copy is returned to prevent direct external modification.
   * @returns {Project[]} An array of project objects
   */
  get projects(){
    return [...this.#projects];
  }
  
/** 
   * Sets the entire list of projects. Use with caution as it bypasses
   * individual add/remove methods.
   * @param {Project[]} val - an array of Project elements
   */
  set projects(val) {
    this.#projects = val;
  }
  /** 
   *  function getProjectById will return a project by id
   *  @param {string} id 
   *  @returns {Project | undefined} project
   * */
  getProjectById(id) {
    return this.#projects.find((p) => p.id === id);
  }
  /**
   * function getProjectByName gets a project by name
   * @param {string} name 
   * @returns {Project | undefined} The project or undefined if not found
   * */
  getProjectByName(name) {
    return this.#projects.find((p) => p.name === name);
  }
}

const projectManager = new ProjectManager();
export default projectManager;
