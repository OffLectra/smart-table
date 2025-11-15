/**
 * Инициализирует модуль фильтрации
 * @param {Object} elements - Элементы фильтрации
 * @returns {Object} Объект с функциями applyFiltering и updateIndexes
 */
export function initFiltering(elements) {
    const {
        searchByDate,
        searchByCustomer,
        searchBySeller,
        totalFrom,
        totalTo
    } = elements;

    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 - Обработка очистки полей фильтров
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const parent = action.closest('.filter-wrapper');
            if (parent) {
                const input = parent.querySelector('input');
                if (input) {
                    input.value = '';
                    state[field] = '';
                }
            }
        }

        // @todo: #4.5 - Формирование параметров фильтрации для сервера
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    }
}