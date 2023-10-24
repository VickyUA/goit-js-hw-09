import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

startBtn.disabled = true;


const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        const selectedDate = selectedDates[0];
        const timeDiff = selectedDate.getTime() - date.getTime();

        if (timeDiff < 0) {
            Notiflix.Notify.failure('Please choose a date in the future',
                {
                    timeout: 4000,
                },
            );
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', () => {
                startBtn.disabled = true;

                let ms = timeDiff;
                const id = setInterval(() => {
                    ms -= 1000;
                    const leftTime = convertMs(ms);

                    daysTimer.textContent = addLeadingZero(leftTime.days, 2);
                    hoursTimer.textContent = addLeadingZero(leftTime.hours, 2);
                    minutesTimer.textContent = addLeadingZero(leftTime.minutes, 2);
                    secondsTimer.textContent = addLeadingZero(leftTime.seconds, 2);
                }, 1000);

                setTimeout(() => {
                    clearInterval(id);
                    daysTimer.textContent = '00';
                    hoursTimer.textContent = '00';
                    minutesTimer.textContent = '00';
                    secondsTimer.textContent = '00';
                }, timeDiff);
            } )
        };
      
    },
}); 

function addLeadingZero(num, targetLength) {
  return num.toString().padStart(targetLength, "0");
}

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
};

