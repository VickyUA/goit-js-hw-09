const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyy = document.querySelector('body');

let id;

startBtn.addEventListener('click', () => {

    id = setInterval(() => {
        bodyy.style.backgroundColor = getRandomHexColor()
    }, 1000);

    startBtn.disabled = true;
}
);

stopBtn.addEventListener('click', () => {
    clearInterval(id);
    startBtn.disabled = false;
}
);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};