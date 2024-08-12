// Fonction pour basculer le menu burger
function toggleBurgerMenu() {
    const popup = document.getElementById('burgerMenuPopup');
    popup.classList.toggle('open');
}


// Fonction pour charger les données du menu depuis un fichier JSON
async function loadMenuData() {
    try {
        const response = await fetch('menuData.json'); // Assurez-vous que ce fichier existe
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

// Ajouter une ligne au tableau MakeOf
function addRow() {
    const table = document.getElementById('jsonRows');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="checkbox" class="generateJson"></td>
        <td><input type="text" value="MakeOF"></td>
        <td><input type="text" value="0.0"></td>
        <td><input type="text" value="1691111894"></td>
        <td><input type="text" value="SAFRAN"></td>
        <td><input type="text" value="NIORT"></td>
        <td><input type="text" value="ENGINeUS"></td>
        <td><input type="text" value="SmartPL3"></td>
        <td><input type="text" value="Magasin Bord de Ligne"></td>
        <td><input type="text" value="MES"></td>
        <td><input type="text" value="FOULONJeremy"></td>
        <td><input type="text" value="OFN-10000178"></td>
        <td><input type="text" value="1688999932"></td>
        <td><input type="text" value="1706214110"></td>
        <td><input type="text" value=""></td>
        <td><input type="number" value="0"></td>
        <td><input type="number" value="1"></td>
        <td><input type="number" value="1"></td>
        <td><input type="number" value="1"></td>
        <td><input type="text" value="TestVisionAuto001"></td>
        <td><input type="text" value="TestVision15pict"></td>
        <td><input type="text" value="TestVision15pict001"></td>
        <td><input type="text" value="1.0"></td>
        <td><input type="number" value="0"></td>
        <td><input type="number" value="0"></td>
        <td><input type="text" value="N/A"></td>
        <td><input type="text" value=""></td>
    `;

    table.appendChild(newRow);
}

// Générer et télécharger plusieurs fichiers JSON
function generateAllJSON() {
    const rows = document.querySelectorAll("#jsonRows tr");
    let allJsons = [];

    rows.forEach((row, index) => {
        const shouldGenerate = row.querySelector(".generateJson").checked;
        if (shouldGenerate) {
            const ofNr = row.cells[11].querySelector("input")?.value || ''; // Extract OF Number
            const timestamp = Math.floor(Date.now() / 1000); // Generate Timestamp

            const data = {
                request: row.cells[1].querySelector("input")?.value || '',
                requestVersion: row.cells[2].querySelector("input")?.value || '',
                requestDate: row.cells[3].querySelector("input")?.value || '',
                company: row.cells[4].querySelector("input")?.value || '',
                factory: row.cells[5].querySelector("input")?.value || '',
                workshop: row.cells[6].querySelector("input")?.value || '',
                productionUnit: row.cells[7].querySelector("input")?.value || '',
                productionMachine: row.cells[8].querySelector("input")?.value || '',
                supervisor: row.cells[9].querySelector("input")?.value || '',
                orders: [
                    {
                        user: row.cells[10].querySelector("input")?.value || '',
                        ofNr: ofNr,
                        releaseDate: row.cells[12].querySelector("input")?.value || '',
                        dueDate: row.cells[13].querySelector("input")?.value || '',
                        orderGroupId: row.cells[14].querySelector("input")?.value || '',
                        nOrders: parseInt(row.cells[15].querySelector("input")?.value || 0),
                        priority: parseInt(row.cells[16].querySelector("input")?.value || 0),
                        partsNbr: parseInt(row.cells[17].querySelector("input")?.value || 0),
                        opsNbr: parseInt(row.cells[18].querySelector("input")?.value || 0),
                        partReference: row.cells[19].querySelector("input")?.value || '',
                        partDescrip: row.cells[20].querySelector("input")?.value || '',
                        manufactRoutingCode: row.cells[21].querySelector("input")?.value || '',
                        manufactRoutingVersion: parseFloat(row.cells[22].querySelector("input")?.value || '0').toFixed(1),
                        ofMBomCode: parseInt(row.cells[23].querySelector("input")?.value || 0),
                        ofMBomVersion: parseInt(row.cells[24].querySelector("input")?.value || 0),
                        serialNumbers: [
                            {
                                sn: row.cells[25].querySelector("input")?.value || '',
                                // status: row.cells[26].querySelector("input")?.value || ''
                            }
                        ]
                    }
                ]
            };

            // Ajout des données JSON à la liste
            allJsons.push(data);

            // Générer le nom du fichier
            const filename = `R105_OF_${ofNr}_${timestamp}.json`;

            // Télécharger le fichier JSON
            downloadJSON(data, filename);
        }
    });

    // Afficher le dernier fichier JSON généré (à titre de référence)
    if (allJsons.length > 0) {
        const lastJsonString = JSON.stringify(allJsons[allJsons.length - 1], null, 4);
        document.getElementById('jsonOutput').textContent = lastJsonString;
    }
}

// Fonction pour télécharger un fichier JSON
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

// Gestion des fonctionnalités de la page Settings
let jsonPath = '/chemin/vers/dossier'; // Chemin par défaut

function saveJsonPath() {
    const newPath = document.getElementById('jsonPath').value;
    if (newPath) {
        jsonPath = newPath;
        alert('Chemin d\'enregistrement mis à jour : ' + jsonPath);
    } else {
        alert('Veuillez entrer un chemin valide.');
    }
}

// Charger les données du menu au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();  // Cette fonction doit maintenant exister

    // Vérifiez que le formulaire existe avant d'ajouter l'événement
    const jsonForm = document.getElementById('jsonForm');
    if (jsonForm) {
        jsonForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const id = document.getElementById('id').value;
            const name = document.getElementById('name').value;
            const quantity = document.getElementById('quantity').value;

            addRowToTable(id, name, quantity);
        });
    } else {
        console.error("Le formulaire jsonForm n'existe pas.");
    }
});
