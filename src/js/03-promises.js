// all modules
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('button'),
};
console.log(refs.form);
console.log(refs.submit);
refs.form.addEventListener('input', onFormClick);
refs.submit.addEventListener('click', onSubmitClick);

let firstDelay;
let stepDelay;
let amountPromises;
function onFormClick(e) {
  // console.log(e.target.value);

  // console.log(e.currentTarget.elements.delay.value);
  // console.log(e.currentTarget.elements.step.value);
  // console.log(e.currentTarget.elements.amount.value);

  firstDelay = Number(e.currentTarget.elements.delay.value);
  stepDelay = Number(e.currentTarget.elements.step.value);
  amountPromises = Number(e.currentTarget.elements.amount.value);
  console.log(firstDelay);
  console.log(stepDelay);
  console.log(amountPromises);
}

function onSubmitClick(e) {
  e.preventDefault();
  console.log('вызываем функцию, которая создает промис');
  // for (let i = 1; i <= amountPromises; i += 1) {
  //    let delay = firstDelay;
  //   createPromise(i, delay);
  //   delay = delay + stepDelay;
  // }
  let delay = firstDelay;
  for (let i = 1; i <= amountPromises; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
        // console.log(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
        // console.log(` Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + stepDelay;
  }
}
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
  return promise;
}

// createPromise(2, 1500)
