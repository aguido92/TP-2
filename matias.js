/*document.addEventListener("DOMContentLoaded", empezar);
function empezar() { }*/

'use strict';
let main = document.getElementById('main');
let server = 'http://web-unicen.herokuapp.com/api/groups/';
let url = server+'PocaiMatias82/practica5';
cargarPortada();
function cargarPortada() {    
    fetch('htmls/portada.html')
    .then(r => r.text())
    .then(html => main.innerHTML = html)
    .catch(error => main.innerHTML= 'Error en el proceso')
}

document.getElementsByClassName('link-barra')[0].addEventListener('click', cargarPortada);
document.getElementsByClassName('link-barra')[1].addEventListener('click', cargarContacto);
function cargarContacto() {
    fetch('htmls/contacto.html')
    .then(r => r.text())
    .then(html => main.innerHTML = html)
    .catch(error => main.innerHTML = 'Error en el proceso.')
}

document.getElementsByClassName('link-barra')[2].addEventListener('click', function(){
    cargarDivDeTabla();
    traerInsertarJsonDeTabla();
});
 
function cargarDivDeTabla() {
    fetch('htmls/tabla.html')
    .then(r => r.text())
    .then(html => main.innerHTML = html)
    .catch(error => main.innerHTML= 'Error en el proceso.')
}

function traerInsertarJsonDeTabla() {
    fetch(url)
        .then(r => r.json())
        .then(json => insertarDatosTablaEnHtml(json))
        .catch(error => 'Error en la operación.')       
} 

function insertarDatosTablaEnHtml(json) {
    let conteTabla = document.getElementById('divTab'); 
    let html = '<table>';
    html += '<thead><th>Personaje</th><th>Arma principal</th></thead>';
    for (let i=0; i<json.practica3[0].thing.length; i++) {
        let personaje = json.practica3[0].thing[i].personaje;
        let arma = json.practica3[0].thing[i].arma;
        html+='<tr><td>'+personaje+'</td><td>'+arma+'</td></tr>';        
    } 
    html += '</table>'; 
    html += '<input type="text" id="input-perso" placeholder="Agregar personaje"  value="">';
    html += '<input type="text" id="input-arma" name="Arma" placeholder="Agregar arma">';
    html += '<button id="btn-enviar">Enviar</button>';
    html += '<div id="mensaje"></div>';
    conteTabla.innerHTML += html; 
    chequearTabla();
    
}

function chequearTabla() {
    document.getElementById('btn-enviar').addEventListener('click', agarrarDatos);
    function agarrarDatos(){
        let val_personaje=document.getElementById('input-perso').value;
        let val_arma=document.getElementById('input-arma').value;
        let mensaje = document.getElementById('mensaje');
        if (!(val_personaje==='' || val_arma==='')){
            mensaje.innerHTML='<h4>Agregó a '+val_personaje+', con su arma '+val_arma+'.</h4>';
        } else {
            mensaje.innerHTML='<h4>Agregar tanto personaje como arma, gracias.</h4>';
            editarJson(val_personaje, val_arma);
        }
    }
}


//no funciona aun 
function traerJson() {
    let ide = '5b785a5d1416ee04007f57bf';
    fetch(url+ide, {
        method:'GET',
        headers: {'Content-Type':'application/json'}
    }) 
    .then(r => r.json())
    .then(json => console.log(json))
    .catch(error => 'Error en el proceso')
}
accionarPost();
function accionarPost() {
    let val_personaje=document.getElementById('input-perso').value;
    let val_arma=document.getElementById('input-arma').value;
    
    let data = {
        "personaje": val_personaje,
        "arma": val_arma        
    }

    let objeto = {
        "thing": data
    }

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    })
    .then(r => r.json())
    .then(json => json.stringify(objeto)
    .catch(error => 'error')
