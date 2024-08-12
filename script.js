// Ces fonctions doivent être globales pour être accessibles depuis le HTML
function toggleBurgerMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

function editInfo() {
    const newCompany = prompt("Modifier Company", "SAFRAN");
    const newFactory = prompt("Modifier Factory", "NIORT");
    const newWorkshop = prompt("Modifier Workshop", "ENGINeUS");
    const newProductionUnit = prompt("Modifier Production Unit", "SmartPL3");
    const newProductionMachine = prompt("Modifier Production Machine", "Magasin Bord de Ligne");
    const newSupervisor = prompt("Modifier Supervisor", "MES");

    document.querySelectorAll('.sidebar ul li:nth-child(1)').forEach(el => el.textContent = `Company: ${newCompany}`);
    document.querySelectorAll('.sidebar ul li:nth-child(2)').forEach(el => el.textContent = `Factory: ${newFactory}`);
    document.querySelectorAll('.sidebar ul li:nth-child(3)').forEach(el => el.textContent = `Workshop: ${newWorkshop}`);
    document.querySelectorAll('.sidebar ul li:nth-child(4)').forEach(el => el.textContent = `Production Unit: ${newProductionUnit}`);
    document.querySelectorAll('.sidebar ul li:nth-child(5)').forEach(el => el.textContent = `Production Machine: ${newProductionMachine}`);
    document.querySelectorAll('.sidebar ul li:nth-child(6)').forEach(el => el.textContent = `Supervisor: ${newSupervisor}`);
}

// Encapsulez les autres logiques liées à DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    let data = [];
    let jsonPath = '/chemin/vers/dossier'; // Chemin par défaut

    document.getElementById('addRowForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;

        addRowToTable(id, name, quantity);
    });

    function addRowToTable(id, name, quantity) {
        const tableBody = document.getElementById('makeofTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = id;
        cell2.textContent = name;
        cell3.textContent = quantity;

        data.push({ id, name, quantity });
    }

    function generateAndSaveJSON() {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `makeof.json`; // Nom du fichier
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function saveJsonPath() {
        const newPath = document.getElementById('jsonPath').value;
        if (newPath) {
            jsonPath = newPath;
            alert('Chemin d\'enregistrement mis à jour : ' + jsonPath);
        } else {
            alert('Veuillez entrer un chemin valide.');
        }
    }
});
