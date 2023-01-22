// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerID = null;
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    clearInterval(timerID);

    if (selectedDates[0] - Date.now() > 1000) {
      btnStart.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};
const inputPicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onBtnStartClick, { once: true });
btnStart.setAttribute('disabled', 'true');
styleTimer(); 
flatpickr(inputPicker, options);

function onBtnStartClick() {
  inputPicker.setAttribute('disabled', 'true');
  btnStart.setAttribute('disabled', 'true');

  timerID = setInterval(() => {
    const timeLeftMs = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeLeftMs);

    if (timeLeftMs < 1000) {
      clearInterval(timerID);
    }

    fieldDays.textContent = addLeadingZero(days);
    fieldHours.textContent = addLeadingZero(hours);
    fieldMinutes.textContent = addLeadingZero(minutes);
    fieldSeconds.textContent = addLeadingZero(seconds);

    console.log('timeLeft :>> ', convertMs(timeLeftMs));
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //  days
  const days = Math.floor(ms / day);
  //  hours
  const hours = Math.floor((ms % day) / hour);
  //  minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  //  seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function styleTimer() {
  const timerEl = document.querySelector('.timer');
  const fieldEl = document.querySelectorAll('.field');
  const valueEl = document.querySelectorAll('.value');
  timerEl.style.display = 'flex';
  timerEl.style.marginTop = '20px';
  timerEl.style.gap = '10px';
  fieldEl.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
  });
  valueEl.forEach(el => (el.style.fontSize = '52px'));
}