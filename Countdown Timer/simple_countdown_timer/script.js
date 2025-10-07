
let timer;
let targettime;
let remainingtime;
let isPaused = false;


const display = document.getElementById('time-display');
const input = document.getElementById('target-time');
const startbtn = document.getElementById('startbtn');
const pausebtn =  document.getElementById('pausebtn');
const resetbtn = document.getElementById('resetbtn');

// For time display 
function displayTime (ms){
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  display.textContent =
  `${String(hours).padStart(2,'0')}:` + `${String(minutes).padStart(2,'0')}:` + `${String(seconds).padStart(2,'0')}`
}


// button active start

startbtn.addEventListener('click', ()=>{

  if (isPaused) {
  targettime = Date.now() + remainingtime;
  isPaused = false;
  }else{
    const inputValue = input.value ;
    if (!inputValue) return alert('First select a target time.');
    targettime = new Date(inputValue).getTime();
  }

  timer = setInterval(()=>{
    remainingtime = targettime - Date.now();

    if(remainingtime <= 0){
      clearInterval(timer);
      displayTime(0);
      alert("Time is up!");
      return;
    }

    displayTime(remainingtime);
  }, 1000);

});