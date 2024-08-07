function submitForm() {
    const form = document.getElementById('registrationForm');
    const nom = document.getElementById('nom').value;
    const postnom = document.getElementById('postnom').value;
    const prenom = document.getElementById('prenom').value;
    const annee = document.getElementById('annee').value;
    const sexe = document.getElementById('sexe').value;
    const classe = document.getElementById('classe').value;

    if (nom && postnom && prenom && annee && sexe && classe) {
        const row = {
            nom, postnom, prenom, annee, sexe, classe
        };

        // Store the data in localStorage
        let rows = JSON.parse(localStorage.getItem('rows')) || [];
        rows.push(row);
        localStorage.setItem('rows', JSON.stringify(rows));

        // Redirect to table.html
        window.location.href = 'table.html';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

function loadTable() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const rows = JSON.parse(localStorage.getItem('rows')) || [];

    rows.forEach(row => {
        const newRow = table.insertRow();
        Object.values(row).forEach(value => {
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    });
}

// Call loadTable when table.html is loaded
if (window.location.pathname.endsWith('table.html')) {
    window.onload = loadTable;
}
