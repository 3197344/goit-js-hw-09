const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const promptDeley = 1000;
let intervalID = null;

btnStart.addEventListener('click', changesBackgroundColorOfBody );
btnStop.addEventListener('click', stopChangesBackgroundColorOfBody);


function changesBackgroundColorOfBody() {
  //  event.preventDefault();
    intervalID = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
    console.log('генерим цвет', `${getRandomHexColor()}`);
    }, 1000);

}

function stopChangesBackgroundColorOfBody() {
    clearInterval(intervalID);
console.log('хватит', btnStop); 
}

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


