class Contactos {
    constructor(nombre,apellido,telefono){
        this.nombre = nombre;
        this.apellido= apellido;
        this.telefono = telefono;

    }

}

class UI {

    agregarContactoLista(listaContactos){
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

    mostrarAlerta(mensaje, nombreClase){
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

    borrarContacto(target){

        if(target.className === 'borrar'){

            target.parentElement.parentElement.remove();

    }


    }

    limpiarCampos(){


        document.getElementById('nombre').value =  '' ;
        document.getElementById('apellido').value =  '' ;
        document.getElementById('telefono').value =  '' ;
    }


}

class Store {

  static obtenerContacto(){

    let contactos;
    if(localStorage.getItem('contactos') === null){
      contactos = [];


    } else {
        
        contactos = JSON.parse(localStorage.getItem('contactos'));
    }

    return contactos;
    }

  static  MostarContacto(){
    const contactos = Store.obtenerContacto();
    contactos.forEach(function(cont){
        const ui = new UI;
        ui.agregarContactoLista(cont);



    });

    }

   static AgregarContacto(contacto){

    const contactos = Store.obtenerContacto();
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    }

  static  borrarContacto(id){
 
    const contactos = Store.obtenerContacto();
    contactos.forEach(function(cont,index){
      if(cont.telefono == id){
          contactos.splice(index,1);


      }



    });

    localStorage.setItem('contactos', JSON.stringify(contactos));

    }

}

/**Event listner carga dom */


document.addEventListener('DOMContentLoaded', Store.MostarContacto);

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

        Store.AgregarContacto(listaContactos);

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

    Store.borrarContacto(e.target.parentElement.previousElementSibling.textContent);

    ui.mostrarAlerta('Contacto eliminado' , 'success');

e.preventDefault();

});

