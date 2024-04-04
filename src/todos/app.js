import html from './app.html?raw';
import todoStore from "../store/todo.store.js";
import {renderTodos} from "./use-cases/index.js";

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}

/**
 *
 * @param {String} elementId
 * @constructor
 */
export const App = (elementId) => {

    const displayTodos= (todos) => {
        const todosList = todos || todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todosList)
    };

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput)
    const todoListUL = document.querySelector(ElementIds.TodoList)

    newDescriptionInput.addEventListener('keyup', (e)=>{
        if (e.keyCode !== 13) return;
        if (e.target.value.trim().length === 0) return;
        todoStore.addTodo(e.target.value);
        displayTodos()
        e.target.value = ''
    })

    todoListUL.addEventListener('click', (e)=> {
        const element = e.target.closest('[data-id]')
        if (!element) return
        todoStore.toggleTodo( element.getAttribute('data-id'))
        displayTodos()
    })


    todoListUL.addEventListener('click', (e)=> {
        const isDestroyElement = e.target.className === 'destroy'
        const element = e.target.closest('[data-id]')
        if (!element || !isDestroyElement) return
        todoStore.deleteTodo( element.getAttribute('data-id'))
        displayTodos()
    })
};