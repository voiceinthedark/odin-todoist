import projectManager from './modules/projectmanager';
import UIManager from './modules/UI/uimanager';
import ProjectRenderer from './modules/UI/projectrenderer.js';
import TodoRenderer from './modules/UI/todorenderer.js';
import './styles/styles.css';
import './styles/fontawesome.min.css';
import './styles/regular.min.css';
import './styles/solid.min.css';
import './webfonts/fa-solid-900.ttf';

const firstp = projectManager.addProject('new project', 'This is a new project');
const secondp = projectManager.addProject('another project', 'This is another project');

firstp.addTodo('todo 1', 'description 1', new Date(), 1);
firstp.addTodo('todo 2', 'description 2', new Date(), 4);

const appContainer = document.getElementById('container');

const uiManager = new UIManager(appContainer);

const projectRenderer = new ProjectRenderer(uiManager);

// get the sidebar element & render the project list
const sidebarLists = document.querySelector('.sidebar-lists');
projectRenderer.renderProjectList(sidebarLists, projectManager.projects);

console.log(firstp.todos);  

const contentContainer = document.querySelector('.content');

const handleTodoClick = (todo) => {
  console.log('Todo Clicked:', todo.id);
  uiManager.getModalRenderer(todo, contentContainer).showEditModal();
}

const todoRenderer = new TodoRenderer(uiManager, contentContainer, handleTodoClick);

todoRenderer.renderTodoList(firstp.todos)


