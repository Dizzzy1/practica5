// Simulando los datos del JSON
let menuConfig = {
    "menu": [
        { "opcion": "Agregar Persona", "accion": "agregar" },
        { "opcion": "Modificar Persona", "accion": "modificar" },
        { "opcion": "Eliminar Persona", "accion": "eliminar" }
    ],
    "personas": [
        { "nombre": "Juan", "apellido": "Pérez", "edad": "30", "matricula": "12345" },
        { "nombre": "Ana", "apellido": "Gómez", "edad": "25", "matricula": "67890" }
    ]
};

// Copiamos los datos a nuestra variable global
let data = { personas: [...menuConfig.personas] };

console.log("Datos cargados:", data);

// Función para renderizar el menú
function renderMenu() {
    let menuDiv = document.getElementById("menu");

    if (!menuDiv) {
        console.error("Error: No se encontró el elemento #menu");
        return;
    }

    menuDiv.innerHTML = "";
    menuConfig.menu.forEach(item => {
        let button = document.createElement("button");
        button.textContent = item.opcion;
        button.className = "menu-btn";
        button.onclick = () => ejecutarAccion(item.accion);
        menuDiv.appendChild(button);
    });

    console.log("Menú renderizado correctamente.");
}

// Función para renderizar la lista de personas
function renderPersonas() {
    let personasDiv = document.getElementById("personas");

    if (!personasDiv) {
        console.error("Error: No se encontró el elemento #personas");
        return;
    }

    personasDiv.innerHTML = "<h2>Lista de Personas</h2>";

    if (data.personas.length === 0) {
        personasDiv.innerHTML += "<p class='no-data'>No hay personas registradas.</p>";
        return;
    }

    data.personas.forEach(p => {
        let personaCard = document.createElement("div");
        personaCard.className = "persona-card";
        personaCard.innerHTML = `<strong>${p.nombre} ${p.apellido}</strong>, ${p.edad} años, Matrícula: ${p.matricula}`;
        personasDiv.appendChild(personaCard);
    });

    console.log("Personas renderizadas correctamente:", data.personas);
}

function ejecutarAccion(accion) {
    if (accion === "agregar") {
        let nombre = prompt("Nombre:");
        let apellido = prompt("Apellido:");
        let edad = prompt("Edad:");
        let matricula = prompt("Matrícula:");

        if (nombre && apellido && edad && matricula) {
            data.personas.push({ nombre, apellido, edad, matricula });
            renderPersonas();
        }
    } else if (accion === "modificar") {
        let matricula = prompt("Ingrese la matrícula de la persona a modificar:");
        let persona = data.personas.find(p => p.matricula === matricula);

        if (persona) {
            persona.nombre = prompt("Nuevo Nombre:", persona.nombre);
            persona.apellido = prompt("Nuevo Apellido:", persona.apellido);
            persona.edad = prompt("Nueva Edad:", persona.edad);
            renderPersonas();
        } else {
            alert("Persona no encontrada");
        }
    } else if (accion === "eliminar") {
        let matricula = prompt("Ingrese la matrícula de la persona a eliminar:");
        let index = data.personas.findIndex(p => p.matricula === matricula);

        if (index !== -1) {
            data.personas.splice(index, 1);
            renderPersonas();
            alert("Persona eliminada correctamente");
        } else {
            alert("Persona no encontrada");
        }
    }
}

function iniciar() {
    console.log("Iniciando aplicación...");
    renderMenu();
    renderPersonas();
}

// Esperamos a que el DOM esté cargado antes de iniciar
document.addEventListener("DOMContentLoaded", iniciar);
