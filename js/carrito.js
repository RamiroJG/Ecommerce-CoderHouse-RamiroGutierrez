// Variables de mi carrito
const carrito = document.querySelector('.productos__grid');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
const compra = document.querySelector('#contenedor_compra');
const precio = document.querySelector('#plata');
const procesarCompra = document.querySelector('#procesar-compra')
const card_header = document.querySelector('.contenedor-cards')
const featured = document.querySelector('.contenedor-cards_featured')
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

    // Procesar compra - con operador ternario
    procesarCompra.addEventListener('click',procesarPedido);

    // Eliminar producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        articulosCarrito = [];

        limpiarHTML()
        vaciarLS()
    })
}



// Funciones del carrito
function agregarProducto(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const ProductoSeleccionado = e.target.parentElement.parentElement.parentElement;

        leerDatosProducto(ProductoSeleccionado)
    }
    agregadoProducto()
}

// Elimina producto del carrito
function eliminarProducto(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);

        carritoHTML()
    }
    eliminadoProducto()
    eliminarProductoLocalStorage(articulosCarrito.id)
    
}

// Lee la info del HTML al que le dimos click
function leerDatosProducto(producto){
    sPrecio = producto.querySelector(".card_precio p").textContent;
    dPrecio = sPrecio.slice(1);
    vPrecio = Number(dPrecio);
    // Creamos un objeto con los datos del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: vPrecio,
        id: producto.querySelector('a').getAttribute('data-id'),
        subtotal: vPrecio,
        cantidad: 1
    }


    // Revisamos si un producto ya existe en nuestro carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id)
    if(existe){
        // Actualizamos la cantidad
        const productos = articulosCarrito.map( producto =>{
            if(producto.id === infoProducto.id){
                producto.cantidad++;

                producto.subtotal = `${producto.precio * producto.cantidad}`;
                
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
        const {imagen, titulo, cantidad, id, subtotal} = producto
        compra.innerHTML += `
        <div class="card_producto">
            <div class="card_img">
                <img src="${imagen}">
            </div>
            <div class="card_info">
                <p>Nombre producto: ${titulo}</p>
                <p>Precio: <span class="card_price">$${subtotal}</span></p>
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


// Eliminar producto de localStorage
function eliminarProductoLocalStorage(productoID){
    let productosLS;
    productosLS = document;
    productosLS.forEach((productoLS, index) =>{
        if(productoLS.id === `${infoProducto.id}`){
            productoLS.splice(index, 1);
        }
    })
    localStorage.setItem('carrito', JSON.stringify(productosLS))

}

// Vaciar localStorage
function vaciarLS(){
    localStorage.clear()
}


// Elimina los productos
function limpiarHTML(){
    while(compra.firstChild){
        compra.removeChild(compra.firstChild)
    }
}

function agregadoProducto(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        customClass: {
            title: 'toast-tam',         
        }
      })
}

function eliminadoProducto(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: 'Producto eliminado del carrito',
        customClass: {
            title: 'toast-tam',         
        }
      })
}

// Procesar compra
function procesarPedido(e){
    e.preventDefault();
    Swal.fire({
        title: 'Error!',
        text: 'No tiene ningun producto en su carrito',
        icon: 'error',
        confirmButtonText: 'Cerrar y agregar productos'
    })
    articulosCarrito.forEach( producto =>{
        producto.length > 0 ? (
            procesarCompra.disabled = true
        ) :(
            procesarCompra.disabled = false,
            Swal.fire({
                title: 'Compra realizada con exito',
                text: `Su codigo de seguimiento es el siguiente: ${numeroRandom()}`,
                icon: 'success',
                confirmButtonText: 'Cerrar ventana',
            }),
            setTimeout(() => {
                vaciarLS()
                location.reload()
            }, 3000)
        )
    })
}


function totalPrecio(){
    const precioTotal = articulosCarrito.reduce( (total, producto) => total + producto.precio * producto.cantidad, 0);
    precio.innerHTML = `Total a pagar: ${precioTotal}`
}


function traerDatos(){
    fetch('/featured.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            card_header.innerHTML += `
            <div class="card_header">
                <img src="${producto.img}" alt="">
                <div class="card_body">
                    <h3>${producto.titulo}</h3>
                    <p>Avellana Cajas & Souvenirs</p>
                    <div class="card_precio">
                        <p>$${producto.precio}</p>  
                        <a href="#" class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</a>
                    </div> 
                </div>
            </div>
            `
        })
    })
}
traerDatos()

function traerDatos_new(){
    fetch('/new.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            featured.innerHTML += `
            <div class="card_header">
                <img src="${producto.img}" alt="">
                <div class="card_body">
                    <h3>${producto.titulo}</h3>
                    <p>Avellana Cajas & Souvenirs</p>
                    <div class="card_precio">
                        <p>$${producto.precio}</p>  
                        <a href="#" class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</a>
                    </div> 
                </div>
            </div>
            `
        })
    })
}
traerDatos_new()


function numeroRandom(){
    const ran = Math.floor(Math.random() * 1000000);

    return ran;
}