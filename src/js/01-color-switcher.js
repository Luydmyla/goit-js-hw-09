// ===============получаем ссылки на элементы кнопок старт, стоп и на боди
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyElem: document.querySelector('body'),
};
// ==========вешаем слушатели события клик на кнопки старт и стоп
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
//========функция, которая рандомно генерирует цвет
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// =======функция - обработчик события клик на кнопке старт
function onStartBtnClick() {
    // ======после клика кнопка старт становиться неактивной(добавляем ей атрибут дизейбл со значением тру) а кнопка стоп наоборот активной. 
    refs.startBtn.setAttribute('disabled', true);
    // ====кнопка стоп - удаляем этот атрибут (дизейбл со значением фолс - не работает)
    refs.stopBtn.removeAttribute('disabled');
    // ==========устанавливаем таймер на 1 сек и передаем ему функцию в которой будем меннять цвет фона боди
    timerID = setInterval(() => {
        //  ========меняем цвет фона боди через инлайн стиль
     refs.bodyElem.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        console.log("меняем цвет фона");
        // getRandomHexColor();
    }, 1000);            
    //  console.log(refs.startBtn);
};
// ========функция- обработчик события клик на кнопке стоп
function onStopBtnClick() {
    // ====очищаем интервал (останавливаем таймер)
    clearInterval(timerID);
    //  меняем активность кнопок - стоп становиться неактивной, а старт снова активной. 
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
    console.log(refs.startBtn);
    console.log('останавливаем таймер');
};
// ========при повторном нажатиии кнопки старт, таймер снова запуститься и фон продолжит менятся