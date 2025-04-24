
import {horarioAulas} from "./acessarDB.js"

window.preencherTabela = function () {
    const tabela = document.getElementById("tabela-horario");
    
    horarioAulas.forEach(aula => {
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

preencherTabela();

window.logoff = function() {
    // Limpa os campos de login e senha, se existirem no localStorage
    if (localStorage.getItem('login')) {
        localStorage.removeItem('login');
    }
    if (localStorage.getItem('senha')) {
        localStorage.removeItem('senha');
    }

    // Redireciona para a página de login
    window.location.href = "index.html"; // Substitua pelo caminho correto para a página de login

}