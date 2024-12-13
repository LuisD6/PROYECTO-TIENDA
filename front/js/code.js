// Variables
const url = 'http://localhost:4000/productos/';
const contenedor = document.querySelector('tbody');
const resetButton = document.getElementById("resetForm");
const form = document.querySelector('form');
const btnCrear = document.getElementById("btnCrear");
const modalArticulo = new bootstrap.Modal(document.getElementById("modalArticulo"));
let resultados = '';
let opcion = '';
let idForm = 0;

// Función para reiniciar el formulario
const resetFormulario = () => {
    if (form) {
        form.reset();
    } else {
        console.error('Formulario no encontrado');
    }
};

// Función para manejar el envío del formulario
const enviarFormulario = async (e) => {
    e.preventDefault();

    const formData = new FormData(form); // Capturar datos, incluidos archivos
    const metodo = opcion === 'crear' ? 'POST' : 'PUT';
    const endpoint = opcion === 'crear' ? url : `${url}${idForm}`;

    try {
        const response = await fetch(endpoint, {
            method: metodo,
            body: formData, // FormData en lugar de JSON
        });

        const data = await response.json();

        if (data.mensaje) {
            alertify.error(data.mensaje);
        } else {
            alertify.success(`Producto ${opcion === 'crear' ? 'creado' : 'editado'} con éxito`);
            resetFormulario();
            obtenerProductos();
            modalArticulo.hide();
        }
    } catch (err) {
        alertify.error(`Error: ${err.message}`);
        console.error(err);
    }
};

// Función para mostrar los resultados en la tabla
const mostrar = (articulos) => {
    if (!contenedor) {
        console.error('Contenedor de tabla no encontrado');
        return;
    }

    resultados = '';
    articulos.forEach(articulo => {
        resultados += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.stock}</td>
                <td>${articulo.categoria}</td>
                <td>${articulo.imagen ? `<img src="http://127.0.0.1:5500/front/${articulo.imagen}" alt="Imagen" width="50">` : 'Sin imagen'}</td>
                <td class="text-center">
                    <button class="btnEditar btn btn-primary">Editar</button>
                    <button class="btnBorrar btn btn-danger">Borrar</button>
                </td>
            </tr>
        `;
    });
    contenedor.innerHTML = resultados;
};

// Función para obtener y mostrar los productos
const obtenerProductos = () => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => mostrar(data))
        .catch(error => console.error('Error en fetch:', error));
};

// Asignar eventos
if (resetButton) {
    resetButton.addEventListener("click", resetFormulario);
}

if (form) {
    form.addEventListener('submit', enviarFormulario);
}

if (btnCrear) {
    btnCrear.addEventListener('click', () => {
        resetFormulario();
        modalArticulo.show();
        opcion = 'crear';
    });
}

// Obtener y mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});

// Delegación de eventos
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Procedimiento para borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm("¿Estás seguro de que deseas eliminar este artículo?",
        function () {
            fetch(`${url}${id}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error en la solicitud');
                }
                return res.json();
            })
            .then(() => {
                obtenerProductos();
                alertify.success('Artículo eliminado');
            })
            .catch(error => {
                alertify.error(`Error al eliminar: ${error.message}`);
            });
        },
        function () {
            alertify.error('Cancelado');
        }
    );
});

// Procedimiento para editar
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[1].innerHTML;
    const descripcionForm = fila.children[2].innerHTML;
    const precioForm = fila.children[3].innerHTML;
    const stockForm = fila.children[4].innerHTML;
    const categoriaForm = fila.children[5].innerHTML;

    form.id.value = idForm;
    form.nombre.value = nombreForm;
    form.descripcion.value = descripcionForm;
    form.precio.value = precioForm;
    form.stock.value = stockForm;
    form.categoria.value = categoriaForm;

    opcion = 'editar';
    modalArticulo.show();
});
