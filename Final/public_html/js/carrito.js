// CARRITO.JS - LÓGICA DEL CARRITO

// CLASE CARRITO
function CarritoCompras(capacidad) {
  // Propiedades
  this.capacidad = capacidad;
  this.productos = [];
  this.productosOrdenados = [];
  this.contador = 0;
  this.pasosBurbuja = [];
}

// CALCULAR TOTAL
CarritoCompras.prototype.calcularTotal = function() {
  // Variables
  let total = 0;
  let subtotal = 0;
  
  // For tradicional
  for (let i = 0; i < this.productos.length; i++) {
    // Operador multiplicación
    subtotal = this.productos[i].precio * this.productos[i].cantidad;
    // Operador suma
    total += subtotal;
  }
  
  // Operador multiplicación
  let igv = total * 0.18;
  // Operador suma
  let totalFinal = total + igv;
  
  // Operador incremento
  let incremento = total;
  incremento++;
  
  // Operador decremento
  let decremento = total;
  decremento--;
  
  // Return objeto
  return {
    subtotal: total,
    igv: igv,
    total: totalFinal,
    incremento: incremento,
    decremento: decremento
  };
};

// VERIFICAR STOCK
CarritoCompras.prototype.verificarStock = function(cantidad) {
  // If-Else simple
  if (cantidad > 0) {
    return "Disponible";
  } else {
    return "Agotado";
  }
};

// APLICAR DESCUENTO
CarritoCompras.prototype.aplicarDescuento = function(total) {
  // If-Else doble
  if (total >= 200) {
    // Operador multiplicación
    return total * 0.10;
  } else {
    return 0;
  }
};

// CATEGORIZAR COMPRA
CarritoCompras.prototype.categorizarCompra = function(total) {
  // If-Else anidada
  if (total < 100) {
    return "Compra Pequeña";
  } else if (total < 300) {
    return "Compra Media";
  } else if (total < 500) {
    return "Compra Grande";
  } else {
    return "Compra Premium";
  }
};

// CONTAR PRODUCTOS
CarritoCompras.prototype.contarProductos = function() {
  // Variables
  let contador = 0;
  let i = 0;
  
  // While
  while (i < this.productos.length) {
    // Incremento
    contador++;
    i++;
  }
  
  // Return
  return contador;
};

// OBTENER CATEGORÍA
CarritoCompras.prototype.obtenerCategoria = function(nombreProducto) {
  // Variables
  let categoria = "";
  let nombre = nombreProducto.toLowerCase();
  
  // Switch-Case
  switch(true) {
    case nombre.includes("alfombra"):
      categoria = "Alfombras";
      break;
    case nombre.includes("cojin"):
      categoria = "Cojines";
      break;
    case nombre.includes("vajilla"):
      categoria = "Cocina";
      break;
    case nombre.includes("cortina"):
      categoria = "Cortinas";
      break;
    case nombre.includes("cuadro"):
      categoria = "Cuadros";
      break;
    default:
      categoria = "Otros";
  }
  
  // Return
  return categoria;
};

// LISTAR PRODUCTOS
CarritoCompras.prototype.listarProductos = function() {
  // Array vacío
  let lista = [];
  
  // For tradicional
  for (let i = 0; i < this.productos.length; i++) {
    // Push al array
    lista.push(this.productos[i].nombre);
  }
  
  // Return
  return lista;
};

// AGREGAR PRODUCTO (CREATE)
CarritoCompras.prototype.agregar = function(nombre, precio, cantidad) {
  // If simple
  if (this.contador < this.capacidad) {
    // Objeto producto
    let producto = {
      id: this.contador + 1,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      subtotal: calcularSubtotal(precio, cantidad),
      categoria: this.obtenerCategoria(nombre)
    };
    // Push al array
    this.productos.push(producto);
    // Incremento
    this.contador++;
    // Return
    return true;
  }
  // Return
  return false;
};

