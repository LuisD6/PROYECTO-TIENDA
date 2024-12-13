
# Proyecto Carrito de Compras

Este proyecto es parte de la práctica de un curso de JavaScript, donde aprendí los conceptos clave de manipulación del DOM, eventos y almacenamiento de datos en variables para crear un carrito de compras funcional.

## Descripción del Proyecto

El proyecto consiste en un carrito de compras que permite agregar, eliminar y visualizar cursos seleccionados por el usuario en una tienda en línea. El carrito puede vaciarse por completo y se actualiza dinámicamente en el HTML según las interacciones del usuario.

### Funcionalidades:
- **Agregar al carrito**: Los cursos seleccionados por el usuario se agregan al carrito.
- **Eliminar cursos del carrito**: Los usuarios pueden eliminar cursos individualmente o reducir la cantidad si hay más de uno del mismo curso.
- **Vaciar carrito**: Un botón permite vaciar el carrito por completo, eliminando todos los elementos seleccionados.
- **Mostrar el carrito en el HTML**: El contenido del carrito se actualiza automáticamente en la tabla HTML.

## ¿Qué aprendí?

Durante esta práctica, aprendí y reforcé los siguientes conceptos:

### 1. **Manipulación del DOM**
   Utilicé métodos como `querySelector`, `parentElement`, y `appendChild` para seleccionar y manipular elementos en el HTML. Esto me permitió interactuar con los elementos de la página, como el carrito, la lista de cursos y los botones.

### 2. **Manejo de Eventos**
   Utilicé `addEventListener` para escuchar eventos como clicks y prevenir comportamientos por defecto usando `e.preventDefault()`. También aprendí a detectar qué elemento específico fue clickeado utilizando `e.target`.

### 3. **Arreglos y Métodos de Arreglos**
   Utilicé métodos como `some()`, `map()`, y `filter()` para manejar los datos en el arreglo `articulosCarrito`. Estos métodos me permitieron:
   - Verificar si un curso ya estaba en el carrito.
   - Actualizar la cantidad de un curso si ya estaba agregado.
   - Filtrar los elementos cuando el usuario decide eliminar un curso.

### 4. **Creación Dinámica de HTML**
   Aprendí a generar contenido HTML de manera dinámica utilizando `createElement` y la interpolación de variables en `innerHTML`. Esto me permitió actualizar la visualización del carrito en la página web en tiempo real.

### 5. **Gestión del Estado**
   El carrito de compras se gestiona utilizando un arreglo de objetos (`articulosCarrito`), que contiene información como la imagen, el título, el precio, la cantidad y el ID de cada curso. Aprendí a mantener el estado actualizado en la interfaz mientras interactuaba con el usuario.

## Tecnologías Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**

## Cómo utilizar el proyecto

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/nombre-repositorio.git
```

2. Abre el archivo `index.html` en tu navegador para interactuar con el carrito de compras.

---

Este proyecto es un buen ejemplo práctico de cómo manejar eventos, interactuar con el DOM y manipular datos dinámicamente en una página web. A medida que avance en mi aprendizaje de JavaScript, aplicaré estos conceptos en proyectos más complejos.