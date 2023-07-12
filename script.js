// YOSE SOTOMAYOR

// VARIABLES
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivo = null;

// QUERIES
let mostrarAciertos = document.getElementById("aciertos");
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarTiempo = document.getElementById("tiempo");
let mostrarTitulo = document.getElementById("titulo");
let reiniciar = document.getElementById("reiniciar");

// SONIDOS
var acierto = new Audio("./media/acierto.mp3");
var success = new Audio("./media/success.mp3");
var clock = new Audio("./media/clock.mp3");
var start = new Audio("./media/start.mp3");
var select = new Audio("./media/selectR.mp3");
var fail = new Audio("./media/fail.mp3");

// CONSTANTES
const TIMER_INICIAL = timer;
const NUM_TARJETAS = 16;

numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});

// FUNCIONES
function bloquearTarjetas() {
  for (let i = 0; i < NUM_TARJETAS; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}

function setTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    clock.play();
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      mostrarTitulo.innerHTML = "Perdiste :(";
      fail.play();
      clock.pause();
    }
  }, 1000);
}

// FUNCION PRINCIPAL
function desplegar(id) {
  select.play();
  if (temporizador !== true) {
    setTiempo();
    start.play();
    temporizador = true;
  }
  tarjetasDestapadas++;
  if (tarjetasDestapadas === 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    if (primerResultado == segundoResultado) {
      tarjetasDestapadas = 0;
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}/8`;
      acierto.play();
      if (aciertos === 8) {
        mostrarTitulo.innerHTML = "Ganaste :)";
        clearInterval(tiempoRegresivo);
        success.play();
        clock.pause();
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 400);
    }
  }
  reiniciar.addEventListener("click", () => {
    location.reload();
  });
}

