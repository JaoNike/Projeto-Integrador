const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js');
const {getFirestore, getDoc, getdocs, doc, updateDoc, deleteDoc} = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');

// Configura o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5EV2ZmsAXbQ0b4UxhQCyRH83Z0nAcrFw",
    authDomain: "integradorhorarios.firebaseapp.com",
    projectId: "integradorhorarios",
    storageBucket: "integradorhorarios.appspot.com",
    messagingSenderId: "607685995716",
    appId: "1:607685995716:web:88bf32fe4e3aaf820aad91",
    measurementId: "G-QDZVL5H5ZJ"
};     

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Função para buscar dados de uma aula específica de um dia da semana
async function obterAula(diaSemana, aula) {
    const docRef = doc(db, diaSemana, aula);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        
        return docSnap.data();
        
    } else {
        console.log(`Nenhum documento encontrado para ${diaSemana} - ${aula}!`);
        return null;
    }
}

export const horarioAulas = [
        {
            horario: "07:00 - 07:45",
            segunda: {},
            terca: {},
            quarta: {},
            quinta: {},
            sexta: {}
        },
        {
            horario: "07:45 - 08:30",
            segunda: {},
            terca: {},
            quarta: {},
            quinta: {},
            sexta: {}
        },
        {
            horario: "08:30 - 09:15",
            segunda: {},
            terca: {},
            quarta: {},
            quinta: {},
            sexta: {}
        },
        {
            horario: "09:15 - 10:00",
            segunda: {},
            terca: {},
            quarta: {},
            quinta: {},
            sexta: {}
        },
        {
            horario: "10:00 - 10:45",
            segunda: {},
            terca: {},
            quarta: {},
            quinta: {},
            sexta: {}
        }
    ];

    const diasSemana = ["segunda-feira", "terca-feira", "quarta-feira", "quinta-feira", "sexta-feira"];
    const aulas = ["aula 1", "aula 2", "aula 3", "aula 4", "aula 5"];

    for (let i = 0; i < horarioAulas.length; i++) {
        for (let j = 0; j < diasSemana.length; j++) {
            const dadosAula = await obterAula(diasSemana[j], aulas[i]);
            if (dadosAula) {
                horarioAulas[i][diasSemana[j].replace("-feira", "")] = {
                    disciplina: dadosAula.materia,
                    professor: dadosAula.professor,
                    sala: `Sala ${dadosAula.sala}`,
                    tipo: dadosAula.tipo,
                    //não era pra funcionar assim com 'ç' e 'ã' 
                    duração: dadosAula.duração
                };
            }
        }
    }