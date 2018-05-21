/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let result = {};
    let cookies = getCookies();

    listTable.innerHTML = '';

    const chunk = filterNameInput.value;

    for (let cookie in cookies) {
        if (cookie) {            
            if (isMatching(cookie+cookies[cookie], chunk)) {
                result[cookie] = cookies[cookie];
            }
        }
    }
    
    for (let cookie in result) {
        if (cookie) {

            listTable.innerHTML += `<tr>
                                    <td>${cookie}</td>
                                    <td>${result[cookie]}</td>
                                    <td><a href="${cookie}">удалить</a></td>
                                </tr>`;
        }
    }
});

updateTable();

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    // addNameInput.value = '';
    // addValueInput.value = '';
    updateTable();
});

listTable.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (e.target.tagName == 'BUTTON') {        
        deleteCookie(e.target);
        updateTable();
    }
});

filterNameInput.addEventListener('focusout', function() {
    
    if (filterNameInput.value == '') {
        updateTable();
    }
});

function updateTable() {
    let table = '';       
    let cookies = getCookies();

    for (let cookie in cookies) {
        if (cookie) {
            table += `<tr>
                        <td>${cookie}</td>
                        <td>${cookies[cookie]}</td>
                        <td><button value="${cookie}">удалить</button></td>
                    </tr>`;
        }
    }

    listTable.innerHTML = table;
}

function deleteCookie(target) {
    let cookieName = target.getAttribute('value');
    
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function isMatching(full, chunk) {           
    return full.toUpperCase().includes(chunk.toUpperCase()) && chunk.length != 0;   
}

function getCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {

        let [name, value] = current.split('=');
    
        prev[name] = value;
        
        return prev;
    }, {});
}
