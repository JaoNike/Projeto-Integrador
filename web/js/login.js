document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de clique ao botão de login
    const loginForm = document.getElementById('loginForm')

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário padrão

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        login(username,password); // Chama a função de login
    });
});

function login(username, password) {
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let token = '';
    if (username === 'admin' && password === 'admin') {
        token = 'TOKEN_ADMIN_123'; // token fictício
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', 'admin');
        window.location.href = 'horarioProfessor.html';

    } else if (username === 'aluno' && password === 'aluno') {
        token = 'TOKEN_ALUNO_456'; // outro token fictício
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', 'aluno');
        window.location.href = 'horarioAluno.html';

    } else {
        alert('Credenciais inválidas. Tente novamente.');
        return;
    }

    // Limpa os campos
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
