import { quizQuestions } from "./data/question.js";

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-button');
const quizScreen = document.getElementById('mcq-screen');
const questionCount = document.getElementById('question-count');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const questionElement = document.getElementById('question');
const optionsElement =  document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const resultScreenElement = document.getElementById('result-screen');
const finalScoreElement = document.getElementById('final-score');
const messageElement = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');


startBtn.addEventListener('click', ()=>startQuiz());
nextBtn.addEventListener('click',()=>nextQuestion());
restartBtn.addEventListener('click', () => {
    resultScreenElement.classList.remove('active');
    //startScreen.classList.add('active');
    //nextBtn.textContent = 'Next Question'; 
    startQuiz();
});


let questionCurrentIndex = 0;
let score = 0;
let selectedOption = null;


function startQuiz(){
    questionCurrentIndex = 0;
    score = 0;
    selectedOption = null;

    updateScore();
    showQuestion();

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
}

function showQuestion(){

   resetOptions(); 
   const currentQuestion = quizQuestions[questionCurrentIndex];
   questionElement.textContent = currentQuestion.question;
   questionCount.textContent = `Question ${questionCurrentIndex + 1} of ${quizQuestions.length}`;


   currentQuestion.options.forEach((option, index)=>{
   const optionElement = document.createElement('div');
   optionElement.classList.add('option');
   optionElement.textContent = option;
   optionElement.dataset.index = index;
   optionElement.addEventListener('click', (e)=>  selectOption(e));
   optionsElement.appendChild(optionElement); 
   
   feedbackElement.style.display = 'none';
   nextBtn.disabled = true;
   
   updateProgress();
});
   
}

function updateProgress() {
    const progress = ((questionCurrentIndex + 1) / quizQuestions.length) * 100;
    progressElement.style.width = `${progress}%`;
}


function selectOption(e){
    if(selectedOption !== null ) return;

    const selectElement = e.target;
    selectedOption = parseInt(selectElement.dataset.index);

    // if want change select option
    document.querySelectorAll('.option').forEach(option =>{
    option.classList.remove('selected');
    });

    selectElement.classList.add('selected'); 
    nextBtn.disabled = false;
}

function resetOptions(){
    optionsElement.innerHTML = '';
    selectedOption = null;
}
function updateScore(){
    scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion(){
    const currentQuestion = quizQuestions[questionCurrentIndex];

   document.querySelectorAll('.option').forEach((option, index) => {
    if (index === currentQuestion.correct) {
        option.classList.add('correct');
    } else if (index === selectedOption && selectedOption !== currentQuestion.correct) { 
        option.classList.add('incorrect');
    }
});

if (selectedOption === currentQuestion.correct){
    score ++;
    updateScore();
}
 feedbackElement.textContent = currentQuestion.feedback;
 feedbackElement.style.display = 'block';


 setTimeout(()=>{
    questionCurrentIndex ++;
    if(questionCurrentIndex < quizQuestions.length){
        showQuestion();
    }else{
        resultScreen();
    }
 }, 2000);
}

function resultScreen() {
    quizScreen.classList.remove('active');
    resultScreenElement.classList.add('active');
    
    finalScoreElement.textContent = `${score}/${quizQuestions.length}`;
    
    // Set result message based on score
    let message = '';
    if (score === quizQuestions.length) {
        message = "Perfect!";
    } else if (score >= quizQuestions.length * 0.7) {
        message = "Great job!";
    } else if (score >= quizQuestions.length * 0.5) {
        message = "Good effort!";
    } else {
        message = "Best of luck for next time!";
    }
    
    messageElement.textContent = message;
}