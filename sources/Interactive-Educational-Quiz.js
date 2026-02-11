function Init(){
    //creazione della landing page iniziale
    let mainIniziale=document.createElement("div");
    let benvenuti=document.createElement("h1");
    let regole=document.createElement("ul");
    let regola=document.createElement("li");
    let bottoneInizio=document.createElement("button")
    benvenuti.innerHTML+=`Benvenuti al quiz a premi<br>di One Piece!`;
    regole.innerHTML=`Le regole sono semplici:`;
    regola.innerHTML=`30 secondi per ogni domanda<br>1 sola risposta corretta<br>4 categorie in cui primeggiare!`;
    bottoneInizio.innerText="PARTIAMO!";
    bottoneInizio.onclick = () => CaricaDomande(mainIniziale); // la arrow mi permette di non far andare subito la funzione, 
    // ma di aspettare che sia chiamata dall'onclick
    document.getElementById("main").appendChild(mainIniziale);
    mainIniziale.appendChild(benvenuti);
    mainIniziale.appendChild(regole);
    mainIniziale.appendChild(regola);
    document.getElementById("footer").appendChild(bottoneInizio);
}
let elencoDomande=[];
let indiceDomandaCorrente=0;

async function CaricaDomande(mainIniziale){
    try{
        //fetch('domande.json'): manda una richiesta HTTP per cercare il file
        //await: aspetta che il file arrivi 
        const risposta= await fetch('domande.json');
        if(!risposta.ok){
            throw new Error('errore caricamento json');
        }
        //.json: la risposta arriva come testo, questo comando lo traduce in array e oggetti 
        let dati=await risposta.json();
        elencoDomande=dati;
        
    } catch (errore) {
        console.error("C'è stato un problema:", errore);
        document.getElementById('main').innerText = "Impossibile caricare il quiz.";
    }
    DomandaUno(mainIniziale);
};

function DomandaUno(mainIniziale){

    //controllo di sicurezza: ci sono domande?
    if (elencoDomande.length === 0) return;
    domandaAttuale = elencoDomande[indiceDomandaCorrente];
    mainIniziale.innerHTML="";
    document.getElementById("footer").innerHTML="";
    
    //Prendi la prima domanda!
    let quesito=document.createElement("form");
    let domandaInCorso=document.createElement("h2");

    domandaInCorso.innerText=`Domanda ${indiceDomandaCorrente + 1}: ${domandaAttuale.domanda}`;
    
    quesito.appendChild(domandaInCorso);
    domandaAttuale.opzioni.forEach((alternative, indice) => {
        inpOpzione=document.createElement("input");
        labOpzione=document.createElement("label");
        labOpzione.for=`opzione-${indice}`;
        inpOpzione.type = "radio";
        inpOpzione.id=`opzione-${indice}`;
        labOpzione.innerHTML=`${alternative}<br>`;
        inpOpzione.onclick = () => ControllaRisposta(indice, domandaAttuale, mainIniziale); //per eseguire la function all'onclick , non subito
        quesito.appendChild(inpOpzione);
        quesito.appendChild(labOpzione);
    });
    mainIniziale.appendChild(quesito);
    
}

function ControllaRisposta(indice, domandaAttuale, mainIniziale){
    if (indice===domandaAttuale.rispostaCorretta){
        console.log("RISPOSTA CORRETTA");
    } else {
        document.getElementById("footer").innerHTML="risposta sbagliata!";
    }
    if (indiceDomandaCorrente<9) {
        indiceDomandaCorrente++;
        DomandaUno(mainIniziale);        
    } else {
        mainIniziale.innerHTML="<h2>HAI FINITO</h2>"
    }


}