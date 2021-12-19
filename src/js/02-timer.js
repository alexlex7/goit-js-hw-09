// Описан в документации
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    if (chosenDate < currentDate) {
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', '');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.addEventListener('click', () => {
      onStartTimer(chosenDate);
      refs.startBtn.setAttribute('disabled', '');
    });
  },
};

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

const fp = flatpickr(refs.input, options);

function onStartTimer(date) {
  const intervalId = setInterval(() => {
    const timeToEnd = date - new Date().getTime();
    const convertedTime = convertMs(timeToEnd);
    refs.days.textContent = addLeadingZero(convertedTime.days);
    refs.hours.textContent = addLeadingZero(convertedTime.hours);
    refs.minutes.textContent = addLeadingZero(convertedTime.minutes);
    refs.seconds.textContent = addLeadingZero(convertedTime.seconds);

    if (timeToEnd < 1000) {
      clearInterval(intervalId);
      return;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
