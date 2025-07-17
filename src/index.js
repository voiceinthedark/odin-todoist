import Todo from './todo.js';
import TodoManager from './todomanager.js';
import Project from './project.js';


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
project.addTodo('p1 todo2', 'desc', new Date(), null, null);
console.log(project.todos)

//get fist project todo and remove it
//
const fprtodo = project.todos[0];
project.removeTodo(fprtodo.id);
console.log(project.todos);
