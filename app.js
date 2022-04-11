"use strict"

var contenido = null;
var matriz = new Array();
// SACADO DEL ENUNCIADO 
var centros = new Array();
inicializacion[0] = new Array(4.6, 3.0, 4.0, 0.0);
inicializacion[1] = new Array(6.8, 3.4, 4.6, 0.7);

$(function(){
    leerFichero();

    $("#lloyd").on("click", lloyd);
})

function leerFichero(){
    document.getElementById('contenido').addEventListener('change', function() {
        var file = new FileReader();
        file.onload = () => {
          contenido = file.result;
         let lineas = contenido.split("\r\n");
         lineas.forEach(linea => {
            matriz.push(linea.split(","));
          });
        }
        file.readAsText(this.files[0]);
        
      });
}

function lloyd(){
    let sol_lloyd = new Lloyd(matriz, inicializacion);
}