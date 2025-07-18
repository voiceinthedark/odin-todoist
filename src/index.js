import Todo from './todo.js';
import TodoManager from './todomanager.js';
import Project from './project.js';
import storageManager from './todostoragemanager.js';
import projectManager from './projectmanager.js';


const atodo = new Todo('new todo', 'desc', new Date(), 'none', null, null);

console.log(atodo)
console.log(atodo.dueDate)

const todoManager = new TodoManager();

todoManager.addTodo('test1', 'descc', new Date(), 2, null, null);

const todos = todoManager.todos;

// get first todo 
const first = todoManager.todos[0]
console.log(first.id);
console.log(todos)

//remove todo by id
todoManager.removeTodo(first.id);
console.log(todoManager.todos)
console.log(todoManager.todos.length); // 0


const project = new Project('p1', 'p1 desc');

project.addTodo('p1todo', 'p1desc', new Date(), null, null);
console.log(project.todos)
project.addTodo('p1 todo2', 'desc', new Date(), 2);
console.log(project.todos)

//get fist project todo and remove it
//
const fprtodo = project.todos[0];
project.removeTodo(fprtodo.id);
console.log(project.todos);

// testing storagemanager
// add the project to the database
storageManager.setItem(project.id, JSON.stringify(project));

// testing multiple projects
const proj2 = new Project('p2', 'second');
const proj3 = new Project('p3', 'third');

proj2.addTodo('p2 t1', 't1', new Date(), 3);
proj2.addTodo('p2 t2', 't2', new Date(), 1);
proj2.addTodo('p2 t3', 't3', new Date(), 2);

proj3.addTodo('p3 t1', 't1', new Date(), 4);
proj3.addTodo('p3 t2', 't2', new Date(), 4);

projectManager.projects = [proj2, proj3];

storageManager.setItem('user1', JSON.stringify(projectManager.projects))
