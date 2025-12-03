// DOM-MANAGER.JS - GESTIÓN DEL DOM

// CLASE PARA MANEJO DE DOM
class DOMManager {
  // Constructor
  constructor() {
    this.elementosCache = {};
  }
  
  // OBTENER ELEMENTO POR ID
  obtenerElemento(id) {
    // If simple
    if (!this.elementosCache[id]) {
      // Guardar en cache
      this.elementosCache[id] = document.getElementById(id);
    }
    // Return elemento
    return this.elementosCache[id];
  }
  
  // NAVEGACIÓN ENTRE HERMANOS
  navegarHermanos(elemento) {
    // Return objeto
    return {
      siguiente: elemento.nextElementSibling,
      anterior: elemento.previousElementSibling,
      primero: elemento.parentElement ? elemento.parentElement.firstElementChild : null,
      ultimo: elemento.parentElement ? elemento.parentElement.lastElementChild : null
    };
  }
  
  // NAVEGACIÓN JERÁRQUICA
  navegarJerarquia(elemento) {
    // Return objeto
    return {
      padre: elemento.parentElement,
      hijos: elemento.children,
      primerHijo: elemento.firstElementChild,
      ultimoHijo: elemento.lastElementChild,
      cantidadHijos: elemento.childElementCount
    };
  }
  
  // MANIPULAR ATRIBUTOS
  manipularAtributos(elemento, atributos) {
    // For-In para iterar sobre objetos
    for (let attr in atributos) {
      // If-Else
      if (atributos[attr] !== null) {
        // Set attribute
        elemento.setAttribute(attr, atributos[attr]);
      } else {
        // Remove attribute
        elemento.removeAttribute(attr);
      }
    }
  }
  
  // OBTENER TODOS LOS ATRIBUTOS
  obtenerAtributos(elemento) {
    // Objeto vacío
    let atributos = {};
    
    // For tradicional
    for (let i = 0; i < elemento.attributes.length; i++) {
      // Variable
      let attr = elemento.attributes[i];
      // Agregar al objeto
      atributos[attr.name] = attr.value;
    }
    
    // Return
    return atributos;
  }
  
  // CREAR ELEMENTO CON ATRIBUTOS
  crearElemento(tag, atributos = {}, contenido = '') {
    // Crear elemento
    let elemento = document.createElement(tag);
    // Manipular atributos
    this.manipularAtributos(elemento, atributos);
    
    // If simple
    if (contenido) {
      // Agregar contenido
      elemento.textContent = contenido;
    }
    
    // Return
    return elemento;
  }
  
  // CLONAR NODO
  clonarNodo(elemento, profundo = true) {
    // Return clone
    return elemento.cloneNode(profundo);
  }
  
  // AGREGAR CLASE
  agregarClase(elemento, clase) {
    // Add class
    elemento.classList.add(clase);
  }
  
  // REMOVER CLASE
  removerClase(elemento, clase) {
    // Remove class
    elemento.classList.remove(clase);
  }
  
  // ALTERNAR CLASE
  alternarClase(elemento, clase) {
    // Toggle class
    elemento.classList.toggle(clase);
  }
  
  // MOSTRAR ELEMENTO
  mostrar(elemento) {
    // Remove hidden
    elemento.classList.remove('hidden');
  }
  
  // OCULTAR ELEMENTO
  ocultar(elemento) {
    // Add hidden
    elemento.classList.add('hidden');
  }
  
  // LIMPIAR CONTENIDO
  limpiar(elemento) {
    // Clear HTML
    elemento.innerHTML = '';
  }
  
  // AGREGAR EVENTO
  agregarEvento(elemento, evento, funcion) {
    // Add event listener
    elemento.addEventListener(evento, funcion);
  }
  
  // REMOVER EVENTO
  removerEvento(elemento, evento, funcion) {
    // Remove event listener
    elemento.removeEventListener(evento, funcion);
  }
}

// INSTANCIA GLOBAL
const domManager = new DOMManager();

