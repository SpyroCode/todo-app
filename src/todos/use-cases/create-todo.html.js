export {Todo} from '../models/todo.model';
/**
 *
 * @param {Todo} todo
 * @returns {HTMLLIElement}
 */

export const createTodoHtml = (todo) => {
    if (!todo) throw new Error('todo is required');
    const {id, description, done} = todo;
    const html = `
           <div class="view">
               <input class="toggle" type="checkbox" ${done && 'checked'}>
               <label>${description}</label>
               <button class="destroy"></button>
           </div>
           <input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    return liElement;
}