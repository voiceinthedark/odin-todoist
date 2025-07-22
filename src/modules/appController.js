import UIManager from "./UI/uimanager";
import projectManager from "./projectmanager";
import ProjectRenderer from "./UI/projectrenderer";
import TodoRenderer from "./UI/todorenderer";

class AppController {
  #uiManager;
  #projectRenderer;
  #todoRenderer;
  #projectManager;
  #appContainer;
  #contentMain;
  #sidebarLists;
  #currentActiveProject; // To keep track of which project's todos are currently displayed

  constructor(appContainer) {
    this.#appContainer = appContainer;
    this.#projectManager = projectManager; // Using the singleton projectManager
    this.#uiManager = new UIManager(appContainer);
    this.#projectRenderer = new ProjectRenderer(this.#uiManager);

    // Get DOM elements for rendering
    this.#sidebarLists = document.querySelector('.sidebar-lists');
    this.#contentMain = document.querySelector('.content-main');

    // Initialize TodoRenderer, passing a bound method for todo clicks
    this.#todoRenderer = new TodoRenderer(this.#uiManager, this.#contentMain, this.handleTodoClick.bind(this));

    this.init();
  }

  init() {
    // Initial setup: Add some default projects and todos if none exist
    if (this.#projectManager.projects.length === 0) {
      const defaultProject = this.#projectManager.addProject('Inbox', 'Default project for all new tasks');
      defaultProject.addTodo('Complete initial setup', 'Set up the basic application structure.', new Date(), 4);
      defaultProject.addTodo('Plan project features', 'Brainstorm and list core functionalities.', new Date(), 3);
      this.#currentActiveProject = defaultProject; // Set the default project as active
    } else {
      // If projects exist, make the first one active by default
      this.#currentActiveProject = this.#projectManager.projects[0];
    }

    // Render initial UI
    this.renderProjects();
    if (this.#currentActiveProject) {
      this.renderTodosForProject(this.#currentActiveProject);
    }

    // Set up global event listeners or other initializations
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Example: Event listener for adding new projects (assuming a button or form)
    const addProjectButton = document.querySelector('#add-project-btn');
    if (addProjectButton) {
      addProjectButton.addEventListener('click', () => {
        //TODO: open modal for new project
        this.addProject('New Project Title', 'New project description');
      });
    }
    // const handleTodoClick = (todo) => {
    //   console.log('Todo Clicked:', todo.id);
    //   this.#uiManager.getModalRenderer(todo, contentContainer).showEditModal(() => {
    //     this.#uiManager.clearElement(contentMain);
    //     this.#todoRenderer.renderTodoList(firstp.todos);
    //     // console.log(firstp.todos)
    //   });
    // }

    // Example: Event listeners for project list items to switch active project
    // This would typically be handled by the ProjectRenderer if it creates the elements
    // and attaches listeners, then calls a method on this controller.
  }

  /**
   * Renders the list of projects in the sidebar.
   */
  renderProjects() {
    this.#projectRenderer.renderProjectList(this.#sidebarLists, this.#projectManager.projects);
    // Potentially add event listeners to newly rendered project items here
    // Or ensure ProjectRenderer attaches listeners that call selectProject()
  }

  /**
   * Displays the todos for a given project.
   * @param {Project} project - The project whose todos are to be displayed.
   */
  renderTodosForProject(project) {
    this.#uiManager.clearElement(this.#contentMain); // Clear existing todos
    this.#todoRenderer.renderTodoList(project.todos);
    this.#currentActiveProject = project; // Update active project
    // You might also want to update the content header to show the project title
    console.log(`Displaying todos for project: ${project.title}`);
  }

  /**
   * Handles click event on a todo item, opening the edit modal.
   * @param {Todo} todo - The todo object that was clicked.
   */
  handleTodoClick(todo) {
    console.log('Todo clicked in controller:', todo.id);
    const contentContainer = document.querySelector('.content'); // Parent element for the modal
    this.#uiManager.getModalRenderer(todo, contentContainer).showEditModal((updatedTodo) => {
      console.log('Todo updated in modal, refreshing UI:', updatedTodo);
      // After updating, re-render the todos for the currently displayed project
      if (this.#currentActiveProject) {
        // Ensure the updatedTodo's project matches the current active project,
        // or refetch the specific todo from the current project to ensure consistency.
        // For simplicity, we just re-render the entire active project's todo list.
        this.renderTodosForProject(this.#currentActiveProject);
      }
      // TODO: Potentially persist data to localStorage here or in projectManager
    });
  }

  /**
   * Adds a new project to the project manager and updates the UI.
   * @param {string} title - The title of the new project.
   * @param {string} description - The description of the new project.
   * @returns {Project} The newly created project.
   */
  addProject(title, description) {
    const newProject = this.#projectManager.addProject(title, description);
    this.renderProjects(); // Re-render the sidebar project list
    // Optionally, set the new project as the active one and display its todos
    this.renderTodosForProject(newProject);
    return newProject;
  }

  /**
   * Removes a project by its ID and updates the UI.
   * @param {string} projectId - The ID of the project to remove.
   */
  removeProject(projectId) {
    this.#projectManager.removeProject(projectId);
    this.renderProjects(); // Re-render the sidebar project list
    // If the removed project was the active one, switch to another default (e.g., Inbox)
    if (this.#currentActiveProject && this.#currentActiveProject.id === projectId) {
      const remainingProjects = this.#projectManager.projects;
      if (remainingProjects.length > 0) {
        this.renderTodosForProject(remainingProjects[0]);
      } else {
        // Handle case where all projects are removed
        this.#uiManager.clearElement(this.#contentMain);
        this.#currentActiveProject = null;
      }
    }
    // TODO: Persist data
  }

  /**
   * Adds a new todo to the currently active project and updates the UI.
   * @param {string} title - The title of the todo.
   * @param {string} description - The description of the todo.
   * @param {Date} dueDate - The due date of the todo.
   * @param {number} priority - The priority of the todo.
   * @returns {Todo|null} The newly created todo, or null if no active project.
   */
  addTodoToActiveProject(title, description, dueDate, priority) {
    if (this.#currentActiveProject) {
      const newTodo = this.#currentActiveProject.addTodo(title, description, dueDate, priority);
      this.renderTodosForProject(this.#currentActiveProject); // Re-render todos for the active project
      // TODO: Persist data
      return newTodo;
    }
    console.warn('No active project to add todo to.');
    return null;
  }

  openAddProjectModal() {
    const contentContainer = document.querySelector('.content'); // Or wherever your modals should attach
    // Note: The ModalRenderer constructor currently expects a Todo object.
    // You might need to refactor ModalRenderer to not strictly require a todo for project modals,
    // or pass a dummy/null todo if it only needs the parent element and UIManager.
    // For now, let's assume it can accept null for the todo if only parent and uiManager are needed.
    const modalRendererForProject = this.#uiManager.getModalRenderer(null, contentContainer);

    modalRendererForProject.showNewProjectModal((name, description) => {
      // This is the callback from the modal, handling the actual project creation
      this.addProject(name, description);
      console.log(`New project added: ${name}, ${description}`);
    });
  }

  // TODO: Add methods for editTodo, removeTodo similar to the above
}

export default AppController;

