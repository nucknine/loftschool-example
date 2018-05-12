/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div'),
        letters = '0123456789ABCDEF',
        windowH = window.innerHeight,
        windowW = window.innerWidth,
        width = Math.floor(Math.random() * windowW),
        height = Math.floor(Math.random() * windowH);
        
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    const y = windowH - height;
    const x = windowW - width;

    const randomX = Math.floor(Math.random()*x);
    const randomY = Math.floor(Math.random()*y);

    // console.log('h = ' + windowH + ' w = ' + windowW + 
    // '\n' + 'randY = ' + randomY + ' randX = ' + randomX +
    // '\n' + 'cH = ' + height + ' cW = ' + width +
    // '\n' + 'y = ' + y + ' x = ' + x);

    div.setAttribute('style', 'position:absolute;');
    div.style.top = randomX + 'px';
    div.style.left = randomY + 'px';
    
    div.style.background = color;

    div.style.width = width + 'px';
    div.style.height = height + 'px';

    div.classList.add('draggable-div');

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', dragDrop, false);
}

/*
drag n drop function
*/

function dragDrop (e) {
    e = e || event;    
    var target = e.target;
    
    target.style.zIndex = 999; 
    
    document.addEventListener('mousemove', mouseMove, false);
    document.addEventListener('mouseup', mouseUp, false);
    
    function mouseMove (e) {
        e = e || event;

        if (e.pageX > target.offsetWidth / 2) {
            target.style.left = e.clientX - target.offsetWidth/2 + 'px';
            target.style.top = e.clientY - target.offsetHeight/2 + 'px';
        } else { 
            target.style.left = 0 + 'px'; 
        }
    }
    
    function mouseUp (e) {
        e = e || event;
        document.removeEventListener('mousemove', mouseMove, false);
        document.removeEventListener('mouseup', mouseUp, false);
    
    }
    
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
