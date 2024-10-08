const {getFirestore, getDoc, getdocs, doc, updateDoc, arrayUnion} = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
import { db } from "./acessarDB.js";

(function(){
    emailjs.init("15D62CWo0w5pPKA2g");
})();

const diasSemana = ['segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];
const aulas = ["aula 1", "aula 2", "aula 3", "aula 4", "aula 5"];

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

async function carregartabela() {

    const scheduleTable = document.getElementById('scheduleTable');
    
    //preenche a tabela
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        
        // Adiciona o nome do dia da semana na primeira célula
        const dayCell = document.createElement('td');
        dayCell.textContent = diasSemana[i];
        row.appendChild(dayCell);
    
        // Adiciona as matérias à linha
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            
            const dadosAula = await obterAula(diasSemana[i], aulas[j]);
            if (dadosAula) {
        
                // Exibe a matéria e adiciona a função de edição ao clique
                cell.textContent = dadosAula.materia;
                cell.onclick = () => editSubject(diasSemana[i], aulas[j],dadosAula);
    
            } else {
                // Adiciona uma célula vazia se não houver matéria
                cell.textContent = '';
            }
            row.appendChild(cell);
        }
    
        // Adiciona a linha à tabela
        scheduleTable.appendChild(row);
    }
};

carregartabela();

window.editSubject = function (dia, aula,dadosAula) {

    console.log(dadosAula);
      
    console.log('Editando aula:', aula, 'do dia:', dia);
    const modal = document.getElementById('editModal');
    const editDay = document.getElementById('edit-day');
    const editSubject = document.getElementById('edit-subject');
    const editProfessor = document.getElementById('edit-professor');
    const editRoom = document.getElementById('edit-room');
    const editHours = document.getElementById('edit-hours');
    const editMinutes = document.getElementById('edit-minutes');
    const editType = document.getElementById('edit-type');

    const subject = dadosAula;
    

    if (!subject) return;

    editDay.value = dia;
    editSubject.innerHTML = '';
    const subjects = ['MATEMÁTICA', 'PORTUGUÊS', 'HISTÓRIA', 'GEOGRAFIA', 'ARTES', 'QUÍMICA', 'TECNOLOGIA', 'PROJETO DE VIDA', 'SOCIOLOGIA','FILOSOFIA', 'FRANCÊS','INGLÊS','BIOLOGIA','FÍSICA'];
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
    editRoom.value = subject.sala;
    const duration = subject.duracao;
    editHours.value = Math.floor(duration / 60);
    editMinutes.value = duration % 60;
    editType.value = subject.tipo;

    modal.style.display = 'flex';

    window. saveEdit = function() {
        const dia = document.getElementById('edit-day').value;
        const materia = document.getElementById('edit-subject').value;
        const professor = document.getElementById('edit-professor').value;
        const sala = document.getElementById('edit-room').value;
        const hours = parseInt(document.getElementById('edit-hours').value);
        const minutes = parseInt(document.getElementById('edit-minutes').value);
        const tipo = document.getElementById('edit-type').value;
        const duracao = (hours * 60) + minutes;
    
        const aulaclicada = {};
        
        if (aulaclicada) {
            aulaclicada.materia = materia;
            aulaclicada.professor = professor;
            aulaclicada.sala = sala;
            aulaclicada.duracao = duracao;
            aulaclicada.tipo = tipo;
        } else {
            
        }
        async function atualizarDocumento() {
            const docRef = doc(db, dia, aula);
            try {
              await updateDoc(docRef, {
                materia: aulaclicada.materia,
                professor: aulaclicada.professor,
                sala: aulaclicada.sala,
                tipo: aulaclicada.tipo,
                "duração": aulaclicada.duracao
              });
              console.log('Documento atualizado com sucesso!');
            } catch (e) {
              console.error('Erro ao atualizar o documento: ', e);
            }
        }
        atualizarDocumento();

        closeEditModal();
    
        showSavingAnimation();   
        
        
    };
    
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

window.sendMessage = async function() {
    const docRef = doc(db, "Emails", "Matutino");
    const docSnap = await getDoc(docRef);
    let emails;

    if (docSnap.exists()) {
        const data = docSnap.data();
        emails = data.emails; // Supondo que o campo emails é um array dentro do documento
        
        if (!emails || emails.length === 0) {
            console.log("Nenhum email encontrado no documento.");
            return; // Se não houver emails, interrompe a função
        }
    } else {
        console.log("Erro: Documento não encontrado.");
        return; // Se o documento não existir, interrompe a função
    }

    // Lógica para criar a mensagem
    let message = document.getElementById('automaticMessage').value;
    if (message === "") {
        message = "Link do site: https://jaonike.github.io/Projeto-Integrador/";
    } else {
        message += " Link do site: https://jaonike.github.io/Projeto-Integrador/";
    }
    
    const emailStatus = document.getElementById('emailStatus');
    
    // Envia o email para cada endereço no array de emails
    for (let E of emails) {
        if(E === ""){
            console.log("Email vazio");
        } else{
            console.log("Enviando email para:", E);
            
            emailjs.send("service_crono","template_thlnpd7",{
                to_email: E,
                message: message
            }).then(response => {
                emailStatus.textContent = "E-mail enviado com sucesso!";
            }, error => {
                emailStatus.textContent = "Erro ao enviar o e-mail.";
                console.error("Erro ao enviar o e-mail:", error);
            });
        }

    }

    console.log("Mensagens enviadas.");
};

async function addEmail(emailnovo) {
    try {
      // Referência ao documento "Matutino" dentro da coleção "Emails"
      const docRef = doc(db, "Emails", "Matutino");
  
      // Adicionar o novo email usando arrayUnion para não sobrescrever o array existente
      await updateDoc(docRef, {
        emails: arrayUnion(emailnovo)
      });
  
      console.log("Email adicionado com sucesso");
    } catch (e) {
      console.error("Erro ao adicionar o email: ", e);
    }
}

window.sendEmail = function () {
    const email = document.getElementById('email').value;
    const emailStatus = document.getElementById('emailStatus');
    if (email === ""){
        emailStatus.textContent = "O E-mail não pode estar vazio!.";
        
    }else{
        addEmail(email);  
        emailjs.send("service_crono","template_thlnpd7", {
            to_email: email,
            message: "Link do site: https://jaonike.github.io/Projeto-Integrador/"
        }).then(response => {
            emailStatus.textContent = "E-mail enviado com sucesso!";
        }, error => {
            emailStatus.textContent = "Erro ao enviar o e-mail.";
        });
    }
    
};

window.goBack = function () {
    window.history.back();
};
