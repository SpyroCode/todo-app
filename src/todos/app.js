import html from './app.html?raw';
import todoStore from "../store/todo.store.js";
import {renderTodos} from "./use-cases/index.js";

const ElementIds = {
    TodoList: '.todo-list'
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
};