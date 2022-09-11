// Creo la "base de datos" de mi tienda virtual
const Datos = [
    {
      id: 1,
      nombre : "Cajas de madera",
      precio: 650
    },
    {
      id: 2,
      nombre : "Cajas de madera personalizadas",
      precio: 950
    },
    {
      id: 3,
      nombre : "Tazas",
      precio: 450
    },
    {
      id: 4,
      nombre : "Bolsas",
      precio: 500
    },
    {
      id: 5,
      nombre : "Estampados remeras",
      precio: 1200
    },
    {
      id: 6,
      nombre : "Estampados buzos",
      precio: 2200
    },
    {
      id: 7,
      nombre : "Mousepads",
      precio: 750
    }
];



/* el carrito y su lógica: */
let Carrito = {
    Productos : [],
    GetTotal: function() {
        let suma = 0;
        for (let p of this.Productos) {
            suma += p.precio * p.cantidad;
        }
        return suma;
    },
    Agregar: function(producto, cantidad) {
        this.Productos.push({ ...producto, cantidad: cantidad });
    },
    Vaciar: function() {
        this.Productos = [];
    }
}
// Variable para la comprabacion si quiere buscar un producto o no
let encontrar = 0;
/* CONJUNTO DE FUNCIONES PARA CREAR O INICIAR SESION */
function iniciarSesion(){
    let opciones = Number(prompt(`Si desea crear una cuenta escriba 1 \nsi ya tiene una presione 2 \nSi no quiere crearse una presione 3`))

    switch(opciones){
        case 1 : registro();
                 getProductosFiltrados();
                 encontrar = Number(prompt('Quiere buscar un producto?\n1)Si \n2)No'))
                 if( encontrar == 1){
                    buscarProducto();
                 }else{
                    listadoProductos();
                 }
                 break;

        case 2: logeo();
                getProductosFiltrados();
                encontrar = Number(prompt('Quiere buscar un producto?\n1)Si \n2)No'))
                if( encontrar == 1){
                   buscarProducto();
                }else{
                   listadoProductos();
                }
                break;

        case 3: alert("Bienvenido a Avellena Cajas/Souvenirs");
                getProductosFiltrados();
                encontrar = Number(prompt('Quiere buscar un producto?\n1)Si \n2)No'))
                if( encontrar == 1){
                   buscarProducto();
                }else{
                   listadoProductos();
                }
                break;

        default : alert("Opcion Erronea"); break;
    }
}
iniciarSesion();

function registro(user, contra, repcontra, _email){
    alert("Por favor cree su Cuenta de Usuario");

    user = prompt("Ingrese su nombre de usuario");
    contra = prompt("Ingrese contraseña");
    repcontra = prompt("Repita la constrenia");
    if( repcontra != contra){
        alert("Las contrasenias no coinciden");
        alert("Vuelva a escribir la contrasenia");
        repcontra = prompt("Vuelve a ingresar la contrasenia");
    }    
    _email = prompt("Ingrese su email");

    alert(`Bienvenido ${user} a Avellena Cajas/Souvenirs`);
}


function logeo(user, _contra){
    alert("Iniciar sesion")

    user = prompt("Ingrese su nombre de usuario");
    _contra = prompt("Ingrese contraseña");

    alert(`Bienvenido ${user} a Avellena Cajas/Souvenirs`);
}
/*FIN DEL CONJUNTO DE FUNCIONES PARA CREAR O INICIAR SESION */




/* par de funciones para imprimir el primer prompt  GetStringProducto y GetListaProductoString*/
function GetStringProducto(producto){
    return producto.nombre + " - $" + producto.precio + " c/u";
}

function GetListaProductoString(){
    var lista = "";
    for (var i = 0; i < Datos.length; i++) {
        lista += `${i+1}) ${GetStringProducto(Datos[i])}\n`;
    }
    return lista;
}
/* 
Donde tenemos:

Productos: Un array para almacenar los productos
GetTotal: Una función que retorna el total del carrito
Agregar: Función que agrega un producto y la cantidad
Vaciar: Para vaciar el carrito 

*/

/* Por último la función principal que es listar productos: */
function listadoProductos(){
    let listado = Number(prompt(GetListaProductoString()));
    let producto = GetProducto(listado);
    if (producto != null) {
        cantidad = Number(prompt("Cuantas desea llevar?"));
        Carrito.Agregar(producto, cantidad);
    
        compra = Number(prompt('\nQuiere agregar mas cosas al carrito? \n1)Si \n2)No'))
        if( compra == 1 ){
            listadoProductos();
        }
        else
        {
            alert(`Total a pagar: $${Carrito.GetTotal()} `)
        }
    }
    else{
        alert("Opcion Erronea");
        listadoProductos();
    }
}

/* función para buscar un producto al array */
function GetProducto(seleccion) {
    if (Datos.length >= seleccion) {
        return Datos[seleccion - 1];
    }
    return null;
}



function getProductosFiltrados() {
    const desea = Number(
      prompt("Desea ver los productos mas baratos? \n1)Si \n2)No")
    );
        
    if (desea === 1) {
      const precioMax = Number(prompt("Ingrese el precio maximo a buscar"));
      const productosFiltrados = Datos.filter((producto) => producto.precio <= precioMax);
      const pro = JSON.stringify(productosFiltrados)
      alert(pro);
    }else{
        alert('Prosiga con su compra')
    }
    
}

function buscarProducto(){
    let resultado = '';
    let nombre = prompt('Nombre producto');
    Datos.forEach((producto) => {
        if(producto.nombre == nombre){
            resultado = Datos
            alert('Producto Encontrado con exito')
            listadoProductos()
        }
    })
}


/* if( desea == 1){
    Datos.forEach(function(arr) {
        let resultado = Datos.filter(precio => precio.precio < 600)
        console.log(resultado[precio])
    });
    let resultado = Datos.filter(precio => precio.precio < 600)
    alert(resultado)
}else{
    listadoProductos()
} */


/* listadoProductos(); */