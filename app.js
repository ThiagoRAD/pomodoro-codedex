const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const timerDiv = document.querySelector('.timer');

let state = {
  totalSeconds: 0,
  isActive: false,
  intervalId: null,
  sessionSeconds: 5 * 60,
};

const format = (number) => {
  return String(number).padStart(2, '0');
}
const updateSeconds = () => {
  state.totalSeconds--;

  let minutesLeft = Math.floor(state.totalSeconds / 60);
  let secondsLeft = state.totalSeconds % 60;
  const timer = `${format(minutesLeft)}:${format(secondsLeft)}`;
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

  state.totalSeconds = state.totalSeconds || state.sessionSeconds;
  state.isActive = true;
  startBtn.textContent = 'Pause';

  state.intervalId = setInterval(updateSeconds, 1000);
};

startBtn.addEventListener('click', appTimer);
