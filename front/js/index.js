const $ = document
const contenido = $.querySelector('#contenido')

const newCard = ({nombre, descripcion, precio, imagen, id}) => {
    return `
            <div class="card" id=${id}>
            <img src=${imagen} class="imagen-curso u-full-width">
            <div class="info-card">
                <h4>${nombre}</h4>
                <p>${descripcion.slice(0,40)}...</p>
                <img src="img/estrellas.png">
                <p class="precio"><span class="u-pull-left">$${precio} MXN</span></p>
                <a href="#" class="u-full-width button-primary button input agregar-carrito" id=${id}>Agregar Al Carrito</a>
            </div>
    `
}

const renderCards = (array) => {
    contenido.innerHTML += '';
    array.map(item => {
        contenido.innerHTML += newCard(item);
    })
}

const handleDetailCard = (id) => {
    window.location = `./pages/detail.html?idproducto=${id}`;
}

// No funciona, no me da el id
// const addClickDetailCard = () => {
//     const cards = $.querySelectorAll('.card');
//     console.log(cards);
//     cards.forEach((card) => card.addEventListener('click', (evento) => {
//         handleDetailCard(evento.target.id)

//     }) )
// }


// Prueba, muestra el id en la url, pero el boton tambien activa el evento
// const addClickDetailCard = () => {
//     const cards = $.querySelectorAll('.card');
//     console.log(cards);
//     cards.forEach((card) => card.addEventListener('click', (evento) => {
//         // Aquí usamos closest para asegurarnos de que se obtiene el ID de la tarjeta
//         const cardId = evento.target.closest('.card').id;
//         handleDetailCard(cardId);
//     }));
// }

// Tercer intento: Ha funcionado correctamente.
const addClickDetailCard = () => {
    // Seleccionamos todas las imágenes de las tarjetas de producto
    const cardImages = $.querySelectorAll('.card .imagen-curso');
    
    // Añadimos un evento de clic a cada imagen
    cardImages.forEach((image) => image.addEventListener('click', (evento) => {
        // Prevenimos que el evento se propague a otros elementos de la tarjeta
        evento.stopPropagation();
        
        // Obtenemos el ID de la tarjeta usando closest para encontrar el contenedor más cercano con clase .card
        const cardId = evento.target.closest('.card').id;
        
        // Llamamos a la función handleDetailCard para redirigir
        handleDetailCard(cardId);
    }));
}



const getAll = async () => {
    try {
        const response = await fetch('http://localhost:4000/productos')
        
        if(response.status !== 200) throw new Error('Error en la solicitud')
        const data = await response.json();
        renderCards(data);
        
    } catch (error){
        alert('Error' + error)
    }
}

$.addEventListener('DOMContentLoaded', async () => {
    await getAll();
    addClickDetailCard();
})

