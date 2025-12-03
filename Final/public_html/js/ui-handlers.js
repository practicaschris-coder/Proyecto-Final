// UI-HANDLERS.JS - MANEJADORES DE INTERFAZ

// INICIALIZAR CARRITO
function inicializarCarrito() {
  // Obtener elemento
  let inputCapacidad = domManager.obtenerElemento('capacidad');
  // Parse int
  let capacidad = parseInt(inputCapacidad.value);
  
  // If-Else
  if (isNaN(capacidad) || capacidad <= 0) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-init', 'Ingrese una capacidad válida mayor a 0', 'error');
    // Manipular atributos
    domManager.manipularAtributos(inputCapacidad, {
      'class': 'input-error',
      'aria-invalid': 'true',
      'title': 'Debe ingresar un número mayor a 0'
    });
    // Animación CSS
    inputCapacidad.style.animation = 'shake 0.5s';
    // SetTimeout
    setTimeout(() => {
      inputCapacidad.style.animation = '';
    }, 500);
    // Return
    return;
  }
  
  // Manipular atributos
  domManager.manipularAtributos(inputCapacidad, {
    'class': null,
    'aria-invalid': null
  });
  
  // Crear carrito
  carrito = new CarritoCompras(capacidad);
  // Mostrar tipos de datos
  mostrarTiposDatos();
  
  // Mostrar mensaje
  mostrarMensajeDOM('mensaje-init', 'Carrito creado exitosamente con capacidad de ' + capacidad + ' productos', 'success');
  // Habilitar botones
  habilitarBotonesDOM();
  
  // Console log
  console.log("=== NAVEGACIÓN DE NODOS ===");
  // Obtener jerarquía
  let jerarquia = domManager.navegarJerarquia(inputCapacidad);
  // Console log
  console.log("Padre:", jerarquia.padre);
  console.log("Hermanos:", domManager.navegarHermanos(inputCapacidad));
}

// HABILITAR BOTONES
function habilitarBotonesDOM() {
  // Array de IDs
  let botones = ['btn-agregar', 'btn-buscar', 'btn-mostrar-original', 'btn-ordenar', 'btn-mostrar-ordenado', 'btn-eliminar'];
  
  // For tradicional
  for (let i = 0; i < botones.length; i++) {
    // Obtener elemento
    let boton = domManager.obtenerElemento(botones[i]);
    // Habilitar botón
    boton.disabled = false;
    // Manipular atributos
    domManager.manipularAtributos(boton, {
      'aria-disabled': 'false',
      'data-activo': 'true'
    });
    
    // If simple
    if (i === 0) {
      // Console log
      console.log("=== NAVEGACIÓN BOTÓN ===");
      console.log("Hermanos:", domManager.navegarHermanos(boton));
    }
  }
}

