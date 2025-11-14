import {sortCollection, sortMap} from "../lib/sort.js";

/**
 * Инициализирует модуль сортировки
 * @param {Array} columns - Массив элементов-кнопок сортировки
 * @returns {Function} Функция применения сортировки
 */
export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = 'none';

        // @todo: #3.1 - Обработка действий сортировки
        if (action && action.name === 'sort') {
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;

            // @todo: #3.2 - Сброс состояния других кнопок
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        }

        // @todo: #3.3 - Применение выбранного режима сортировки при последующих перерисовках
        columns.forEach(column => {
            if (column.dataset.value !== 'none') {
                field = column.dataset.field;
                order = column.dataset.value;
            }
        });

        // Применение сортировки, если поле и порядок заданы
        if (field && order !== 'none') {
            return sortCollection(data, field, order);
        }

        return data;
    };
}