let $primerCuadro = null;
const $tablero = document.querySelector('#tableroJuego');
const $cuadros = $tablero.querySelectorAll('.cuadro');
let colores = ['rojo', 'azul', 'blanco', 'negro', 'verde', 'amarillo']
let coloresDuplicados = colores.concat(colores);
let turnos = 0;
const $mensajeFin = document.querySelector('#mensajeFin')
aleatorizarCuadros($cuadros, coloresDuplicados);

function aleatorizarCuadros (cuadros, colores){
    let arrayRandom = colores.sort(function() {
        return 0.5 - Math.random()});

    arrayRandom.forEach(function(color, indice) {
        $cuadros[indice].classList.add(color);
    });
}

function manejarEventos ($tablero){
    $tablero.onclick = function (e){
        const $elemento = e.target;
        if($elemento.classList.contains('cuadro')){
            manejarClick($elemento)
        }
    };
    
}

function manejarClick(elemento){

    mostrarCuadroSeleccionado(elemento);

    if($primerCuadro === null){
        $primerCuadro = elemento;
    } else {
        if($primerCuadro === elemento){
            return;
        }
        turnos++;

        if(cuadrosIguales($primerCuadro, elemento)){
            eliminarCuadro($primerCuadro);
            eliminarCuadro(elemento);
        } else {
            ocultarCuadro($primerCuadro);
            ocultarCuadro(elemento);
        }
        $primerCuadro = null;
    }   
}


function mostrarCuadroSeleccionado(elemento){
    elemento.style.opacity = 1;
}

function cuadrosIguales(cuadro1, cuadro2){
    return cuadro1.className === cuadro2.className;
}

function eliminarCuadro(cuadro){
    setTimeout(function(){
        cuadro.parentElement.classList.add('exito');
        cuadro.remove();
        controlarJuego();
    }, 500)
   
}

function ocultarCuadro(cuadro){
    setTimeout(function(){
        cuadro.style.opacity = '0';
    }, 500)
}

function controlarJuego(){
    if(document.querySelectorAll('.cuadro').length === 0){
        $tablero.className = 'oculto';
        $mensajeFin.classList.remove('oculto');
        document.querySelector('#turnos').textContent = turnos;
    }
}