import { horarioAulas } from './acessarDB.js';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const tokendobanco = "TOKEN_ALUNO_456"; // token fictício obtido do banco
const userdobanco = "aluno"; // outro token fictício obtido do banco
if (!token || !user) {
    alert("Você não está logado. Redirecionando para a página de login.");
    window.location.href = "index.html";
} else {
    if (token !== tokendobanco || user !== userdobanco) {
        alert("Você não tem permissão para acessar esta página.");
        window.location.href = "index.html";
    }  // Verifica se o token e o usuário estão corretos
    else {
        alert("Bem-vindo, " + user + "!");
        preencherTabela();
    }
}

const botaoLogoff = document.getElementById('btn-logoff');
botaoLogoff.addEventListener('click', function () {
    logoff();
});

function preencherTabela() {
    const tabela = document.getElementById("tabela-horario");
    horarioAulas.forEach(aula => {
        console.log(aula)

        const linha = document.createElement("tr");
        const celulaHorario = document.createElement("td");

        celulaHorario.textContent = aula.horario;
        linha.appendChild(celulaHorario);
        
        ["segunda", "terca", "quarta", "quinta", "sexta"].forEach(dia => {
            const celula = document.createElement("td");
            const aulaDia = aula[dia];
            console.log(aulaDia)
            
            celula.innerHTML = `
            <div><strong>${aulaDia.disciplina}</strong></div>
            <div>${aulaDia.sala}</div>
            <div>${aulaDia.professor}</div>
            `;
            
            if (aulaDia.tipo === "Atividades Especiais") {
                celula.classList.add("especial");
            } else if (aulaDia.tipo === "Prova") {
                celula.classList.add("prova");
            } else {
                celula.classList.add("normal");
            }
            
            celula.addEventListener('click', () => {
                if (aulaDia.especial) {
                    alert(`Aula especial de ${aulaDia.disciplina} com ${aulaDia.professor}`);
                } else if (aulaDia.prova) {
                    alert(`Prova de ${aulaDia.disciplina} com ${aulaDia.professor}`);
                }
            });
            
            linha.appendChild(celula);
        });
        
        tabela.appendChild(linha);
    });
}

function logoff() {
    // Limpa os campos de login e senha, se existirem no localStorage
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
    }
    // Redireciona para a página de login
    window.location.href = "index.html";
}  
