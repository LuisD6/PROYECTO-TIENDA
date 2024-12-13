
//Variables
const carrito = document.querySelector('#carrito');
const contenerdorCarrito = document.querySelector('#lista-carrito tbody');
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);


    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los curso del localStorage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar carrito
    vaciaCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el array

        limpiarHMTL(); //Eliminamos todo el HTML
    })

}

//Function
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

    
}

function eliminarCurso(e) {

    e.preventDefault();
 
    if(e.target.classList.contains("borrar-curso")){
 
        const id = e.target.getAttribute("id");
 
        const existe = articulosCarrito.some( curso => curso.id === id && curso.cantidad > 1 );
 
        if(existe){
            const cursos = articulosCarrito.map( curso => {
                if(curso.id === id){
                    curso.cantidad--;
                    return curso;
                }else{
                    return curso;
                }
            });
            articulosCarrito=[...cursos];
        }else{  
            articulosCarrito= articulosCarrito.filter(curso => curso.id !== id);
        }

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }

}


// Lee el contenido del HTML al que le dimos click y extrae la información del curso

function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const inforCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === inforCurso.id);
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === inforCurso.id){
                curso.cantidad++;
                return curso; // Retonar el objeto actualizado
            }else{
                return curso; // Retorna los objetos que no son los duplicados.
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        // Agregar elementos a articulosCarrito
        articulosCarrito = [...articulosCarrito, inforCurso];
    }



    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHMTL();

    // Recorre el carrito y genera el HMTL
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" id="${ id}"> X </a>
            </td>
        `

            // Agrega el HTML del carrito en el tbody
        contenerdorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al localStorage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHMTL (){
    // Forma lenta
    contenerdorCarrito.innerHTML = '';

     while(contenerdorCarrito.firstChild) {
        contenerdorCarrito.removeChild(contenerdorCarrito.firstChild)
     }
}