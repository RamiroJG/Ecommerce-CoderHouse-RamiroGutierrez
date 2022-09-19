// Variables de mi carrito
const carrito = document.querySelector('#carrito');
const contendorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');

// Array de mi carrito vacio
let articulosCarrito = [];


// Eventos
cargarEventListeners()
function cargarEventListeners(){
    listaProductos.addEventListener('click', agregarProducto);
}


// Funciones del carrito
function agregarProducto(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const ProductoSeleccionado = e.target.parentElement.parentElement.parentElement;

        leerDatosProducto(ProductoSeleccionado)
    }
    
}

// Lee la info del HTML al que le dimos click
function leerDatosProducto(producto){
    // Creamos un objeto con los datos del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.card_precio p').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    // Revisamos si un producto ya existe en nuestro carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id)
    if(existe){
        // Actualizamos la cantidad
        const productos = articulosCarrito.map( producto =>{
            if(producto.id === infoProducto.id){
                let precioProducto = Number(infoProducto.precio.slice(1, infoProducto.precio.length))

                producto.cantidad++;

                producto.precio = `$${precioProducto * producto.cantidad}`;
                return producto; // retorna el objeto actualizado
            }else{
                return producto;
            }
        })
        articulosCarrito = [...productos]
    }else{
        // Agregamos los elementos al carrito
        articulosCarrito = [...articulosCarrito, infoProducto]
    }

    console.log(articulosCarrito)

    carritoHTML();
}

function carritoHTML(){
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (producto) =>{
        const {imagen, titulo, precio, cantidad, id} = producto
        const row = document.createElement('TR');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            
            <td>
                ${titulo}
            </td>
            
            <td>
                ${precio}
            </td>
            
            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contendorCarrito.appendChild(row);
    })
}

// Elimina los productos del tbody 
function limpiarHTML(){
    while(contendorCarrito.firstChild){
        contendorCarrito.removeChild(contendorCarrito.firstChild)
    }
}