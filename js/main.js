
/* ********* */
/* VARIABLES */
/* ********* */

const video = document.querySelector(".vid-container video"); // (elemento video del HTML que pausaremos y haremos play)
const play = document.querySelector(".play-container img"); // (Boton del HTML para pausar/reporducir -> listener)
// const progressCircle ... // (svg del HTML circular o barra que iremos animando)
const timeDisplay = document.querySelector(".time-display"); // (contador del HTML que iremos descontando)
const timeSelect = document.querySelectorAll(".time-select button"); // (array de botones del HTML de seleccion de duracion)...

let duration = 600; // variable del JS para llevar el control de la duración de la meditación

/* ********* */
/* LISTENERS HANDLE EVENTS  */
/* ********* */

/* Play/pause */
// Este evento escucha el click en el botón play/pause 
// y activa/desactiva video, contador y círculo de progreso
play.addEventListener("click", function(){
    checkPlaying(video)
})

/* Time Select */
// Este evento escucha el selector de tiempo superior
// y modifica el tiempo de la meditación
timeSelect.forEach(button => {
    button.addEventListener("click", function(){
        // Tenemos que modificar la variable duration!!
        // ¿Cómo se el tiempo de cada botón?????
        duration = button.value;

        // Resetear valores (TODO: llevar a una función)
        video.currentTime = 0;
        play.src = "./assets/icons/play.svg";
        video.pause();
    })
});

// Listener que escucha cuando el video cambia el time
// Modifica contador y círculo!!
video.ontimeupdate = function(){
    
    // Necesitamos los minutos y segundos del contador!!!
    // Pues restamos a la duración de la meditación el tiempo del reproduccion de video
    let currentTime = video.currentTime;
    let timeToEnd = duration - currentTime;

    console.log("TimeToEnd sucio: ", timeToEnd)
    let minutes = Math.floor(timeToEnd/60);
    let seconds = Math.floor(timeToEnd%60);
    
    console.log("Minutos limpio: ", minutes)
    console.log("Segundos limpio: ", seconds)

    // Quiero el tiempo del contador descendiendo!!
    timeDisplay.textContent = `${minutes}:${seconds}`

    // Parar video cuando llega al final!!
    // Cuando el tiempo de rep. del video >= duración que quiere el usuario (duration)
    if(currentTime >= duration){
        video.pause();
        video.currentTime = 0;
        play.src = "./assets/icons/play.svg"
    }
}

/* ****** */
/* LÓGICA */
/* ****** */

// Trabajo sucio de activar/desactivar todo (contador, video, cículo)

function checkPlaying() {
    // Si está pausado activo todo -> video, contador descendente, cículo y cambiar icono a pause
    if(video.paused) {
        video.play();
        play.src = "./assets/icons/pause.svg"
    } else {
        video.pause();
        play.src = "./assets/icons/play.svg"
    }
    // Si está activo pauso todo -> video, contador, circulo y cambio icono
}
