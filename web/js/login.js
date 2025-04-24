document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de clique ao botão de login
    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário padrão

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        handleLogin(username,password); // Chama a função de login
    });
});


function handleLogin(username, password) {
    // Verifica as credenciais do usuário
    // Aqui você pode adicionar lógica para verificar as credenciais com um banco de dados ou API
    // Para fins de exemplo, vamos usar credenciais fixas
    // Você deve substituir isso por uma verificação real
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (username === 'admin' && password === 'admin') {
        // Redireciona para a página do administrador
        window.location.href = 'horarioProfessor.html';
    } else if (username === 'aluno' && password === 'aluno') {
        // Redireciona para a página do aluno
        window.location.href = 'horarioAluno.html';
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }

    // Limpa os campos de login e senha
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}