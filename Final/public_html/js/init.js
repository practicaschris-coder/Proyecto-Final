// INIT.JS - INICIALIZACIÓN

// MOSTRAR CARRITO ORIGINAL
function mostrarCarritoOriginal() {
  // Ocultar formularios
  ocultarFormulariosDOM();
  // Obtener contenedor
  let contenedorTabla = domManager.obtenerElemento('tabla-original');
  // Limpiar HTML
  contenedorTabla.innerHTML = '';
  
  // If-Else
  if (carrito.productos.length === 0) {
    // Crear párrafo
    let mensaje = domManager.crearElemento('p', {'style': 'color: #999;'}, 'Carrito vacío');
    // Append child
    contenedorTabla.appendChild(mensaje);
  } else {
    // Crear tabla
    let tabla = domManager.crearElemento('table');
    // Crear thead
    let thead = domManager.crearElemento('tr');
    // Array de encabezados
    let encabezados = ['ID', 'Producto', 'Categoría', 'Precio', 'Cantidad', 'Subtotal'];
    
    // For tradicional
    for (let i = 0; i < encabezados.length; i++) {
      // Crear th
      let th = domManager.crearElemento('th', {}, encabezados[i]);
      // Append child
      thead.appendChild(th);
    }
    // Append child
    tabla.appendChild(thead);
    
    // For tradicional
    for (let i = 0; i < carrito.productos.length; i++) {
      // Variable
      let p = carrito.productos[i];
      // Crear fila
      let fila = domManager.crearElemento('tr');
      // Manipular atributos
      domManager.manipularAtributos(fila, {
        'data-producto-id': p.id, 
        'data-producto-nombre': p.nombre, 
        'data-categoria': p.categoria
      });
      
      // Crear celdas
      fila.appendChild(domManager.crearElemento('td', {}, p.id.toString()));
      fila.appendChild(domManager.crearElemento('td', {}, p.nombre));
      fila.appendChild(domManager.crearElemento('td', {}, p.categoria));
      fila.appendChild(domManager.crearElemento('td', {}, formatearPrecio(p.precio)));
      fila.appendChild(domManager.crearElemento('td', {}, p.cantidad.toString()));
      fila.appendChild(domManager.crearElemento('td', {}, formatearPrecio(p.subtotal)));
      // Append child
      tabla.appendChild(fila);
    }
    // Append child
    contenedorTabla.appendChild(tabla);
  }
  
  // Obtener info
  let info = carrito.obtenerInfo();
  // Obtener contenedor
  let contenedorInfo = domManager.obtenerElemento('info-original');
  // Limpiar HTML
  contenedorInfo.innerHTML = '';
  
  // Crear div
  let divInfo = domManager.crearElemento('div', {'class': 'message info', 'style': 'margin-top: 15px;'});
  // Crear strong
  let titulo = domManager.crearElemento('strong', {}, 'Resumen del Carrito:');
  // Append child
  divInfo.appendChild(titulo);
  divInfo.appendChild(document.createElement('br'));
  
  // Create text node
  divInfo.appendChild(document.createTextNode('Capacidad: ' + info.capacidad + ' | Ocupado: ' + info.ocupado + ' | Disponible: ' + info.disponible));
  divInfo.appendChild(document.createElement('br'));
  divInfo.appendChild(document.createTextNode('Subtotal: ' + formatearPrecio(info.subtotal)));
  divInfo.appendChild(document.createElement('br'));
  divInfo.appendChild(document.createTextNode('IGV (18%): ' + formatearPrecio(info.igv)));
  divInfo.appendChild(document.createElement('br'));
  
  // Crear span
  let spanTotal = domManager.crearElemento('strong', {}, formatearPrecio(info.total));
  divInfo.appendChild(document.createTextNode('Total: '));
  divInfo.appendChild(spanTotal);
  divInfo.appendChild(document.createElement('br'));
  divInfo.appendChild(document.createTextNode('Categoría de Compra: ' + carrito.categorizarCompra(info.total)));
  
  // Append child
  contenedorInfo.appendChild(divInfo);
  
  // Remove class
  domManager.obtenerElemento('display-original').classList.remove('hidden');
  // Scroll into view
  domManager.obtenerElemento('display-original').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ORDENAR CARRITO
function ordenarCarrito() {
  // If simple
  if (carrito.productos.length === 0) {
    // Alert
    alert('El carrito está vacío. Agregue productos primero.');
    // Return
    return;
  }
  // Ordenar burbuja
  carrito.ordenarBurbuja();
  // Alert
  alert('Carrito ordenado exitosamente por precio usando método Burbuja');
}

// MOSTRAR CARRITO ORDENADO
function mostrarCarritoOrdenado() {
  // Ocultar formularios
  ocultarFormulariosDOM();
  // Obtener contenedor
  let contenedorTabla = domManager.obtenerElemento('tabla-ordenado');
  // Limpiar HTML
  contenedorTabla.innerHTML = '';
  
  // If-Else
  if (carrito.productosOrdenados.length === 0) {
    // Crear párrafo
    let mensaje = domManager.crearElemento('p', {'style': 'color: #999;'}, 'Primero debe ordenar el carrito');
    // Append child
    contenedorTabla.appendChild(mensaje);
    // Add class
    domManager.obtenerElemento('proceso-burbuja').classList.add('hidden');
  } else {
    // Crear tabla
    let tabla = domManager.crearElemento('table');
    // Crear thead
    let thead = domManager.crearElemento('tr');
    // Array de encabezados
    let encabezados = ['ID', 'Producto', 'Categoría', 'Precio', 'Cantidad', 'Subtotal'];
    
    // For tradicional
    for (let i = 0; i < encabezados.length; i++) {
      // Crear th
      let th = domManager.crearElemento('th', {}, encabezados[i]);
      // Append child
      thead.appendChild(th);
    }
    // Append child
    tabla.appendChild(thead);
    
    // For tradicional
    for (let i = 0; i < carrito.productosOrdenados.length; i++) {
      // Variable
      let p = carrito.productosOrdenados[i];
      // Crear fila
      let fila = domManager.crearElemento('tr');
      // Manipular atributos
      domManager.manipularAtributos(fila, {'data-producto-id': p.id, 'data-orden': i.toString()});
      
      // Crear celdas
      fila.appendChild(domManager.crearElemento('td', {}, p.id.toString()));
      fila.appendChild(domManager.crearElemento('td', {}, p.nombre));
      fila.appendChild(domManager.crearElemento('td', {}, p.categoria));
      fila.appendChild(domManager.crearElemento('td', {}, formatearPrecio(p.precio)));
      fila.appendChild(domManager.crearElemento('td', {}, p.cantidad.toString()));
      fila.appendChild(domManager.crearElemento('td', {}, formatearPrecio(p.subtotal)));
      // Append child
      tabla.appendChild(fila);
    }
    // Append child
    contenedorTabla.appendChild(tabla);
    
    // Obtener contenedor
    let contenedorInfo = domManager.obtenerElemento('info-ordenado');
    // Limpiar HTML
    contenedorInfo.innerHTML = '';
    // Crear div
    let divInfo = domManager.crearElemento('div', {'class': 'message success', 'style': 'margin-top: 15px;'});
    // Create text node
    divInfo.appendChild(document.createTextNode('Carrito ordenado de menor a mayor precio con ' + carrito.productosOrdenados.length + ' productos'));
    // Append child
    contenedorInfo.appendChild(divInfo);
    // Mostrar proceso
    mostrarProcesoDetalladoDOM();
  }
  
  // Remove class
  domManager.obtenerElemento('display-ordenado').classList.remove('hidden');
  // Scroll
  domManager.obtenerElemento('display-ordenado').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// MOSTRAR PROCESO BURBUJA
function mostrarProcesoDetalladoDOM() {
  // Variable
  let pasos = carrito.pasosBurbuja;
  // If simple
  if (pasos.length === 0) return;
  
  // Obtener contenedor
  let contenedor = domManager.obtenerElemento('proceso-burbuja');
  // Limpiar HTML
  contenedor.innerHTML = '';
  
  // Crear h3
  let titulo = domManager.crearElemento('h3', {'style': 'margin-top: 20px; color: #667eea;'}, 'Proceso de Ordenamiento Burbuja:');
  // Append child
  contenedor.appendChild(titulo);
  
  // Crear tabla
  let tabla = domManager.crearElemento('table');
  // Crear thead
  let thead = domManager.crearElemento('tr');
  // Array de encabezados
  let encabezados = ['Paso', 'Comparación', 'Intercambio'];
  
  // For tradicional
  for (let i = 0; i < encabezados.length; i++) {
    // Crear th
    let th = domManager.crearElemento('th', {}, encabezados[i]);
    // Append child
    thead.appendChild(th);
  }
  // Append child
  tabla.appendChild(thead);
  
  // For tradicional
  for (let i = 0; i < pasos.length; i++) {
    // Variable
    let paso = pasos[i];
    // Crear fila
    let fila = domManager.crearElemento('tr');
    // Manipular atributos
    domManager.manipularAtributos(fila, {
      'data-paso': paso.iteracion.toString(), 
      'data-intercambio': paso.intercambio.toString()
    });
    
    // If simple
    if (paso.intercambio) {
      // Manipular atributos
      domManager.manipularAtributos(fila, {'style': 'background-color: #d4edda;'});
    }
    
    // Crear celdas
    fila.appendChild(domManager.crearElemento('td', {}, paso.iteracion.toString()));
    fila.appendChild(domManager.crearElemento('td', {}, paso.comparacion));
    fila.appendChild(domManager.crearElemento('td', {}, paso.intercambio ? 'SI' : 'NO'));
    // Append child
    tabla.appendChild(fila);
  }
  // Append child
  contenedor.appendChild(tabla);
  // Remove class
  contenedor.classList.remove('hidden');
}

// EVENT LISTENER DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', function() {
  // Console log
  console.log("=== SISTEMA INICIALIZADO ===");
  console.log("Funciones disponibles:");
  console.log("- demostrarNavegacionNodos()");
  console.log("- demostrarManipulacionAtributos()");
  console.log("- demostrarClonacionNodos()");
  console.log("- analizarEstructuraDOM()");
  
  // Inicializar menú
  inicializarMenu();
  
  // Inicializar validación
  inicializarValidacionInputs();
  
  // Console log
  console.log("✅ Aplicación inicializada");
});