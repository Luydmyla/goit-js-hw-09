//=============подключаю библиотеку ========= all modules
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// =============нашла ссылки на элементы кнопку и на саму форму==========
const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('button'),
};
// console.log(refs.form);
// console.log(refs.submit);
// ============вешаю слушателей событий на форму и на кнопку
refs.form.addEventListener('input', onFormInput);
refs.submit.addEventListener('click', onSubmitClick);
// ==========глобальные переменные, которые будут принимать введеные значения в полях формы
let firstDelay;
let stepDelay;
let amountPromises;
// =======функция обработчик собития ввода в поля формы==================
function onFormInput(e) {
  // console.log(e.target.value);
  // console.log(e.currentTarget.elements.delay.value);
  // console.log(e.currentTarget.elements.step.value);
  // console.log(e.currentTarget.elements.amount.value);
  // =========в переменнеые записываю значения полей формы================
  firstDelay = Number(e.currentTarget.elements.delay.value);
  stepDelay = Number(e.currentTarget.elements.step.value);
  amountPromises = Number(e.currentTarget.elements.amount.value);
  // console.log(firstDelay);
  // console.log(stepDelay);
  // console.log(amountPromises);
}
// ==========функция обработчик события клика на кнопку создать======
function onSubmitClick(e) {
  // =======запрет браузеру перезагружать страницу при нажатии на кнопку, =
  // ===(иначе обнуляются данные в полях формы===
  e.preventDefault();
  console.log('вызываем функцию, которая создает промис');
  // ===присваиваем переменной значение  задержки перед  созданием первого промиса====
  let delay = firstDelay;
  // запускаем цикл, столько раз, сколько пользователь ввел в поле количество
  for (let i = 1; i <= amountPromises; i += 1) {
    //  вызиваю функцию которая создает промис
    createPromise(i, delay)
      // методы промиса для успешного и не успешного завершения, использую библиотеку для вывода сообщения
      .then(({ position, delay }) => {
        Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
        // console.log(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
        // console.log(` Rejected promise ${position} in ${delay}ms`);
      });
    // увеличиваем время задержки на величину шага
    delay = delay + stepDelay;
  }
}
// функция которая создает промис, принимает позицию(номер) промиса и время через которое он будет создан
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  console.log(promise);
  // возвращает промис
  return promise;
}
// createPromise(2, 1500)
