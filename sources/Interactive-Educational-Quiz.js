
let elencoDomande = [];
let indiceDomandaCorrente = 0;
let domandaAttuale = null;   
let DOMANDE_INLINE = [
  {
    "id": 1,
    "categoria": "La Ciurma",
    "domanda": "Qual è il nome del cuoco della ciurma di Cappello di Paglia?",
    "opzioni": ["Sanji", "Gin", "Chef Boyardee", "Donut-kun"],
    "rispostaCorretta": 0
  },
  {
    "id": 2,
    "categoria": "La Ciurma",
    "domanda": "Qual è il sogno di Roronoa Zoro?",
    "opzioni": ["Diventare il più forte spadaccino del mondo", "Aprire una palestra di spade per bambini",
     "Trovare la mappa per non perdersi mai", "Sconfiggere tutti i cuochi del mondo"],
    "rispostaCorretta": 0
  },
    {
    "id": 3,
    "categoria": "La Ciurma",
    "domanda": "Qual è il vero nome di Nico Robin?",
    "opzioni": ["Nico Olivia", "Nico Robin", "Miss All Sunday", "Robin-chwan Deluxe Edition"],
    "rispostaCorretta": 1
  },
    {
    "id": 4,
    "categoria": "Il Mondo",
    "domanda": "Chi era il Re dei Pirati prima dell’inizio della storia?",
    "opzioni": ["Gol D. Roger", "Monkey D. Dragon", "Edward Newgate", "Mario D. Plumber"],
    "rispostaCorretta": 0
  },
    {
    "id": 5,
    "categoria": "Il Mondo",
    "domanda": "Come si chiama la nave di Rufy all’inizio della saga?",
    "opzioni": ["Thousand Sunny", "Going Merry", "Red Line Express", "Barca Gonfiabile di Shanks"],
    "rispostaCorretta": 1
  },
    {
    "id": 6,
    "categoria": "Poteri e Combattimenti",
    "domanda": "Quale di questi NON è uno dei tre tipi di Haki?",
    "opzioni": ["Kenbunshoku", "Busoshoku", "Hokus Pokus", "Haoshoku"],
    "rispostaCorretta": 2
  },
    {
    "id": 7,
    "categoria": "Poteri e Combattimenti",
    "domanda": "Che tipo di Frutto del Diavolo ha mangiato Rufy?",
    "opzioni": ["Frutto Gommoso al gusto fragola", "Logia", "Zoan", "Paramisha (Paramecia)"],
    "rispostaCorretta": 3
  },
    {
    "id": 8,
    "categoria": "Poteri e Combattimenti",
    "domanda": "Chi ha inflitto la cicatrice sul petto di Rufy?",
    "opzioni": ["Akainu", "Un gatto troppo aggressivo", "Barbanera", "Crocodile"],
    "rispostaCorretta": 0
  },
    {
    "id": 9,
    "categoria": "Misteri e Temi Profondi",
    "domanda": "Cosa rappresenta la “Volontà della D.”?",
    "opzioni": ["Un’eredità misteriosa che sfida il destino", "Un clan segreto di dentisti", 
    "Una marca di ramen leggendaria", "Un errore di battitura diventato canon"],
    "rispostaCorretta": 0
  },
    {
    "id": 10,
    "categoria": "Misteri e Temi Profondi",
    "domanda": "Qual è il vero sogno di Monkey D. Rufy, oltre a diventare Re dei Pirati?",
    "opzioni": ["Mangiare gratis per sempre", "Costringere tutti a ridere come lui", "Distruggere la Marina a pugni",
     "Avere la massima libertà del mondo"],
    "rispostaCorretta": 3
  }
];

