/**
 * Инициализирует модуль поиска
 * @param {string} searchField - Имя поля поиска в состоянии
 * @returns {Function} Функция применения поиска
 */
export function initSearching(searchField) {
    return (query, state, action) => {
        return state[searchField] ? Object.assign({}, query, {
            search: state[searchField]
        }) : query;
    };
}