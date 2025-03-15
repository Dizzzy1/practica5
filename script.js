let menuData = [];

function renderTable() {
  const tbody = document.querySelector("#menuTable tbody");
  tbody.innerHTML = '';
  menuData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.link}</td>
      <td>
        <button onclick="editMenu(${item.id})">Modificar</button>
        <button onclick="deleteMenu(${item.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addMenu() {
  const id = parseInt(document.getElementById("menuId").value, 10);
  const name = document.getElementById("menuName").value;
  const link = document.getElementById("menuLink").value;

  if (id && name && link) {
    const exists = menuData.some(item => item.id === id);
    if (!exists) {
      menuData.push({ id, name, link });
      renderTable();
    } else {
      alert("El ID ya existe. Por favor, elige otro.");
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

function editMenu(id) {
  const item = menuData.find(menu => menu.id === id);
  if (item) {
    const newName = prompt("Nuevo nombre del menú:", item.name);
    const newLink = prompt("Nuevo enlace del menú:", item.link);
    if (newName && newLink) {
      item.name = newName;
      item.link = newLink;
      renderTable();
    }
  }
}

function deleteMenu(id) {
  menuData = menuData.filter(item => item.id !== id);
  renderTable();
}

document.addEventListener("DOMContentLoaded", renderTable);
