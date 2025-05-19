// Manejo de localStorage y CRUD
const STORAGE_KEY = 'visitEntries';

function getEntries() {
   return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveEntries(entries) {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function renderEntries() {
   const tbody = document.querySelector('#entriesTable tbody');
   tbody.innerHTML = '';
   getEntries().forEach((entry, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${entry.datetime}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="openEdit(${entry.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteEntry(${entry.id})">Borrar</button>
          </td>`;
      tbody.appendChild(tr);
   });
}

function addEntry(datetime) {
   const entries = getEntries();
   const id = Date.now();
   entries.push({ id, datetime });

   
   //obtener las entradas, y si la longitud es mayor a 10 se elimina 1 registro
    while (entries.length > 10) {
      entries.shift(); // elimina la primera (más antigua)
   }

   saveEntries(entries);
   renderEntries();
}

function deleteEntry(id) {
   const filtered = getEntries().filter(e => e.id !== id);
   saveEntries(filtered);
   renderEntries();
}

function openEdit(id) {
   const entry = getEntries().find(e => e.id === id);
   document.getElementById('editId').value = id;
   document.getElementById('editDateTime').value = entry.datetime;
   new bootstrap.Modal(document.getElementById('editModal')).show();
}

document.getElementById('saveEdit').addEventListener('click', () => {
   const id = Number(document.getElementById('editId').value);
   const datetime = document.getElementById('editDateTime').value;
   const entries = getEntries().map(e => e.id === id ? { id, datetime } : e);
   saveEntries(entries);
   renderEntries();
   bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
});

// Form submit
document.getElementById('entryForm').addEventListener('submit', e => {
   e.preventDefault();
   const dt = document.getElementById('dateTimeInput').value;
   if (dt) addEntry(dt);
   e.target.reset();
});

// Al cargar la página, registrar visita y renderizar
document.addEventListener('DOMContentLoaded', () => {
   const now = new Date().toISOString().slice(0, 16);
   addEntry(now);
   renderEntries();
});