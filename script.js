const msgEl = document.getElementById('msg');


//create  a random number between 1 and 100
const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
}
const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition(); //gives an object

//start recognitio
recognition.start();

// capture user speech
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript
  writeMessage(msg);
  checkNum(msg);
}

//write user speech
const writeMessage = (msg) => {
  msgEl.innerHTML = `
  <section> You said: </section>
  <span class="box">${msg}</span>
  `;
};

const checkNum = (msg) => {
  const num = +msg;
  //check if it is a valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<section> That is not a valid number</section>';
    return;
  };
  //check if the number is in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<section> Number must be between 1 and 100</section>'
    return;
  };
  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2> Congrats! You've guessed the number <br><br>
      </h2>
      It was ${num}
      <button class="play-again"  id="play-again">Play again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<section> Go Lower!</section>';
  } else {
    msgEl.innerHTML += '<section> Go Higher!</section>'
  };
};



//speak result
recognition.addEventListener('result', onSpeak);

// end event
recognition.addEventListener('end', ()=> recognition.start() )

//play again add event listener to body
document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
})