let [minutes, seconds] = [1,30];
let timer = document.querySelector('.timer');
let init = null;

let reponse = document.querySelector('.reponse');
let resultat = document.querySelector('.resultat');
let rejouer = document.querySelector('.rejouer');



const accueil = document.querySelector('.page-accueil');

accueil.addEventListener('click', () => {

    accueil.classList.add('disparait')

    if(init!==null){
        clearInterval(init);
    }
        
    init = setInterval(displayTimer,1000);

})


// pour recharger la page en cliquant (comme F5)
document.querySelector('.reponse').addEventListener('click', () => {

    location.reload()

})

////////

const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premierCarte, secondeCarte; 
let verouillage = false;
let nbCarteRetourne = 0;


cartes.forEach(carte => {

    carte.addEventListener('click', retourneCarte)

})

function retourneCarte(){

    if(verouillage) return;

    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee) {

        carteRetournee = true;
        premierCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    correspondance();
}


function correspondance() {

    if(premierCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        //
        nbCarteRetourne += 2;
        //
        premierCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        verouillage = true;
        setTimeout(() => {

            premierCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;

        }, 1000)
    }

}

function displayTimer(){

    seconds--;

    if(seconds < 0){
        seconds = 59;
        minutes--;
    }

    if(minutes < 0) {
        minutes = 1;
    }
        
        if(seconds == 0 && minutes == 0) {
            clearInterval(init);
        }

    let m = "0" + minutes ;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = ` ${m} : ${s} `;


    // pour arreter le compte à rebours et envoyer une anim si gagné ou perdu

    if(seconds == 30 && minutes == 0) {
        timer.style.color = "crimson";
    }

    if(seconds == 10 && minutes == 0) {
        timer.classList.add('pulse');
    }

    if(nbCarteRetourne == 20 && seconds >= 0 && minutes >= 0 ) {
    
        clearInterval(init);
        resultat.innerText = "Bravo, c'est gagné !"
        reponse.style.transform = "translateY(0)";
        reponse.style.background = "#263C3B";

    }
    
    if(nbCarteRetourne < 20 && seconds === 0 && minutes === 0 ) {

        clearInterval(init);
        resultat.innerText = "Dommage, c'est perdu !"
        rejouer.innerText = "Cliquer pour rejouer"
        reponse.style.transform = "translateY(0)";
        reponse.style.background = "#370703";

    }


}



// pour générer l'ordre des cartes aléatoirement
// on utilisant la propriété css order disponible dans grid

function aleatoire() {
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20 );
        card.style.order = randomPos;
    })
}

aleatoire();
