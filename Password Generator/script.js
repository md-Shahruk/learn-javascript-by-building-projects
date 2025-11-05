

class PasswordGeneratorApp{
    constructor(){

    this.passwordElement = document.getElementById('password');
    this.copyButton = document.getElementById('copy-btn');
    this.passwordLength = document.getElementById('length-value');
    this.rangeLength = document.getElementById('length');
    this.uppercaseCheckBox = document.getElementById('uppercase');
    this.lowercaseCheckBox = document.getElementById('lowercase');
    this.numbersCheckBox = document.getElementById('numbers');
    this.symbolsCheckBox = document.getElementById('symbols');
    this.strengthFill = document.getElementById('strength-fill');
    this.strengthText = document.getElementById('strength-text');
    this.passwordGeneratorBtn = document.getElementById('generate-btn');
    // dark theme
    this.toggle = document.getElementById('theme-change');
    this.body = document.body;


    this.characterSets={
     uppercaseChars:'ABCDEFGHIJ',
     lowercaseChars:'abcdefghij',
     numberChars :'0123456789',
     symbolChars :'!@#$%',
    };

    this.init();

    } // End constructor

    init(){
        this.rangeLength.addEventListener('input', ()=>this.updatePasswordLenght());
        this.passwordGeneratorBtn.addEventListener('click', ()=> this.passwordgenerator());
        this.copyButton.addEventListener('click',()=> this.copyToclipBoard());
        this.toggle.addEventListener('change', ()=> this.toggleTheme());
        this.darkTheme();
    }

    // dark theme apply 
   
    toggleTheme(){
     
     if(this.toggle.checked){
        this.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
     }else{
        this.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
     }
    }

    darkTheme(){
        const theme = localStorage.getItem("theme");

        if(theme === "dark"){
          this.body.classList.add("dark-theme");
          this.toggle.checked = true;
        } 
        else if (theme === "light"){
          this.body.classList.remove("dark-theme");
          this.toggle.checked = false;
        }
        else{
            if (window.matchMedia("(prefers-color-scheme: dark)").matches){
                this.body.classList.add("dark-theme");
                this.toggle.checked = true;
                localStorage.setItem("theme", "dark");
            }else{
                this.body.classList.remove("dark-theme");
                this.toggle.checked = false;
                localStorage.setItem("theme", "light");
            }
        }
    }

    

    updatePasswordLenght(){
    this.passwordLength.textContent = this.rangeLength.value;
    }

    passwordgenerator(){
        const password = this.createPassword();
        this.passwordElement.textContent = password;
        this.updatePassword(password);
    }

    createPassword(){
        let allCharacter = this.getCharCheck();

        if(allCharacter === ''){
        this.passwordElement.textContent = 'select at least one character.';
        return '';
      }
     
      let password = '';

       for (let i = 0; i < parseInt(this.rangeLength.value); i++){
        const randomIndex = Math.floor(Math.random() * allCharacter.length);
        password += allCharacter[randomIndex];

      }

      return password;

    }

    getCharCheck(){
        let store = '';
        
        if (this.uppercaseCheckBox.checked) store += this.characterSets.uppercaseChars;
        if (this.lowercaseCheckBox.checked) store += this.characterSets.lowercaseChars;
        if (this.numbersCheckBox.checked) store += this.characterSets.numberChars;
        if (this.symbolsCheckBox.checked) store += this.characterSets.symbolChars;
        return store;

    }
    
    updatePassword(password){
            let stren = 0;

            if (password.length >= 8) stren += 1;
            if (password.length >= 12) stren += 1;
            
            if (password.length >= 14) stren += 1;

            if (/[A-Z]/.test(password)) stren += 1;
            if (/[a-z]/.test(password)) stren += 1;
            if (/[0-9]/.test(password)) stren += 1;
            if (/[^A-Za-z0-9]/.test(password)) stren += 1;

            let strenPercentage = 0;
            let strenLabel = '';
            
            if (stren <= 2) {
                strenPercentage = 25;
                strenLabel = 'Weak';
                this.strengthFill.style.backgroundColor = '#e74c3c';
            } else if (stren <= 4) {
                strenPercentage = 50;
                strenLabel = 'Fair';
                this.strengthFill.style.backgroundColor = '#f39c12';
            } else if (stren <= 6) {
                strenPercentage = 75;
                strenLabel = 'Good';
                this.strengthFill.style.backgroundColor = '#3498db';
            } else {
                strenPercentage = 100;
                strenLabel = 'Strong';
                this.strengthFill.style.backgroundColor = '#2ecc71';
            }

            this.strengthFill.style.width = `${strenPercentage}%`;
            this.strengthText.textContent =  `Password strength: ${strenLabel}`;

   //console.log(stren);
}

 
  copyToclipBoard(){
    const password = this.passwordElement.textContent;

    if(!password || password === 'select at least one character.'){
        alert('no password to copy');
        return;
    }

    navigator.clipboard.writeText(password)
    .then(()=> {
      alert('password copied to clipboard.');
    })
    .catch(err =>{
      alert('failed to copy : ',err);
    });
}

}



document.addEventListener('DOMContentLoaded', ()=>{
   new PasswordGeneratorApp();
});