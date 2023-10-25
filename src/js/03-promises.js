import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const formInput = evt.currentTarget.elements;

  let delay = Number(formInput.delay.value);
  const step = Number(formInput.step.value);
  const amount = Number(formInput.amount.value);  
  
    for (let i = 1; i <= amount; i +=1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;    
  }
}

function createPromise(position, delay) {
  
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        };
      }, delay);
    });
};