// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

// ====нашла ссылки на элементы флрмы ввода даты и полей вывода дней, часов, минут, секунд===============
const refs = {
  buttonStartEl: document.querySelector('button'),
  timerEl: document.querySelector('.timer'),
  fieldEl: document.querySelector('.field'),
  daysFieldEl: document.querySelector('.field [data-days]'),
  hoursFieldEl: document.querySelector('.field [data-hours]'),
  minutesFieldEl: document.querySelector('.field [data-minutes]'),
  secondsFieldEl: document.querySelector('.field [data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};
refs.input.setAttribute('placeholder', 'Select Date');
refs.buttonStartEl.style.backgroundColor = 'pink';
// console.log(refs.buttonStartEl);
// console.log(refs.timerEl);
// console.log(refs.fieldEl);
// console.log(refs.daysFieldEl);
// console.log(refs.hoursFieldEl);
// console.log(refs.minutesFieldEl);
// console.log(refs.secondsFieldEl);
// console.log(refs.input);

refs.input.addEventListener('click', onInputClick);
refs.buttonStartEl.addEventListener('click', onButtonStartClick);
// ======кнопка старт вначале неактивна(добавляем ей атрибут дизейбл со значением тру)
refs.buttonStartEl.setAttribute('disabled', true);

// ======== использую библиотеку flatpickr  при клике на инпут - открывает календарь для выбора даты
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(diferentInTime(selectedDates[0]));

    if (diferentInTime(selectedDates[0]) <= 0) {
      //   console.log('Please choose a date in the future');
      alert('Please choose a date in the future');
    } else {
      // ======после ввода валидной даты  кнопка старт становиться неактивной(удаляем ей атрибут дизейбл).
      refs.buttonStartEl.removeAttribute('disabled');
    }
  },
});
// console.log(flatpickr);
// ======== функция, которая проверяет ввел ли пользователь дату в прошлом и возвращает тру
function diferentInTime(date) {
  const dateNow = new Date();
  console.log(dateNow);
  console.log(dateNow.getTime());
  console.log(date.getTime());
  date.getTime() - dateNow.getTime();

  //   if (sub <= 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
}

// ========функция обработки события клик на инпуте для выбора даты  =============
function onInputClick(e) {
  // console.log(e.target.Date);
  console.log('выбираю дату');
}

// function onButtonStartClick(e) {
//   console.log('посчитаем время');
//   convertMs();
//   console.log(convertMs());
//   timerID = setInterval(() => {
//     convertMs();
//   }, 1000);
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
