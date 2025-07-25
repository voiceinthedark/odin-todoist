// @ts-check
import Project from "./project.js";
import Todo from "./todo.js";
import storageManager from "./todostoragemanager.js";

/**
 * @class ProjectManager
 * @description Manages a collection of projects
 * @author voiceinthedark
 * */
class ProjectManager {
  /**
   * @type {Project[]}
   * */
  #projects;
  /**
   * @constructor
   * */
  constructor() {
    this.#projects = [];
    this.loadProjects();
  }

  /**
   * function addProject will add a project into the list of projects
   * @method addProject
   * @param {string} name - the name of the project
   * @param {string} description - description of the project
   * @returns {Project} project
   */
  addProject(name, description) {
    const project = new Project(name, description);
    this.#projects.push(project);
    this.saveProjects();
    return project;
  }

  /**
   * function removeProject will remove a project by id
   * @method removeProject
   * @param {string} id - the id of the project
   * @returns {boolean} - returns true if project removed
   */
  removeProject(id) {
    const initialLength = this.#projects.length;
    this.#projects = this.#projects.filter((p) => {
      return p.id !== id;
    });
    this.saveProjects();
    return this.#projects.length < initialLength;
  }

  /**
   * Returns the list of projects managed by the ProjectManager.
   * A shallow copy is returned to prevent direct external modification.
   * @returns {Project[]} An array of project objects
   */
  get projects() {
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

  saveProjects() {
    const serializableProjects = this.projects.map((project) =>
      project.toJSON(),
    );
    console.log(serializableProjects);
    // persist data
    storageManager.setItem(
      "todoAppProjects",
      JSON.stringify(serializableProjects),
    );
    console.log("projects saved to localstorage");
  }

  loadProjects() {
    const storedProjects = storageManager.getItem("todoAppProjects");
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      // Reconstruct Project and Todo instances from plain objects
      this.projects = parsedProjects.map((projectData) => {
        const project = new Project(
          projectData.name,
          projectData.description,
          projectData.id,
        );
        project.todos = projectData.todos.map((todoData) => {
          let extractedTitle = todoData.title;
          if (
            typeof todoData.title === "object" &&
            todoData.title !== null &&
            typeof todoData.title.title === "string"
          ) {
            extractedTitle = todoData.title.title;
          }

          return new Todo(
            extractedTitle, // Use the extracted and validated title
            todoData.description,
            todoData.dueDate ? new Date(todoData.dueDate) : null, // Convert ISO string back to Date
            todoData.priority,
            todoData.status,
            todoData.notes || "",
            todoData.checklist || [],
            todoData.id,
          );
        });
        return project;
      });
      console.log("Projects loaded from localStorage.");
    } else {
      console.log("No projects found in localStorage.");
    }
  }
}

/**
 * Singleton instance of ProjectManager
 * @module ProjectManager
 * */
const projectManager = new ProjectManager();
export default projectManager;
