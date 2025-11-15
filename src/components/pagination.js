import {getPages} from "../lib/utils.js";

/**
 * Инициализирует модуль пагинации
 * @param {Object} elements - Элементы пагинации
 * @param {Function} createPage - Колбэк для создания кнопки страницы
 * @returns {Object} Объект с функциями applyPagination и updatePagination
 */
export function initPagination(elements, createPage) {
    const {
        pages,
        fromRow,
        toRow, 
        totalRows,
        firstPage,
        previousPage,
        nextPage,
        lastPage
    } = elements;

    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // @todo: #2.6 - Обработка действий пагинации
        if (action) {
            switch(action.name) {
                case 'prev': 
                    page = Math.max(1, page - 1); 
                    break;
                case 'next': 
                    page = Math.min(pageCount, page + 1); 
                    break;
                case 'first': 
                    page = 1; 
                    break;
                case 'last': 
                    page = pageCount; 
                    break;
            }
        }

        return Object.assign({}, query, {
            limit,
            page
        });
    }

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // @todo: #2.3 - Подготовка шаблона страницы
        const pageTemplate = pages.firstElementChild.cloneNode(true);
        pages.firstElementChild.remove();

        // @todo: #2.4 - Вывод кнопок страниц
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));

        // @todo: #2.5 - Вывод статуса пагинации
        fromRow.textContent = (page - 1) * limit + 1;
        toRow.textContent = Math.min((page * limit), total);
        totalRows.textContent = total;
    };

    return {
        updatePagination,
        applyPagination
    };
}