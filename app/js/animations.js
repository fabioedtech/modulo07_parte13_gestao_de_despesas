const btnSignIn = document.getElementById('signin');
const container = document.getElementById('container');
const containerPainel = document.getElementById('container-painel');
const ctaContent = document.getElementById('cta-body');
const principalContent = document.getElementById('principal-content');
const painelExpenseContent = document.getElementById('painel-content');
const modalLogin = document.getElementById('modal-login');
const modalRegister = document.getElementById('modal-register')
const modalRegisterExpense = document.getElementById('modal-register-expense')
const modalRegisterCategory = document.getElementById('modal-register-category')
  

function loadLogin(){
ctaContent.style.display='none';
modalLogin.style.display='flex';
modalRegister.style.display='none';


}
function backToCTA(){
ctaContent.style.display='block';
modalLogin.style.display='none';
modalRegister.style.display='none';
  
}
function signIn(){
container.style.display='none';
containerPainel.style.display='flex';

}
function logout(){
container.style.display='flex';
containerPainel.style.display='none';
backToCTA();
}
function loadRegister(){
ctaContent.style.display='none';
modalLogin.style.display='none';
modalRegister.style.display='flex';
}
function signUp(){

}
function createAddExpense(){
painelExpenseContent.style.display='none';
modalRegisterExpense.style.display='flex';
modalRegisterCategory.style.display='none';


}
function createAddCategories(){
painelExpenseContent.style.display='none';
modalRegisterExpense.style.display='none';
modalRegisterCategory.style.display='flex';

}
function backtoPainel(){
painelExpenseContent.style.display='flex';
modalRegisterExpense.style.display='none';
modalRegisterCategory.style.display='none';

}