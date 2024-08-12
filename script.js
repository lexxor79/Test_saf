// Fonction pour basculer le menu burger
function toggleBurgerMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Fonction pour lire les données du menu depuis un fichier JSON
async function loadMenuData() {
    try {
        const response = await fetch('menuData.json');
        const data = await response.json();
        
        document.getElementById('company').textContent = `Company: ${data.company}`;
        document.getElementById('factory').textContent = `Factory: ${data.factory}`;
        document.getElementById('workshop').textContent = `Workshop: ${data.workshop}`;
        document.getElementById('productionUnit').textContent = `Production Unit: ${data.productionUnit}`;
        document.getElementById('productionMachine').textContent = `Production Machine: ${data.productionMachine}`;
        document.getElementById('supervisor').textContent = `Supervisor: ${data.supervisor}`;
    } catch (error) {
        console.error('Erreur lors du chargement des données du menu:', error);
    }
}

// Fonction pour modifier les informations du menu de gauche
async function editInfo() {
    const newCompany = prompt("Modifier Company", "SAFRAN");
    const newFactory = prompt("Modifier Factory", "NIORT");
    const newWorkshop = prompt("Modifier Workshop", "ENGINeUS");
    const newProductionUnit = prompt("Modifier Production Unit", "SmartPL3");
    const newProductionMachine = prompt("Modifier Production Machine", "Magasin Bord de Ligne");
    const newSupervisor = prompt("Modifier Supervisor", "MES");

    const newData = {
        company: newCompany,
        factory: newFactory,
        workshop: newWorkshop,
        productionUnit: newProductionUnit,
        productionMachine: newProductionMachine,
        supervisor: newSupervisor
    };

    // Mise à jour du menu avec les nouvelles valeurs
    document.getElementById('company').textContent = `Company: ${newData.company}`;
    document.getElementById('factory').textContent = `Factory: ${newData.factory}`;
    document.getElementById('workshop').textContent = `Workshop: ${newData.workshop}`;
    document.getElementById('productionUnit').textContent = `Production Unit: ${newData.productionUnit}`;
    document.getElementById('productionMachine').textContent = `Production Machine: ${newData.productionMachine}`;
    document.getElementById('supervisor').textContent = `Supervisor: ${newData.supervisor}`;

    // Enregistrement des nouvelles données dans le fichier JSON
    saveMenuData(newData);
}

// Fonction pour enregistrer les données modifiées dans le fichier JSON
async function saveMenuData(data) {
    try {
        const response = await fetch('saveMenuData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement des données');
        }
        alert('Données enregistrées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données du menu:', error);
    }
}

// Charger les données du menu au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();

    // Fonctionnalités spécifiques à MakeOF
    document.getElementById('jsonForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;

        addRowToTable(id, name, quantity);
    });

    function addRowToTable(id, name, quantity) {
        const tableBody = document.getElementById('jsonRows');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><input type="checkbox" class="generateJson"></td>
            <td><input type="text" value="${id}"></td>
            <td><input type="text" value="${name}"></td>
            <td><input type="text" value="${quantity}"></td>
        `;

        tableBody.appendChild(newRow);
    }

    function generateAllJSON() {
        const rows = document.querySelectorAll("#jsonRows tr");
        let allJsons = [];

        rows.forEach((row, index) => {
            const shouldGenerate = row.querySelector(".generateJson").checked;
            if (shouldGenerate) {
                const ofNr = row.cells[1].querySelector("input").value;
                const timestamp = Math.floor(Date.now() / 1000);

                const data = {
                    request: row.cells[1].querySelector("input").value,
                    requestVersion: row.cells[2].querySelector("input").value,
                    requestDate: row.cells[3].querySelector("input").value,
                    // Ajoutez les autres champs ici
                };

                allJsons.push(data);

                const filename = `R105_OF_${ofNr}_${timestamp}.json`;
                downloadJSON(data, filename);
            }
        });

        const lastJsonString = JSON.stringify(allJsons[allJsons.length - 1], null, 4);
        document.getElementById('jsonOutput').textContent = lastJsonString;
    }

    function downloadJSON(jsonData, fileName) {
        const jsonString = JSON.stringify(jsonData, null, 4);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
