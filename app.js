const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');

let state = {
  totalSeconds: 0,
  isActive: false,
  intervalId: null,
};

const format = (number) => {
  return String(number).padStart(2, '0');
}
const updateSeconds = () => {
  const timerDiv = document.querySelector('.timer');
  state.totalSeconds--;

  let minutesLeft = Math.floor(state.totalSeconds / 60);
  let secondsLeft = state.totalSeconds % 60;
  const timer = `${format(minutesLeft)} : ${format(secondsLeft)}`;
  timerDiv.textContent = timer;

  if (state.totalSeconds === 0) {
    bells.play();
    clearInterval(state.intervalId);
  }
};


const appTimer = () => {

  bells.play();

  if (state.isActive) {
    clearInterval(state.intervalId);
    startBtn.textContent = 'Start';
    state.isActive = false;
    return;
  }

  state.totalSeconds = +session.textContent * 60;
  state.isActive = true;
  startBtn.textContent = 'Pause';

  myInterval = setInterval(updateSeconds, 1000);
};

startBtn.addEventListener('click', appTimer);