// MOSTRAR FORMULARIO AGREGAR
function mostrarFormularioAgregar() {
  // Ocultar formularios
  ocultarFormulariosDOM();
  // Obtener elemento
  let form = domManager.obtenerElemento('form-agregar');
  // Remove class
  form.classList.remove('hidden');
  
  // Limpiar inputs
  domManager.obtenerElemento('producto-nombre').value = '';
  domManager.obtenerElemento('producto-precio').value = '';
  domManager.obtenerElemento('producto-cantidad').value = '1';
  domManager.obtenerElemento('mensaje-agregar').classList.add('hidden');
  
  // Query selector
  let inputs = form.querySelectorAll('input');
  // If simple
  if (inputs.length > 0) {
    // Focus
    inputs[0].focus();
  }
  // Scroll into view
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// MOSTRAR FORMULARIO BUSCAR
function mostrarFormularioBuscar() {
  // Ocultar formularios
  ocultarFormulariosDOM();
  // Obtener elemento
  let form = domManager.obtenerElemento('form-buscar');
  // Remove class
  form.classList.remove('hidden');
  
  // Limpiar input
  domManager.obtenerElemento('producto-buscar').value = '';
  domManager.obtenerElemento('resultado-buscar').classList.add('hidden');
  // Focus
  domManager.obtenerElemento('producto-buscar').focus();
  // Scroll
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// MOSTRAR FORMULARIO ELIMINAR
function mostrarFormularioEliminar() {
  // Ocultar formularios
  ocultarFormulariosDOM();
  // Obtener elemento
  let form = domManager.obtenerElemento('form-eliminar');
  // Remove class
  form.classList.remove('hidden');
  
  // Limpiar input
  domManager.obtenerElemento('producto-eliminar').value = '';
  domManager.obtenerElemento('mensaje-eliminar').classList.add('hidden');
  // Focus
  domManager.obtenerElemento('producto-eliminar').focus();
  // Scroll
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// OCULTAR FORMULARIOS
function ocultarFormulariosDOM() {
  // Array de IDs
  let formularios = ['form-agregar', 'form-buscar', 'form-eliminar', 'display-original', 'display-ordenado'];
  // For tradicional
  for (let i = 0; i < formularios.length; i++) {
    // Add class hidden
    domManager.obtenerElemento(formularios[i]).classList.add('hidden');
  }
}

// AGREGAR PRODUCTO
function agregarProducto() {
  // Obtener elementos
  let inputNombre = domManager.obtenerElemento('producto-nombre');
  let inputPrecio = domManager.obtenerElemento('producto-precio');
  let inputCantidad = domManager.obtenerElemento('producto-cantidad');
  
  // Obtener valores
  let nombre = inputNombre.value.trim();
  let precio = parseFloat(inputPrecio.value);
  let cantidad = parseInt(inputCantidad.value);
  
  // Validar nombre
  if (!validarTexto(nombre)) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-agregar', 'Ingrese un nombre válido', 'error');
    // Manipular atributos
    domManager.manipularAtributos(inputNombre, {'class': 'input-error', 'aria-invalid': 'true'});
    // Focus
    inputNombre.focus();
    // Return
    return;
  }
  
  // Validar precio
  if (!validarPrecio(precio)) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-agregar', 'Ingrese un precio válido mayor a 0', 'error');
    // Manipular atributos
    domManager.manipularAtributos(inputPrecio, {'class': 'input-error', 'aria-invalid': 'true'});
    // Focus
    inputPrecio.focus();
    // Return
    return;
  }
  
  // Validar cantidad
  if (!validarNumero(cantidad)) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-agregar', 'Ingrese una cantidad válida', 'error');
    // Manipular atributos
    domManager.manipularAtributos(inputCantidad, {'class': 'input-error', 'aria-invalid': 'true'});
    // Focus
    inputCantidad.focus();
    // Return
    return;
  }
  
  // Limpiar errores
  domManager.manipularAtributos(inputNombre, {'class': null, 'aria-invalid': null});
  domManager.manipularAtributos(inputPrecio, {'class': null, 'aria-invalid': null});
  domManager.manipularAtributos(inputCantidad, {'class': null, 'aria-invalid': null});
  
  // Agregar al carrito
  let resultado = carrito.agregar(nombre, precio, cantidad);
  
  // If-Else
  if (resultado) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-agregar', 'Producto "' + nombre + '" agregado exitosamente', 'success');
    // Limpiar inputs
    inputNombre.value = '';
    inputPrecio.value = '';
    inputCantidad.value = '1';
    // Focus
    inputNombre.focus();
    
    // Obtener info
    let info = carrito.obtenerInfo();
    // If simple
    if (info.disponible === 0) {
      // Mostrar mensaje
      mostrarMensajeDOM('mensaje-agregar', 'Carrito lleno. No se pueden agregar más productos', 'info');
    }
  } else {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-agregar', 'Carrito lleno. No se pueden agregar más productos', 'error');
  }
}

