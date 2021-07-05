const btnSignIn = document.getElementById('signin');
const container = document.getElementById('container');
const containerPainel = document.getElementById('container-painel');
const ctaContent = document.getElementById('cta-body');
const principalContent = document.getElementById('principal-content');
const painelExpenseContent = document.getElementById('painel-content');
const modalLogin = document.getElementById('modal-login');
const modalRegister = document.getElementById('modal-register');
const modalRegisterExpense = document.getElementById('modal-register-expense');
const modalRegisterCategory = document.getElementById('modal-register-category');


function loadLogin() {
    ctaContent.style.display = 'none';
    modalLogin.style.display = 'flex';
    modalRegister.style.display = 'none';


}
function backToCTA() {
    ctaContent.style.display = 'block';
    modalLogin.style.display = 'none';
    modalRegister.style.display = 'none';

}
function signIn() {
    //1 -> Recolher dados dos inputs (email, senha)
    const email = document.getElementById('input-mail').value;
    const password = document.getElementById('input-password').value;

    //2 -> Formatar os dados de acordo com a especificação da API
    const params = {
        "email": email,
        "password": password
    }
    //3 -> Executa a requisição
    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlAPI + '/login');
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(params));
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            //4 -> Caso sucesso, alterar o valor do campo user_id para o ID do usuário logado e proceder com o login
            if(xhr.status === 200){
                const id = JSON.parse(xhr.responseText).id;
                document.getElementById("user_id").value = id;
                container.style.display = 'none';
                containerPainel.style.display = 'flex';    
                loadUserData();
            //5 -> Caso falhe, apresentar mensagem de falha
            }else if(xhr.status === 500){
                alert('Login Failed!');
            }
        }
    }

}
function logout() {
    container.style.display = 'flex';
    containerPainel.style.display = 'none';
    backToCTA();
}
function loadRegister() {
    ctaContent.style.display = 'none';
    modalLogin.style.display = 'none';
    modalRegister.style.display = 'flex';
}
function signUp() {

}
function createAddExpense() {
    painelExpenseContent.style.display = 'none';
    modalRegisterExpense.style.display = 'flex';
    modalRegisterCategory.style.display = 'none';


}
function createAddCategories() {
    painelExpenseContent.style.display = 'none';
    modalRegisterExpense.style.display = 'none';
    modalRegisterCategory.style.display = 'flex';

}
function backtoPainel() {
    painelExpenseContent.style.display = 'flex';
    modalRegisterExpense.style.display = 'none';
    modalRegisterCategory.style.display = 'none';

}