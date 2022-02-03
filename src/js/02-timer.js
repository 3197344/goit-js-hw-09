import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
inputClock: document.querySelector('#datetime-picker'),
btnStart: document.querySelector('button[data-start]'),
daysSpan: document.querySelector('.value[data-days]'),
hoursSpan: document.querySelector('.value[data-hours]'),
minutesSpan: document.querySelector('.value[data-minutes]'),
secondsSpan: document.querySelector('.value[data-seconds]'),
timerSpan:document.querySelector('.timer'),
fieldSpan:document.querySelectorAll('.field'),
numberSpan: document.querySelectorAll('.value'),
labelSpan: document.querySelectorAll('.label'),
}
refs.btnStart.disabled = true;
refs.btnStart.style.width = "80px"
refs.btnStart.style.height = "30px"
refs.btnStart.style.margin = '20px'
refs.timerSpan.style.display ="flex";
refs.timerSpan.style.width = "100px"

refs.timerSpan.style.textAlign = "center"
refs.hoursSpan.style.margin = '30px'
refs.daysSpan.style.margin = '30px'
refs.minutesSpan.style.margin = '30px'
refs.secondsSpan.style.margin = '30px'


refs.btnStart.setAttribute('disabled', 'true');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const inputDate = selectedDates[0];
        const currentTime = Date.now();
        const deltaTime = (inputDate - currentTime);
        if (deltaTime > 0) {
            refs.btnStart.disabled = false;
        
            refs.btnStart.style.backgroundColor = "purple";
            refs.btnStart.style.color = "white";
            refs.hoursSpan.style.color = "purple";
            refs.daysSpan.style.color = "purple";
            refs.minutesSpan.style.color = "purple";
            refs.secondsSpan.style.color = "purple";
        }
        else {
        // window.alert("Please choose a date in the future");
        Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
};

// Инициализируем библиотеку flatpickr*/ 
const fp = flatpickr(refs.inputClock, options);
// console.log(fp);

// Создаём класс "таймер" по видео Репеты (Модуль 11. Занятие 21. Асинхронность: таймеры 19/10/20 время 2:10:05)
class Timer {
    constructor({ onTick }) {
        this.intervalID = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    start() {
        if (this.isActive) {
        return;
    }
    const selectedTime = fp.selectedDates[0].getTime();
    this.isActive = true;

    this.intervalID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        const convertedTime = this.convertMs(deltaTime);
        this.onTick(convertedTime);
        if (deltaTime <= 0) {
            this.stop();
        }
    }, 1000);
    }

    stop() {
        clearInterval(this.intervalID);
        this.isActive = false;
        const convertedTime = this.convertMs(0);
        this.onTick(convertedTime);
    }

    convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    }

    addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }
}

const timer = new Timer({ onTick: faceClock });

refs.btnStart.addEventListener('click', onClickTimerStart);

function onClickTimerStart() {
    timer.start();
}

function faceClock(value) {
refs.daysSpan.innerHTML = value.days;
refs.hoursSpan.innerHTML = value.hours;
refs.minutesSpan.innerHTML = value.minutes;
refs.secondsSpan.innerHTML = value.seconds;
}
