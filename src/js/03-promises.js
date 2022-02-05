import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')
const btnSubmit = document.querySelector('button');
let delayInput = document.querySelector('input[name="delay"]');
let stepInput = document.querySelector('input[name="step"]');
let amountInput = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onSubmitClick);


function onSubmitClick(event){
  event.preventDefault();

  delayInput = Number(event.currentTarget.elements.delay.value);
  stepInput = Number(event.currentTarget.elements.step.value);
  amountInput = Number(event.currentTarget.elements.amount.value);
  btnSubmit.style.backgroundColor = "tomato";
  btnSubmit.style.color = "white";
  console.log(delayInput);
  console.log(stepInput);
  console.log(amountInput);
  
  for (let i = 0; i < amountInput; i+=1) {
    const allTimeDelay = delayInput + i * stepInput;
    // console.log(allTimeDelay);
    createPromise(i + 1, allTimeDelay);
  }
}

function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
          resolve({ position, delay });
        }
        
        else {
          reject({ position, delay });
        }

      }, delay);
    });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}
  