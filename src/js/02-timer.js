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
}

refs.btnStart.setAttribute('disabled', 'true');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentTime = Date.now();
        console.log(selectedDate);

        if (currentTime > selectedDate) {
        Notiflix.Notify.failure('please, choose a date in the future');
        }
        refs.btnStart.disabled = false;
        refs.btnStart.style.backgroundColor = "purple";
        refs.btnStart.style.color = "white";
    },
};

// Инициализируем библиотеку flatpickr*/ 
const viewCalendar = flatpickr(refs.inputClock, options);






















function convertMs(ms) {
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const days = Math.floor(ms / day);
const hours = Math.floor((ms % day) / hour);
const minutes = Math.floor(((ms % day) % hour) / minute);
const seconds = Math.floor((((ms % day) % hour) % minute) / second);
return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// alert ('please, choose a date in the future')