// BUSCAR PRODUCTO (READ)
CarritoCompras.prototype.buscar = function(nombre) {
  // Array vacío
  let resultados = [];
  
  // For tradicional
  for (let i = 0; i < this.productos.length; i++) {
    // If con includes
    if (this.productos[i].nombre.toLowerCase().includes(nombre.toLowerCase())) {
      // Push al array
      resultados.push({
        posicion: i,
        producto: this.productos[i]
      });
    }
  }
  
  // Return
  return resultados;
};

// EDITAR PRODUCTO (UPDATE)
CarritoCompras.prototype.editar = function(id, nuevosDatos) {
  // Variable boolean
  let encontrado = false;
  
  // For tradicional
  for (let i = 0; i < this.productos.length; i++) {
    // If comparación
    if (this.productos[i].id === id) {
      // If simple
      if (nuevosDatos.nombre) this.productos[i].nombre = nuevosDatos.nombre;
      if (nuevosDatos.precio) this.productos[i].precio = nuevosDatos.precio;
      if (nuevosDatos.cantidad) this.productos[i].cantidad = nuevosDatos.cantidad;
      
      // Recalcular subtotal
      this.productos[i].subtotal = this.productos[i].precio * this.productos[i].cantidad;
      
      // Boolean
      encontrado = true;
      // Break
      break;
    }
  }
  
  // Return
  return encontrado;
};

// ELIMINAR PRODUCTO (DELETE)
CarritoCompras.prototype.eliminar = function(nombre) {
  // Variable
  let indice = -1;
  
  // For tradicional
  for (let i = 0; i < this.productos.length; i++) {
    // If comparación
    if (this.productos[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      // Asignar índice
      indice = i;
      // Break
      break;
    }
  }
  
  // If comparación
  if (indice !== -1) {
    // Splice array
    this.productos.splice(indice, 1);
    // Decremento
    this.contador--;
    // Return
    return true;
  }
  // Return
  return false;
};

// ORDENAMIENTO BURBUJA (SORT)
CarritoCompras.prototype.ordenarBurbuja = function() {
  // Clonar array
  this.productosOrdenados = JSON.parse(JSON.stringify(this.productos));
  // Array vacío
  this.pasosBurbuja = [];
  // Variable
  let n = this.productosOrdenados.length;
  
  // For externo
  for (let i = 0; i < n - 1; i++) {
    // For interno
    for (let j = 0; j < n - i - 1; j++) {
      // Objeto paso
      let paso = {
        iteracion: this.pasosBurbuja.length + 1,
        comparacion: this.productosOrdenados[j].nombre + " (" + this.productosOrdenados[j].precio + ") vs " + 
                     this.productosOrdenados[j + 1].nombre + " (" + this.productosOrdenados[j + 1].precio + ")",
        intercambio: false,
        array: JSON.parse(JSON.stringify(this.productosOrdenados))
      };
      
      // If comparación
      if (this.productosOrdenados[j].precio > this.productosOrdenados[j + 1].precio) {
        // Variable temporal
        let temp = this.productosOrdenados[j];
        // Intercambio
        this.productosOrdenados[j] = this.productosOrdenados[j + 1];
        this.productosOrdenados[j + 1] = temp;
        // Boolean
        paso.intercambio = true;
        // Actualizar array
        paso.array = JSON.parse(JSON.stringify(this.productosOrdenados));
      }
      
      // Push al array
      this.pasosBurbuja.push(paso);
    }
  }
  
  // Return
  return this.productosOrdenados;
};

// OBTENER INFORMACIÓN
CarritoCompras.prototype.obtenerInfo = function() {
  // Calcular totales
  let totales = this.calcularTotal();
  
  // Return objeto
  return {
    capacidad: this.capacidad,
    ocupado: this.contador,
    disponible: this.capacidad - this.contador,
    subtotal: totales.subtotal,
    igv: totales.igv,
    total: totales.total
  };
};

// VARIABLE GLOBAL
let carrito = null;