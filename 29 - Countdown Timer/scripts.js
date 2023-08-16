let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); // select anything with data-time attribute

function timer(seconds) {
    // clear any existing timer when we start a new timer
    clearInterval(countdown);
    
    const now = Date.now(); // in ms
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const min = Math.floor(seconds / 60);
    const remainderSec = seconds % 60;
    const display = `${min}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({ min, remainderSec });
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? (hour - 12) : hour;
    const amOrPm = hour >= 12 ? 'pm' : 'am';
    const min = end.getMinutes();
    endTime.textContent = `End at ${adjustedHour}:${min < 10 ? '0' : ''}${min}${amOrPm}`;
}

function startTimer() {
    console.log(this.dataset); //this will give an object of the data pair
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {  // select element by its name
    e.preventDefault(); //prevent the page from reloading after submit
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();
}) 