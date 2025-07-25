import UIManager from "./UI/uimanager";
import Todo from "./todo";
import projectManager from "./projectmanager";
import ProjectRenderer from "./UI/projectrenderer";
import TodoRenderer from "./UI/todorenderer";
import ModalRenderer from "./UI/modalRenderer";

class AppController {
  #uiManager;
  #projectRenderer;
  #todoRenderer;
  #projectManager;
  #appContainer;
  #contentHeader;
  #contentMain;
  #sidebarListsBody;
  #currentActiveProject; // To keep track of which project's todos are currently displayed
  #modalRenderer;

  constructor(appContainer) {
    this.#appContainer = appContainer;
    this.#projectManager = projectManager; // Using the singleton projectManager
    this.#uiManager = new UIManager(appContainer);
    this.#projectRenderer = new ProjectRenderer(this.#uiManager);
    // this.#modalRenderer = new ModalRenderer(this.#uiManager);

    // Get DOM elements for rendering
    this.#sidebarListsBody = document.querySelector(".sidebar-lists-body");
    this.#contentMain = document.querySelector(".content-main");
    this.#contentHeader = document.querySelector(".content-head");

    // Initialize TodoRenderer, passing a bound method for todo clicks
    this.#todoRenderer = new TodoRenderer(
      this.#uiManager,
      this.#contentMain,
      this.handleTodoClick.bind(this),
      this.handleTodoStatusChange.bind(this),
      this.removeTodo.bind(this),
    );

