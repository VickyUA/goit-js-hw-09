import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
        console.log('Selected date:', selectedDates[0]);

        const date = new Date();
        console.log('Date now:', date);
        const selectedDate = selectedDates[0];
        const timeDiff = selectedDate.getTime() - date.getTime();
        console.log('Time difference:', timeDiff);

        if (timeDiff < 0) {
            window.alert("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', () => {

                let ms = timeDiff;
                const id = setInterval(() => {
                    ms -= 1000;
                    const leftTime = convertMs(ms);
                    console.log(leftTime);
                    daysTimer.textContent = leftTime.days;
                    hoursTimer.textContent = leftTime.hours;
                    minutesTimer.textContent = leftTime.minutes;
                    secondsTimer.textContent = leftTime.seconds;
                    
                }, 1000);

            } )
        };
      
    },
}); 


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

