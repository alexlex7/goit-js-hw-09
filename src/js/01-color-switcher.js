const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', onStartHandler);
refs.stop.addEventListener('click', onStopHandler);

function onStartHandler(e) {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.start.setAttribute('disabled', '');
}

function onStopHandler(e) {
  clearInterval(intervalId);
  refs.start.removeAttribute('disabled');
}
