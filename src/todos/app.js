import html from './app.html?raw';
import todoStore, {Filters} from "../store/todo.store.js";
import {renderPending, renderTodos} from "./use-cases/index.js";

const ElementIds = {
    ClearCompletedButton: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count',
    TodoFilter: '.filtro',
    TodoList: '.todo-list',
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
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCountLabel);
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput)
    const todoListUL = document.querySelector(ElementIds.TodoList)
    const clearCompletedButton = document.querySelector(ElementIds.ClearCompletedButton)
    const filtersLIs = document.querySelectorAll(ElementIds.TodoFilter)

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

    clearCompletedButton.addEventListener('click', ()=>{
        todoStore.deleteCompleted()
        displayTodos()
    })

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }

            displayTodos();

        });


    });

};