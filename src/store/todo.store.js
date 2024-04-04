import {Todo} from "../todos/models/todo.model";
const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
};

const state = {
    todos: [
        new Todo('Learn Vue.js'),
        new Todo('Learn Vuex'),
        new Todo('Learn Vue Router')
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log(state);
    console.log('Store initialized  ');
}

const loadStore = () => {
    const store = localStorage.getItem('state');
    console.log('store', JSON.parse(store));
    if (!store) {
        return;
    }
    if (store) {
        const {todos = [], filter = Filters.All} = JSON.parse(store);
        state.todos = todos;
        state.filter = filter;
    }
}

const saveStore = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
    if (!description) {
        throw new Error('Description is required');
    }
    state.todos.push(new Todo(description));
    saveStore();
}

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStore();
}

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStore();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStore();
}

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStore();
}
const getCurrentFilter = () => {
    return state.filter;
}

/**
 *
 * @param {Filters} filter
 * @returns {Array<Todo>}
 */

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Invalid filter: ${filter}`);
    }

}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}