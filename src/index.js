import Todo from './todo.js';
import TodoManager from './todomanager.js';


const atodo = new Todo('new todo', 'desc', new Date(), 'none', null, null);

console.log(atodo)
console.log(atodo.dueDate)

const todoManager = new TodoManager();

todoManager.addTodo('test1', 'descc', new Date(), 2, null, null);

const todos = todoManager.todos;
console.log(todos);
