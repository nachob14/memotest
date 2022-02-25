let $botonJugar = document.querySelector('#botonJugar');

$botonJugar.onclick = function (){
    setTimeout(function(){
    document.querySelector('#tableroJuego').classList.remove('oculto'),
    document.querySelector('#cartelBienvenida').classList.add('oculto'),
    //aleatorizarCuadros($cuadros, coloresDuplicados),
    manejarEventos($tablero)}, 200);
    
}
