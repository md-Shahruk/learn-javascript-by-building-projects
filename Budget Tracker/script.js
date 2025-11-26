
// Dom elements

const transactionForm = document.getElementById('transaction-form');
const balanceAmount =  document.getElementById('balance-amount');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount =  document.getElementById('expense-amount');

let transactions = []

document.getElementById('date').valueAsDate =  new Date();



transactionForm.addEventListener('submit', function(e){
  e.preventDefault();

 const description =  document.getElementById('description').value;
 const amount =  parseFloat(document.getElementById('amount').value);
 const category =  document.getElementById('category').value;
 const date =  document.getElementById('date').value;
 let type;
 if(document.getElementById('income').checked){
   type = 'income';
 }else{
   type = 'expense'
 }
 
 const transaction = {
   description:description,
   amount: amount,
   category:category,
   type:type,
   date:date
 }

 transactions.push(transaction);
 updateSummary();
 transactionForm.reset();
 document.getElementById('date').valueAsDate =  new Date();


});

function updateSummary(){
   let totalIncome = 0;
   let totalExpense = 0;

   transactions.forEach(transaction =>{
   if(transaction.type === 'income'){
      totalIncome += transaction.amount;
   }else{
      totalExpense += transaction.amount;
   }
   
   balance = totalIncome - totalExpense;
   incomeAmount.textContent = totalIncome;
   expenseAmount.textContent = totalExpense;
   balanceAmount.textContent = balance;

   if(balance < 0){
      balanceAmount.style.color = 'red';
   }else{
      balanceAmount.style.color = 'green';
   }

   });
}

// function displayTransaction(){

// }