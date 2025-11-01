
const passwordElement = document.getElementById('password');
const copyButton =  document.getElementById('copy-btn');
const passwordLength = document.getElementById('length-value');
const rangeLength = document.getElementById('length');
const uppercaseCheckBox = document.getElementById('uppercase');
const lowercaseCheckBox = document.getElementById('lowercase');
const numbersCheckBox = document.getElementById('numbers');
const symbolsCheckBox = document.getElementById('symbols');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');
const passwordGeneratorBtn = document.getElementById('generate-btn');


// Character sets
const uppercaseChars = 'ABCDEFGHIJ';
const lowercaseChars = 'abcdefghij';
const numberChars = '0123456789';
const symbolChars = '!@#$%';

// password lenght update
rangeLength.addEventListener('input',()=>{
  passwordLength.textContent = rangeLength.value;
});


// password generator function

function passwordgenerator(){

    let password = '';
    let allCharacter = '';

    if (uppercaseCheckBox.checked) allCharacter += uppercaseChars;
    if (lowercaseCheckBox.checked) allCharacter += lowercaseChars;
    if (numbersCheckBox.checked) allCharacter += numberChars;
    if (symbolsCheckBox.checked) allCharacter += symbolChars;

   // console.log(allCharacter);
   
   if(allCharacter === ''){
    passwordElement.textContent = 'select at least one character.';
    return;
   }

   for (let i = 0; i < parseInt(rangeLength.value); i++){
    const randomIndex = Math.floor(Math.random() * allCharacter.length);
    password += allCharacter[randomIndex];

   }

   passwordElement.textContent = password;
   updatePassword(password);
}

function updatePassword(password){
    let stren = 0;

    if (password.length >= 8) stren += 1;
    if (password.length >= 12) stren += 1;
    
    if (password.length >= 14) strength += 1;

    if (/[A-Z]/.test(password)) stren += 1;
    if (/[a-z]/.test(password)) stren += 1;
    if (/[0-9]/.test(password)) stren += 1;
    if (/[^A-Za-z0-9]/.test(password)) stren += 1;

    let strenPercentage = 0;
    let strenLabel = '';
    
    if (stren <= 2) {
        strenPercentage = 25;
        strenLabel = 'Weak';
        strengthFill.style.backgroundColor = '#e74c3c';
    } else if (stren <= 4) {
        strenPercentage = 50;
        strenLabel = 'Fair';
        strengthFill.style.backgroundColor = '#f39c12';
    } else if (stren <= 6) {
        strenPercentage = 75;
        strenLabel = 'Good';
        strengthFill.style.backgroundColor = '#3498db';
    } else {
        strenPercentage = 100;
        strenLabel = 'Strong';
        strengthFill.style.backgroundColor = '#2ecc71';
    }

    strengthFill.style.width = `${strenPercentage}%`;
    strengthText.textContent =  `Password strength: ${strenLabel}`;

   console.log(stren);
}


// function copyToclipBoard(){
//     const 
// }



passwordGeneratorBtn.addEventListener('click', passwordgenerator);


// document.addEventListener('DOMContentLoaded', function(){
    
   
// });