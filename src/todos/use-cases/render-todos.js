import {Todo} from '../models/todo.model';
import {createTodoHtml} from "./create-todo.html.js";

let element;

/**
 *
 * @param {String} elementId
 * @param {Todo} todos
 */

export const renderTodos = (elementId, todos = []) => {
    if (!elementId) throw new Error('elementId is required');
    if (!element) {
        element = document.querySelector(elementId)
    };
    if (!element) throw new Error('element not found');
    element.innerHTML = '';
    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });
};