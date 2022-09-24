// Variables de mi carrito
const carrito = document.querySelector('.productos__grid');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
const compra = document.querySelector('#contenedor_compra');
const precio = document.querySelector('#plata')
let sumPriceTotal = 0;

// Array de mi carrito vacio
let articulosCarrito = [];


// Eventos
cargarEventListeners()
function cargarEventListeners(){
    listaProductos.addEventListener('click', agregarProducto);

    // Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Eliminar producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        articulosCarrito = [];

        limpiarHTML()
    })
}


// Funciones del carrito
function agregarProducto(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const ProductoSeleccionado = e.target.parentElement.parentElement.parentElement;

        leerDatosProducto(ProductoSeleccionado)
    }
    
}

// Elimina producto del carrito
function eliminarProducto(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);

        carritoHTML()
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

    carritoHTML();
    
}

function carritoHTML(){
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (producto) =>{
        const {imagen, titulo, precio, cantidad, id} = producto
        /* const row = document.createElement('span'); */
        compra.innerHTML += `
        <div class="card_producto">
            <div class="card_img">
                <img src="${imagen}">
            </div>
            <div class="card_info">
                <p>Nombre producto: ${titulo}</p>
                <p>Precio: <span class="card_price">${precio}</span></p>
                <div class="card_flex">
                    <p>Cantidad: ${cantidad}</p>
                    <a href="#" class="borrar-producto" data-id="${id}"> Eliminar producto</a>
                </div>
            </div>
        </div>
        `;
    })
    // Agregar el carrito al LocalStorage
    sincronizarStorage()
    totalPrecio()
    
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Elimina los productos
function limpiarHTML(){
    while(compra.firstChild){
        compra.removeChild(compra.firstChild)
    }
}
function totalPrecio(){
    const precioTotal = articulosCarrito.reduce( (total, producto) => total + producto.precio,0);
    const precioTexto = `$${precioTotal}`

    precio.innerHTML = `Total a pagar: ${precioTexto}`
}