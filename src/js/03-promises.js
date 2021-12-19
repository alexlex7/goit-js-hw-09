import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const data = new Array(Number(amount.value))
    .fill(Number(delay.value))
    .map((delay, index, arr) => {
      return delay + index * step.value;
    });

  const promises = data.map((value, index, arr) => {
    createPromise(index + 1, value);
  });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}
