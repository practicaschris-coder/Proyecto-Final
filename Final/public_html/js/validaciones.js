// VALIDACIONES.JS - VALIDACIÓN DE FORMULARIOS

// VALIDAR PRECIO
function validarPrecio(precio) {
  // If-Else simple
  if (precio > 0) {
    return true;
  }
  return false;
}

// VALIDAR EMAIL
function validarEmail(email) {
  // Expresión regular
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Return test
  return regex.test(email);
}

// VALIDAR TEXTO NO VACÍO
function validarTexto(texto) {
  // If-Else doble
  if (texto && texto.trim().length > 0) {
    return true;
  } else {
    return false;
  }
}

// VALIDAR NÚMERO
function validarNumero(numero) {
  // If-Else doble
  if (isNaN(numero) || numero <= 0) {
    return false;
  } else {
    return true;
  }
}

// VALIDAR LONGITUD MÍNIMA
function validarLongitudMinima(texto, minimo) {
  // If-Else anidada
  if (texto) {
    if (texto.length >= minimo) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// VALIDAR RANGO DE PRECIO
function validarRangoPrecio(precio) {
  // If-Else-If anidada
  if (precio < 0) {
    return "Precio inválido";
  } else if (precio < 50) {
    return "Precio bajo";
  } else if (precio < 200) {
    return "Precio medio";
  } else if (precio < 500) {
    return "Precio alto";
  } else {
    return "Precio premium";
  }
}

// VALIDAR STOCK
function validarStock(cantidad) {
  // Variable
  let estado = "";
  
  // Switch-Case
  switch(true) {
    case (cantidad === 0):
      estado = "Agotado";
      break;
    case (cantidad < 5):
      estado = "Stock bajo";
      break;
    case (cantidad < 20):
      estado = "Stock disponible";
      break;
    case (cantidad >= 20):
      estado = "Stock abundante";
      break;
    default:
      estado = "Sin información";
  }
  
  // Return
  return estado;
}

// VALIDAR CATEGORÍA DE PRODUCTO
function validarCategoria(nombreProducto) {
  // String a minúsculas
  let nombre = nombreProducto.toLowerCase();
  // Variable
  let categoria = "";
  
  // Switch-Case con strings
  switch(true) {
    case nombre.includes("alfombra"):
      categoria = "Alfombras";
      break;
    case nombre.includes("cojin"):
      categoria = "Cojines";
      break;
    case nombre.includes("vajilla"):
    case nombre.includes("plato"):
    case nombre.includes("taza"):
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
}

// VALIDAR TELÉFONO PERUANO
function validarTelefono(telefono) {
  // Expresión regular
  let regex = /^(\+51|51)?[9]\d{8}$/;
  // Return test
  return regex.test(telefono.replace(/\s/g, ''));
}

// VALIDAR DNI PERUANO
function validarDNI(dni) {
  // Expresión regular
  let regex = /^\d{8}$/;
  // Return test
  return regex.test(dni);
}

// VALIDAR FORMULARIO COMPLETO
function validarFormularioCompleto(datos) {
  // Array vacío
  let errores = [];
  
  // For-In para iterar sobre propiedades
  for (let campo in datos) {
    // If simple
    if (!validarTexto(datos[campo])) {
      // Push al array
      errores.push("El campo " + campo + " es requerido");
    }
  }
  
  // Return objeto
  return {
    esValido: errores.length === 0,
    errores: errores
  };
}