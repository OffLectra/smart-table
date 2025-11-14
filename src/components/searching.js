import {createComparison, rules} from "../lib/compare.js";

/**
 * Инициализирует модуль поиска
 * @param {string} searchField - Имя поля поиска в состоянии
 * @returns {Function} Функция применения поиска
 */
export function initSearching(searchField) {
    return (data, state, action) => {
        // Создание компаратора для поиска по нескольким полям
        const compare = createComparison(
            ['skipEmptyTargetValues'], // Используется только правило пропуска пустых значений
            [
                rules.searchMultipleFields(
                    searchField, 
                    ['date', 'customer', 'seller'], 
                    false // Без учета регистра
                )
            ]
        );

        // Применение поиска к данным
        return data.filter(row => compare(row, state));
    };
}