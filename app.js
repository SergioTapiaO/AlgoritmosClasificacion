"use strict"

var contenido = null;
var matriz = new Array();
var sol_lloyd = null;
var sol_kmedias = null;
// SACADO DEL ENUNCIADO 
var centros = new Array();
var inicializacion = new Array();
inicializacion[0] = new Array(4.6, 3.0, 4.0, 0.0);
inicializacion[1] = new Array(6.8, 3.4, 4.6, 0.7);
var ejemplo;

$(function(){
    leerFichero();

    $("#lloyd").on("click", lloyd);
    $("#kmedias").on("click", kmedias);

    leerFicheroEjemplo();
    $("#calcularLloyd").on("click", comprobar_ejemplo_lloyd);
    $("#calcularKmedias").on("click", comprobar_ejemplo_kmedias);
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

function leerFicheroEjemplo(){
  document.getElementById('ejemploLloyd').addEventListener('change', function() {
    var file = new FileReader();
    file.onload = () => {
      ejemplo = file.result;
      ejemplo = ejemplo.split(",");
    }
    file.readAsText(this.files[0]);
    
  });
}

function lloyd(){
    sol_lloyd = new Lloyd(matriz, inicializacion);
    sol_lloyd.calcular();
}

function kmedias(){
  sol_kmedias = new Kmedias(matriz, inicializacion);
  sol_kmedias.iniciar();
}

function comprobar_ejemplo_lloyd(){
  let num_clase = sol_lloyd.clasificar_ejemplo(ejemplo);
  $("#output1").text("El ejemplo pertenece a la clase "+ num_clase);
}

function comprobar_ejemplo_kmedias(){
  let num_clase = sol_kmedias.clasificar_ejemplo(ejemplo);
  $("#output1").text("El ejemplo pertenece a la clase "+ num_clase);
}