// BUSCAR PRODUCTO
function buscarProducto() {
  // Obtener elemento
  let inputBuscar = domManager.obtenerElemento('producto-buscar');
  // Obtener valor
  let nombre = inputBuscar.value.trim();
  
  // Validar texto
  if (!validarTexto(nombre)) {
    // Mostrar mensaje
    mostrarMensajeDOM('resultado-buscar', 'Ingrese un nombre válido', 'error');
    // Remove class
    domManager.obtenerElemento('resultado-buscar').classList.remove('hidden');
    // Manipular atributos
    domManager.manipularAtributos(inputBuscar, {'class': 'input-error'});
    // Return
    return;
  }
  
  // Limpiar error
  domManager.manipularAtributos(inputBuscar, {'class': null});
  // Buscar en carrito
  let resultados = carrito.buscar(nombre);
  // Obtener contenedor
  let contenedor = domManager.obtenerElemento('resultado-buscar');
  // Limpiar HTML
  contenedor.innerHTML = '';
  
  // If-Else
  if (resultados.length > 0) {
    // Crear div
    let divMensaje = domManager.crearElemento('div', {'class': 'message success'});
    // Crear strong
    let titulo = domManager.crearElemento('strong', {}, 'Se encontraron ' + resultados.length + ' producto(s):');
    // Append child
    divMensaje.appendChild(titulo);
    divMensaje.appendChild(document.createElement('br'));
    divMensaje.appendChild(document.createElement('br'));
    
    // For tradicional
    for (let i = 0; i < resultados.length; i++) {
      // Variable
      let p = resultados[i].producto;
      // Crear div
      let divProducto = domManager.crearElemento('div', {'class': 'producto-resultado'});
      
      // Crear elementos
      let nombreProducto = domManager.crearElemento('strong', {}, p.nombre);
      divProducto.appendChild(nombreProducto);
      divProducto.appendChild(document.createElement('br'));
      
      // Crear spans
      let infoPrecio = domManager.crearElemento('span', {}, 'Precio: ' + formatearPrecio(p.precio) + ' | ');
      let infoCantidad = domManager.crearElemento('span', {}, 'Cantidad: ' + p.cantidad + ' | ');
      let infoSubtotal = domManager.crearElemento('span', {}, 'Subtotal: ' + formatearPrecio(p.subtotal));
      
      // Append child
      divProducto.appendChild(infoPrecio);
      divProducto.appendChild(infoCantidad);
      divProducto.appendChild(infoSubtotal);
      divProducto.appendChild(document.createElement('br'));
      
      // Crear span categoría
      let infoCategoria = domManager.crearElemento('span', {}, 'Categoría: ' + p.categoria);
      divProducto.appendChild(infoCategoria);
      divProducto.appendChild(document.createElement('br'));
      divProducto.appendChild(document.createElement('br'));
      
      // Append child
      divMensaje.appendChild(divProducto);
    }
    // Append child
    contenedor.appendChild(divMensaje);
  } else {
    // Crear div error
    let divError = domManager.crearElemento('div', {'class': 'message error'}, 'No se encontraron productos con el nombre "' + nombre + '"');
    // Append child
    contenedor.appendChild(divError);
  }
  // Remove class
  contenedor.classList.remove('hidden');
}

// ELIMINAR PRODUCTO
function eliminarProducto() {
  // Obtener elemento
  let inputEliminar = domManager.obtenerElemento('producto-eliminar');
  // Obtener valor
  let nombre = inputEliminar.value.trim();
  
  // Validar texto
  if (!validarTexto(nombre)) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-eliminar', 'Ingrese un nombre válido', 'error');
    // Manipular atributos
    domManager.manipularAtributos(inputEliminar, {'class': 'input-error'});
    // Return
    return;
  }
  
  // Limpiar error
  domManager.manipularAtributos(inputEliminar, {'class': null});
  // Eliminar del carrito
  let resultado = carrito.eliminar(nombre);
  
  // If-Else
  if (resultado) {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-eliminar', 'Producto "' + nombre + '" eliminado exitosamente', 'success');
    // Limpiar input
    inputEliminar.value = '';
  } else {
    // Mostrar mensaje
    mostrarMensajeDOM('mensaje-eliminar', 'Producto "' + nombre + '" no encontrado', 'error');
  }
}

// MOSTRAR MENSAJE
function mostrarMensajeDOM(elementId, texto, tipo) {
  // Obtener elemento
  let elemento = domManager.obtenerElemento(elementId);
  // Limpiar HTML
  elemento.innerHTML = '';
  // Crear div
  let divMensaje = domManager.crearElemento('div', {
    'class': 'message ' + tipo,
    'role': 'alert',
    'aria-live': 'polite'
  }, texto);
  
  // Append child
  elemento.appendChild(divMensaje);
  // Remove class
  elemento.classList.remove('hidden');
}