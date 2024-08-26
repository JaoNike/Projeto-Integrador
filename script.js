function logoff() {
    // Limpa os campos de login e senha, se existirem no localStorage
    if (localStorage.getItem('login')) {
        localStorage.removeItem('login');
    }
    if (localStorage.getItem('senha')) {
        localStorage.removeItem('senha');
    }

    // Redireciona para a página de login
    window.location.href = "./index.html"; // Substitua pelo caminho correto para a página de login

}