import {createComparison, defaultRules} from "../lib/compare.js";

/**
 * Инициализирует модуль фильтрации
 * @param {Object} elements - Элементы фильтрации
 * @param {Object} indexes - Индексы для заполнения выпадающих списков
 * @returns {Function} Функция применения фильтрации
 */
export function initFiltering(elements, indexes) {
    const {
        searchByDate,
        searchByCustomer,
        searchBySeller,
        totalFrom,
        totalTo
    } = elements;

    // @todo: #4.3 - Создание функции сравнения
    const compare = createComparison(defaultRules);

    // @todo: #4.1 - Заполнение выпадающих списков данными
    Object.keys(indexes).forEach(elementName => {
        const element = elements[elementName];
        if (element && element.tagName === 'SELECT') {
            const options = Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            });
            element.append(...options);
        }
    });

    return (data, state, action) => {
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

        // @todo: #4.5 - Применение фильтрации к данным
        return data.filter(row => compare(row, state));
    };
}