// DEMOSTRACIÓN DE NAVEGACIÓN
function demostrarNavegacionNodos() {
  // Console log
  console.log("=== NAVEGACIÓN DE NODOS ===");
  
  // Obtener elemento
  let contenedor = domManager.obtenerElemento('container');
  
  // If simple
  if (contenedor) {
    // Obtener jerarquía
    let jerarquia = domManager.navegarJerarquia(contenedor);
    
    // Console log
    console.log("Contenedor:", contenedor);
    console.log("Padre:", jerarquia.padre);
    console.log("Hijos:", jerarquia.cantidadHijos);
    console.log("Primer hijo:", jerarquia.primerHijo);
    console.log("Último hijo:", jerarquia.ultimoHijo);
    
    // If simple
    if (jerarquia.primerHijo) {
      // Obtener hermanos
      let hermanos = domManager.navegarHermanos(jerarquia.primerHijo);
      // Console log
      console.log("Siguiente:", hermanos.siguiente);
      console.log("Anterior:", hermanos.anterior);
    }
    
    // Obtener atributos
    let atributos = domManager.obtenerAtributos(contenedor);
    // Console log
    console.log("Atributos:", atributos);
  }
}

// DEMOSTRACIÓN DE MANIPULACIÓN
function demostrarManipulacionAtributos() {
  // Console log
  console.log("=== MANIPULACIÓN DE ATRIBUTOS ===");
  
  // Query selector
  let botones = document.querySelectorAll('button');
  
  // For tradicional
  for (let i = 0; i < botones.length; i++) {
    // Variable
    let boton = botones[i];
    
    // Obtener atributos
    let atributosActuales = domManager.obtenerAtributos(boton);
    // Console log
    console.log("Botón " + (i + 1) + ":", atributosActuales);
    
    // Manipular atributos
    domManager.manipularAtributos(boton, {
      'data-indice': i.toString(),
      'data-tipo': 'boton-accion',
      'title': 'Botón ' + (i + 1)
    });
    
    // Obtener nuevos atributos
    let atributosNuevos = domManager.obtenerAtributos(boton);
    // Console log
    console.log("Nuevos:", atributosNuevos);
  }
}

// DEMOSTRACIÓN DE CLONACIÓN
function demostrarClonacionNodos() {
  // Console log
  console.log("=== CLONACIÓN DE NODOS ===");
  
  // Obtener elemento
  let botonOriginal = domManager.obtenerElemento('btn-agregar');
  
  // If simple
  if (botonOriginal) {
    // Clon superficial
    let clonSuperficial = domManager.clonarNodo(botonOriginal, false);
    // Console log
    console.log("Clon superficial:", clonSuperficial);
    
    // Clon profundo
    let clonProfundo = domManager.clonarNodo(botonOriginal, true);
    // Console log
    console.log("Clon profundo:", clonProfundo);
    
    // Manipular atributos
    domManager.manipularAtributos(clonProfundo, {
      'id': 'btn-clonado',
      'data-clonado': 'true'
    });
  }
}

// ANALIZAR ESTRUCTURA DOM
function analizarEstructuraDOM() {
  // Console log
  console.log("=== ANÁLISIS DOM ===");
  
  // Array de IDs
  let formularios = ['form-agregar', 'form-buscar', 'form-eliminar'];
  
  // For tradicional
  for (let i = 0; i < formularios.length; i++) {
    // Obtener elemento
    let form = domManager.obtenerElemento(formularios[i]);
    
    // If simple
    if (form) {
      // Console log
      console.log("Formulario:", formularios[i]);
      
      // Obtener jerarquía
      let jerarquia = domManager.navegarJerarquia(form);
      // Console log
      console.log("Hijos:", jerarquia.cantidadHijos);
      
      // Variable
      let hijos = jerarquia.hijos;
      
      // For para recorrer hijos
      for (let j = 0; j < hijos.length; j++) {
        // Variable
        let hijo = hijos[j];
        // Console log
        console.log("Hijo " + (j + 1) + ":", hijo.tagName);
        
        // Obtener atributos
        let atributos = domManager.obtenerAtributos(hijo);
        // Console log
        console.log("Atributos:", atributos);
      }
    }
  }
}