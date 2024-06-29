let startTime;
let updatedTime;
let difference;
let timerId;
let isRunning = false;
let lapCounter = 0;

const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.querySelector('.lap-list');

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerId = setInterval(updateTime, 1000);
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
        difference = new Date().getTime() - startTime;
    }
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerId);
    difference = 0;
    lapCounter = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCounter++;
        const lapTime = timeDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
