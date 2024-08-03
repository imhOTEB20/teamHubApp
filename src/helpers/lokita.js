/*ME ENCANTA LOKITA*/
const meEncantaLokita1=document.querySelector(".label-me-encanta").classList.add("btn-mel-1");
const lblMeEncantaLokita1=document.querySelector(".btn-mel-1");
const btnMeEncantaLokita1=lblMeEncantaLokita1.querySelector(".fa-heart");

btnMeEncantaLokita1.addEventListener("click",()=>{
    btnMeEncantaLokita1.classList.toggle("lokita");
});