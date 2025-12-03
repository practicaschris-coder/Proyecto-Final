// UTILS.JS - UTILIDADES GENERALES

// FORMATEAR PRECIO
function formatearPrecio(precio) {
  // Operador de concatenación
  return "S/ " + precio.toFixed(2);
}

// CALCULAR SUBTOTAL
function calcularSubtotal(precio, cantidad) {
  // Operador aritmético: multiplicación
  return precio * cantidad;
}

// EJEMPLOS DE TIPOS DE DATOS
function mostrarTiposDatos() {
  // Boolean
  let activo = true;
  // Integer
  let cantidad = 5;
  // Double
  let precio = 89.99;
  // String
  let nombre = "Alfombra Boho";
  
  // Console log
  console.log("Boolean:", activo, typeof activo);
  console.log("Integer:", cantidad, typeof cantidad);
  console.log("Double:", precio, typeof precio);
  console.log("String:", nombre, typeof nombre);
}

// EJEMPLOS DE ARREGLOS
function ejemploArreglos() {
  // Arreglo unidimensional
  let nombres = ["Alfombra", "Cojin", "Vajilla"];
  // Arreglo unidimensional
  let precios = [89.99, 29.99, 59.99];
  
  // Arreglo bidimensional (matriz)
  let matriz = [
    ["Producto", "Precio", "Stock"],
    ["Alfombra", 89.99, 10],
    ["Cojin", 29.99, 20],
    ["Vajilla", 59.99, 15]
  ];
  
  // Console log
  console.log("Arreglo 1D - Nombres:", nombres);
  console.log("Arreglo 1D - Precios:", precios);
  console.log("Arreglo 2D - Matriz:", matriz);
  
  // Return
  return { nombres, precios, matriz };
}

// EJEMPLOS DE OPERADORES ARITMÉTICOS
function ejemploOperadores() {
  // Variables
  let a = 10;
  let b = 5;
  
  // Operador suma
  let suma = a + b;
  // Operador resta
  let resta = a - b;
  // Operador multiplicación
  let multiplicacion = a * b;
  // Operador división
  let division = a / b;
  // Operador módulo
  let modulo = a % b;
  
  // Operador incremento
  let incremento = a;
  incremento++;
  
  // Operador decremento
  let decremento = a;
  decremento--;
  
  // Console log
  console.log("Suma:", suma);
  console.log("Resta:", resta);
  console.log("Multiplicación:", multiplicacion);
  console.log("División:", division);
  console.log("Módulo:", modulo);
  console.log("Incremento:", incremento);
  console.log("Decremento:", decremento);
  
  // Return
  return { suma, resta, multiplicacion, division, modulo, incremento, decremento };
}

// EJEMPLOS DE OPERADORES LÓGICOS
function ejemploOperadoresLogicos() {
  // Variables boolean
  let verdadero = true;
  let falso = false;
  
  // Operador AND
  let and = verdadero && falso;
  // Operador OR
  let or = verdadero || falso;
  // Operador NOT
  let not = !verdadero;
  
  // Console log
  console.log("AND:", and);
  console.log("OR:", or);
  console.log("NOT:", not);
  
  // Return
  return { and, or, not };
}

// GENERAR ID ÚNICO
function generarID() {
  // Concatenación de strings
  return 'ID-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// CAPITALIZAR TEXTO
function capitalizarTexto(texto) {
  // If-Else simple
  if (!texto) return '';
  // String manipulation
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// LIMPIAR ESPACIOS
function limpiarTexto(texto) {
  // String methods
  return texto.trim().replace(/\s+/g, ' ');
}