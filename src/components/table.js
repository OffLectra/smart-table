import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before = [], after = []} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 - Добавление дополнительных шаблонов
    
    // Добавление шаблонов "до" таблицы (в обратном порядке)
    before.reverse().forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
    });
    
    // Добавление шаблонов "после" таблицы
    after.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
    });

    // @todo: #1.3 - Обработка событий
    root.container.addEventListener('change', () => {
        onAction();
    });
    
    root.container.addEventListener('reset', () => {
        setTimeout(onAction);
    });
    
    root.container.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });

    const render = (data) => {
        // @todo: #1.1 - Вывод строк таблицы
        const rowsContainer = root.elements.rows;
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            
            Object.keys(item).forEach(key => {
                if (row.elements[key]) {
                    // Проверка типа элемента для правильного присвоения значения
                    const element = row.elements[key];
                    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                        element.value = item[key];
                    } else {
                        element.textContent = item[key];
                    }
                }
            });
            
            return row.container;
        });

        // Очищение контейнера и добавление новых строк
        rowsContainer.replaceChildren(...nextRows);
    };

    return {...root, render};
}