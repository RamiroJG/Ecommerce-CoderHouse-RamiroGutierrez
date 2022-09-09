// Creo la "base de datos" de mi tienda virtual
const Datos = [
    {
      nombre : "Cajas de madera",
      precio: 650
    },
    {
      nombre : "Cajas de madera personalizadas",
      precio: 950
    },
    {
      nombre : "Tazas",
      precio: 450
    },
    {
      nombre : "Bolsas",
      precio: 500
    },
    {
      nombre : "Estampados remeras",
      precio: 1200
    },
    {
      nombre : "Estampados buzos",
      precio: 2200
    },
    {
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
listadoProductos();