function Init(){
    let mainIniziale = document.createElement("div");
    mainIniziale.id = "landing";
    let benvenuti = document.createElement("h1");
    let regole = document.createElement("ul");
    let regola = document.createElement("li");
    let bottoneInizio = document.createElement("button");

    benvenuti.innerHTML = `Benvenuti al quiz a premi<br>di One Piece!`;
    regole.innerHTML = `Le regole sono semplici:`;
    regola.innerHTML = `30 secondi per ogni domanda<br>1 sola risposta corretta<br>4 categorie in cui primeggiare!`;
    bottoneInizio.innerText = "PARTIAMO!";
    bottoneInizio.onclick = () => CaricaDomande(mainIniziale);

    document.getElementById("main").appendChild(mainIniziale);
    mainIniziale.appendChild(benvenuti);
    mainIniziale.appendChild(regole);
    mainIniziale.appendChild(regola);
    document.getElementById("footer").appendChild(bottoneInizio);
}

async function CaricaDomande(mainIniziale){
    try {
        // Prova fetch (funziona su server / GitHub Pages)
        const risposta = await fetch('domande.json');
        if (!risposta.ok) {
            throw new Error('errore caricamento json');
        }
        elencoDomande = await risposta.json();
    } catch (errore) {
        // Fallback: domande inline (funziona su file:// locale)
        console.warn("Fetch non disponibile, uso domande inline:", errore);
        elencoDomande = DOMANDE_INLINE;
    }
    DomandaUno(mainIniziale);
}

function DomandaUno(mainIniziale){
    if (elencoDomande.length === 0) return;

    domandaAttuale = elencoDomande[indiceDomandaCorrente]; // usa la globale
    mainIniziale.innerHTML = "";
    document.getElementById("footer").innerHTML = "";

    // Aggiorna aside
    const statDomanda = document.getElementById("stat-domanda");
    if (statDomanda) statDomanda.textContent = `Domanda: ${indiceDomandaCorrente + 1} / ${elencoDomande.length}`;
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) progressFill.style.width = `${(indiceDomandaCorrente / elencoDomande.length) * 100}%`;

    let quesito = document.createElement("form");
    quesito.id = "quesito";
    let domandaInCorso = document.createElement("h2");
    domandaInCorso.innerText = `Domanda ${indiceDomandaCorrente + 1}: ${domandaAttuale.domanda}`;
    quesito.appendChild(domandaInCorso);

    domandaAttuale.opzioni.forEach((alternative, indice) => {
        let inpOpzione = document.createElement("input");  
        let labOpzione = document.createElement("label");  

        inpOpzione.type = "radio";
        inpOpzione.name = "risposta";                       
        inpOpzione.id = `opzione-${indice}`;
        inpOpzione.value = indice;

        labOpzione.htmlFor = `opzione-${indice}`;           
        labOpzione.innerHTML = `${alternative}`;

        inpOpzione.onclick = () => ControllaRisposta(indice, domandaAttuale, mainIniziale);

        quesito.appendChild(inpOpzione);
        quesito.appendChild(labOpzione);
    });

    mainIniziale.appendChild(quesito);
}

function ControllaRisposta(indice, domandaAttuale, mainIniziale){
    
    const footer = document.getElementById("footer");

    const radios = document.querySelectorAll('input[name="risposta"]');
    radios.forEach(r => r.disabled = true);

    if (indice === domandaAttuale.rispostaCorretta){
        footer.innerHTML = `<span class="feedback corretto">Risposta corretta!</span>`;
    } else {
        const rispostaGiusta = domandaAttuale.opzioni[domandaAttuale.rispostaCorretta];
        footer.innerHTML = `<span class="feedback sbagliato">Risposta sbagliata! La risposta corretta era: <strong>${rispostaGiusta}</strong></span>`;
    }

    setTimeout(() => {
        if (indiceDomandaCorrente < elencoDomande.length - 1) {
            indiceDomandaCorrente++;
            DomandaUno(mainIniziale);
        } else {
            mainIniziale.innerHTML = "<h2>HAI FINITO!</h2><p>Complimenti, hai risposto a tutte le domande!</p>";
            document.getElementById("footer").innerHTML = "";
            const progressFill = document.getElementById("progress-fill");
            if (progressFill) progressFill.style.width = "100%";
        }
    }, 800);
}
