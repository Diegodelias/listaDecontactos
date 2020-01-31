//contructor listado

function Contactos(nombre, apellido, telefono){
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;

}

// contructo para la interface

function UI() {

    UI.prototype.agregarContactoLista = function(listaContactos){

        const lista = document.getElementById('lista-contactos');

        const fila = document.createElement('tr');

        fila.innerHTML = `
        <td>${listaContactos.nombre}</td>
        <td>${listaContactos.apellido}</td>
        <td>${listaContactos.telefono}</td>
        <td><a href="#" class="borrar">X</a></td>

        `;
    
        lista.appendChild(fila)

    }
    //mostrar alerta
    UI.prototype.mostrarAlerta = function(mensaje, nombreClase){

        const div = document.createElement('div');

        div.className = `alert ${nombreClase} `;

        div.appendChild(document.createTextNode(mensaje)) ;


        const contenedor = document.querySelector('.container');

        const formulario = document.querySelector('#form-contactos');

        contenedor.insertBefore(div, formulario);

        //
        setTimeout(function(){

            document.querySelector('.alert').remove();},3000);

        
    }

    UI.prototype.borrarContacto = function(target){

        if(target.className === 'borrar'){

                target.parentElement.parentElement.remove();

        }

    }


    UI.prototype.limpiarCampos = function(){

        document.getElementById('nombre').value =  '' ;
        document.getElementById('apellido').value =  '' ;
        document.getElementById('telefono').value =  '' ;
    }



}


//eVENT lISTENER

document.getElementById('form-contactos').addEventListener('submit', function(e){
    const nombre = document.getElementById('nombre').value,
        apellido = document.getElementById('apellido').value,
        telefono = document.getElementById('telefono').value

    const listaContactos = new Contactos(nombre,apellido,telefono);

    //instancia de la interface
    const ui = new UI();


    if (nombre ==='' || apellido === '' ||  telefono === '' ){

            ui.mostrarAlerta('Por favor llenar todos los campos', 'error')

    } else {


    ui.mostrarAlerta('Contacto agregado', 'success')
        
    ui.agregarContactoLista(listaContactos)

    ui.limpiarCampos();

    }


e.preventDefault();
});

//Event listener borrar contacto

document.getElementById('lista-contactos').addEventListener('click',function(e){

    const ui = new UI();

    ui.borrarContacto(e.target);

    ui.mostrarAlerta('Contacto eliminado' , 'success');

e.preventDefault();

});

