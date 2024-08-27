const {getFirestore, getDoc, getdocs, doc, updateDoc, deleteDoc} = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
import { db } from "../acessarDB.js";

(function(){
    emailjs.init("GvWlpEaWfv7cA4QUn");
})();

const diasSemana = ['segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];
const aulas = ["aula 1", "aula 2", "aula 3", "aula 4", "aula 5"];

let scheduleData = [
    {
        segunda: {},
        terca: {},
        quarta: {},
        quinta: {},
        sexta: {}
    },
    {
        segunda: {},
        terca: {},
        quarta: {},
        quinta: {},
        sexta: {}
    },
    {
        segunda: {},
        terca: {},
        quarta: {},
        quinta: {},
        sexta: {}
    },
    {
        segunda: {},
        terca: {},
        quarta: {},
        quinta: {},
        sexta: {}
    },
    {
        segunda: {},
        terca: {},
        quarta: {},
        quinta: {},
        sexta: {}
    }
];

async function obterAula(diaSemana, aula) {
    const docRef = doc(db, diaSemana, aula);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {     
        return docSnap.data();
        
    } else {
        console.log(`Nenhum documento encontrado para ${diaSemana} - ${aula}!`);
        return null;
    }
};

async function obterAulasSemana() {
    for (let i = 0; i < scheduleData.length; i++) {
        for (let j = 0; j < diasSemana.length; j++) {
            const dadosAula = await obterAula(diasSemana[j], aulas[i]);
            if (dadosAula) {
                scheduleData[i][diasSemana[j].replace("-feira", "")] = {
                // Verifica se o índice `i` é menor que o número de aulas no dia atual
                        materia: dadosAula.materia,
                        professor: dadosAula.professor,
                        sala: `Sala ${dadosAula.sala}`,
                        tipo: dadosAula.tipo,
                        duracao: dadosAula.duracao || 45 // Usa a duração fornecida ou 45 como padrão
                };
            }
        }
    }
};

obterAulasSemana();

let materiaQuarta = scheduleData[0].segunda.materia;

console.log("teste 1: ",scheduleData,"teste 2:", materiaQuarta);

window.loadSchedule = function() {
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${diasSemana[i]}</td>`;
        const dia = diasSemana[i];

        const subjects = scheduleData[i];
        
        //const materia = subjects[i];
        console.log("Testeeee:  ",scheduleData[0].segunda.materia);
                

        for (let j = 0; j < 5; j++) {
            const materia = subjects[i];
            console.log(materia);
            if (j < subjects.length) {
                // Exibe a matéria e adiciona a função de edição ao clique
                row.innerHTML += `
                    <td onclick="editSubject('${dia}', '${materia}')">
                        ${materia}
                    </td>`;
            } else {
                row.innerHTML += '<td></td>'; // Célula vazia se não houver matéria
            }
        }
        scheduleTable.appendChild(row);
    }
};

loadSchedule();

window.editSubject = function (dia, materia) {
    console.log('Editando matéria:', materia, 'do dia:', dia);
    const modal = document.getElementById('editModal');
    const editDay = document.getElementById('edit-day');
    const editSubject = document.getElementById('edit-subject');
    const editProfessor = document.getElementById('edit-professor');
    const editRoom = document.getElementById('edit-room');
    const editHours = document.getElementById('edit-hours');
    const editMinutes = document.getElementById('edit-minutes');
    const editType = document.getElementById('edit-type');

    const subject = scheduleData[dia].find(sub => sub.materia === materia);

    if (!subject) return;

    editDay.value = dia;
    editSubject.innerHTML = '';
    const subjects = ['Matemática', 'Português', 'História', 'Geografia', 'Artes', 'Ciências', 'Educação Física'];
    subjects.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub;
        option.textContent = sub;
        if (sub === subject.materia) {
            option.selected = true;
        }
        editSubject.appendChild(option);
    });
    editProfessor.value = subject.professor;
    editRoom.value = subject.room;
    const duration = subject.duration;
    editHours.value = Math.floor(duration / 60);
    editMinutes.value = duration % 60;
    editType.value = subject.type;

    modal.style.display = 'flex';
};

window. saveEdit = function() {
    const dia = document.getElementById('edit-day').value;
    const subjectName = document.getElementById('edit-subject').value;
    const professor = document.getElementById('edit-professor').value;
    const sala = document.getElementById('edit-room').value;
    const hours = parseInt(document.getElementById('edit-hours').value);
    const minutes = parseInt(document.getElementById('edit-minutes').value);
    const tipo = document.getElementById('edit-type').value;
    const duracao = (hours * 60) + minutes;

    const materia = scheduleData[dia].find(sub => sub.subject === subjectName);
    if (materia) {
        materia.professor = professor;
        materia.sala = sal;
        materia.duracao = duracao;
        materia.tipo = tipo;
    } else {
        // Caso o horário não exista, adicione-o.
        if (!scheduleData[dia]) {
            scheduleData[dia] = [];
        }
        scheduleData[dia].push({
            subject: subjectName,
            professor: professor,
            room: room,
            duration: duration,
            type: type
        });
    }

    closeEditModal();
    loadSchedule();
    showSavingAnimation();
};

window.closeEditModal = function() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
};

window.showSavingAnimation = function() {
    const animation = document.getElementById('savingAnimation');
    animation.style.display = 'block';

    setTimeout(() => {
        animation.style.display = 'none';
    }, 2000);
};

window.sendMessage = function() {
    const message = document.getElementById('automaticMessage').value;
    alert(`Mensagem enviada: ${message}`);
};

window.sendEmail = function () {
    const email = document.getElementById('email').value;
    const emailStatus = document.getElementById('emailStatus');

    emailjs.send("service_pIntegrador", "template_c8t6245", {
        to_email: email,
        message: "Link do site: https://projetoddsintegrador.github.io/IntegradorHorario/"
    }).then(response => {
        emailStatus.textContent = "E-mail enviado com sucesso!";
    }, error => {
        emailStatus.textContent = "Erro ao enviar o e-mail.";
    });
};

window.goBack = function () {
    window.history.back();
};

window.onload = loadSchedule;