    this.init();
  }

  init() {
    // Initial setup: Add some default projects and todos if none exist
    if (this.#projectManager.projects.length === 0) {
      const defaultProject = this.#projectManager.addProject(
        "Inbox",
        "Default project for all new tasks",
      );
      const todo1 = new Todo(
        "Complete initial setup",
        "Set up the basic application structure.",
        new Date(),
        4,
      );
      const todo2 = new Todo(
        "Plan project features",
        "Brainstorm and list core functionalities.",
        new Date(),
        3,
      );
      defaultProject.addTodo(todo1);
      defaultProject.addTodo(todo2);
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
    const addProjectButton = document.querySelector("#add-project-btn");
    if (addProjectButton) {
      addProjectButton.addEventListener("click", () => {
        this.openAddProjectModal();
      });
    }

    // Edit project button
  }

  /**
   * Renders the list of projects in the sidebar.
   */
  renderProjects() {
    //clear existing project list
    this.#uiManager.clearElement(this.#sidebarListsBody);
    this.#projectRenderer.renderProjectList(
      this.#sidebarListsBody,
      this.#projectManager.projects,
      this.handleProjectClick.bind(this),
      this.handleEditProjectClick.bind(this),
      this.handleDeleteProjectClick.bind(this),
    );
  }

  /**
   * Handles click event on a project in the sidebar.
   * @param {Project} project - The project object that was clicked.
   */
  handleProjectClick(project) {
    console.log("Project clicked in controller:", project.name);
    this.renderTodosForProject(project); // This will update the content header and todos
  }

  /**
   * Displays the todos for a given project.
   * @param {Project} project - The project whose todos are to be displayed.
   */
  renderTodosForProject(project) {
    this.#uiManager.clearElement(this.#contentMain); // Clear existing todos
    this.#uiManager.clearElement(this.#contentHeader);
    this.#todoRenderer.renderTodoList(project.todos);
    this.#currentActiveProject = project; // Update active project
    console.log(`Displaying todos for project: ${project.name}`);

    const headerProjectDiv = this.#uiManager.addElement(
      "div",
      this.#contentHeader,
      "project-header",
    );

    const headerTitle = this.#uiManager.addElement(
      "h1",
      headerProjectDiv,
      "project-name",
    );
    const headerDescription = this.#uiManager.addElement(
      "span",
      headerProjectDiv,
      "project-description",
    );
    if (headerTitle instanceof HTMLHeadingElement) {
      headerTitle.textContent = project.name;
    }
    if (headerDescription instanceof HTMLSpanElement) {
      headerDescription.textContent = project.description;
    }
    // add complete incomplete todos
    const headerTodoCount = this.#uiManager.addElement(
      "div",
      headerProjectDiv,
      "todo-count",
    );
    const completeHeaderCount = this.#uiManager.addElement(
      "span",
      headerTodoCount,
      "complete-todo-count",
    );
    const incompleteHeaderCount = this.#uiManager.addElement(
      "span",
      headerTodoCount,
      "incomplete-todo-count",
    );
    if (
      completeHeaderCount instanceof HTMLSpanElement &&
      incompleteHeaderCount instanceof HTMLSpanElement
    ) {
      completeHeaderCount.textContent = `Completed: ${project.getCompletedTodos().length}`;
      incompleteHeaderCount.textContent = `Pending: ${project.getPendingTodos().length}`;
    }

    const addTodoButton = this.#uiManager.addElement(
      "button",
      this.#contentHeader,
      "add-todo-btn",
    );
    if (addTodoButton instanceof HTMLButtonElement) {
      addTodoButton.innerHTML = `<i class="fa-solid fa-file"></i> Add Todo`;
      addTodoButton.addEventListener("click", () => {
        // Open modal to add new todo
        const contentContainer = document.querySelector(".content"); // Parent element for the modal
        this.#uiManager
          .getModalRenderer(null, contentContainer)
          .showNewTodoModal((title, description, dueDate, priority) => {
            this.addTodoToActiveProject(title, description, dueDate, priority);
          });
      });
    }
  }

  /**
   * Handles click event on a todo item, opening the edit modal.
   * @param {Todo} todo - The todo object that was clicked.
   */
  handleTodoClick(todo) {
    console.log("Todo clicked in controller:", todo.id);
    const contentContainer = document.querySelector(".content"); // Parent element for the modal
    this.#uiManager
      .getModalRenderer(todo, contentContainer)
      .showEditModal((updatedTodoData) => {
        console.log("Todo updated in modal, refreshing UI:", updatedTodoData);
        // After updating, re-render the todos for the currently displayed project
        if (this.#currentActiveProject) {
          const projectToUpdate = this.#projectManager.getProjectById(
            this.#currentActiveProject.id,
          );
          if (projectToUpdate) {
            const todoToModify = projectToUpdate.todos.find(
              (t) => t.id === updatedTodoData.id,
            );
            if (todoToModify) {
              todoToModify.title =
                typeof updatedTodoData.title === "string"
                  ? updatedTodoData.title
                  : todoToModify.title;
              todoToModify.description = updatedTodoData.description;
              todoToModify.dueDate =
                updatedTodoData.dueDate instanceof Date
                  ? updatedTodoData.dueDate
                  : updatedTodoData.dueDate
                    ? new Date(updatedTodoData.dueDate)
                    : null;
              todoToModify.priority = updatedTodoData.priority;
              todoToModify.status = updatedTodoData.status;
              todoToModify.notes = updatedTodoData.notes;
              todoToModify.checklist = updatedTodoData.checklist;

              // Persist the changes
              this.#projectManager.saveProjects();
            }
          }
          this.renderTodosForProject(this.#currentActiveProject);
        }
      });
  }
  /**
   * Handles the click event on a todo's status, toggling its completion status.
   * @param {Todo} todo - The todo object whose status was clicked.
   */
  handleTodoStatusChange(todo) {
    console.log(
      "Todo status changed in controller:",
      todo.id,
      "Current status:",
      todo.status,
    );
    // Toggle the status property directly as 'todo' is a reference to the actual object
    todo.status = !todo.status;
    this.#projectManager.saveProjects(); // Persist the updated status
    this.renderTodosForProject(this.#currentActiveProject); // Re-render to reflect the change
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
    if (
      this.#currentActiveProject &&
      this.#currentActiveProject.id === projectId
    ) {
      const remainingProjects = this.#projectManager.projects;
      if (remainingProjects.length > 0) {
        this.renderTodosForProject(remainingProjects[0]);
      } else {
        // Handle case where all projects are removed
        this.#uiManager.clearElement(this.#contentMain);
        this.#currentActiveProject = null;
      }
    }
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
      const newTodo = this.#currentActiveProject.addTodo(
        title,
        description,
        dueDate,
        priority,
      );
      this.#projectManager.saveProjects();
      this.renderTodosForProject(this.#currentActiveProject); // Re-render todos for the active project
      return newTodo;
    }
    console.warn("No active project to add todo to.");
    return null;
  }

  openAddProjectModal() {
    const contentContainer = document.querySelector(".content");
    const modalRendererForProject = this.#uiManager.getModalRenderer(
      null,
      contentContainer,
    );

    modalRendererForProject.showNewProjectModal((name, description) => {
      this.addProject(name, description);
      console.log(`New project added: ${name}, ${description}`);
    });
  }

  handleEditProjectClick(projectToEdit) {
    console.log("Attempting to edit project:", projectToEdit.name);
    const contentContainer = document.querySelector(".content"); // Parent element for the modal

    // Pass the actual project to the UIManager, so it can then pass it to ModalRenderer
    const modalRendererForProject = this.#uiManager.getModalRenderer(
      null,
      contentContainer,
      projectToEdit,
    );

    modalRendererForProject.showEditProjectModal((newName, newDescription) => {
      // Update the properties of the project object
      projectToEdit.name = newName;
      projectToEdit.description = newDescription;

      this.#projectManager.saveProjects(); // Persist the changes

      // Re-render affected parts of the UI
      this.renderProjects();
      if (
        this.#currentActiveProject &&
        this.#currentActiveProject.id === projectToEdit.id
      ) {
        this.renderTodosForProject(projectToEdit); // Refresh header and todos if it's the active project
      }
      console.log(`Project "${projectToEdit.name}" updated.`);
    });
  }

  /**
   * @method to delete the project
   * @param {string} projectToDelete
   */
  handleDeleteProjectClick(projectToDelete) {
    const project = this.#projectManager.getProjectById(projectToDelete);
    console.log("Attempting to delete project:", project.name);

    this.removeProject(projectToDelete);
    console.log(`Project "${project.name}" deleted.`);
    this.#projectManager.saveProjects();
    this.renderProjects();
    if (
      this.#currentActiveProject &&
      this.#currentActiveProject.id === projectToDelete
    ) {
      this.renderTodosForProject(this.#projectManager.projects[0]);
    }
  }

  /**
   * @method - remove a todo from the list
   * param {string} id - id of the todo to be removed
   * */
  removeTodo(id) {
    if (this.#currentActiveProject) {
      this.#currentActiveProject.removeTodo(id);
      this.#projectManager.saveProjects();
      this.renderTodosForProject(this.#currentActiveProject); // Re-render todos for the active project
    } else {
      console.warn("No active project to remove todo from.");
    }
  }
}

export default AppController;
