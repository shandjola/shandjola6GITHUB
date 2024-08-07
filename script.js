// Variables d'authentification
const authNom = "admin";
const authPassword = "123456789";
let isFormSubmission = false;

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

        // Set flag and show auth form
        isFormSubmission = true;
        showAuthForm();
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

function showAuthForm() {
    document.getElementById('authFormContainer').style.display = 'flex';
    document.getElementById('registrationForm').classList.add('blur');
}

function hideAuthForm() {
    document.getElementById('authFormContainer').style.display = 'none';
    document.getElementById('registrationForm').classList.remove('blur');
    isFormSubmission = false;
}

function authenticate() {
    const enteredNom = document.getElementById('authNom').value;
    const enteredPassword = document.getElementById('authPassword').value;

    if (enteredNom === authNom && enteredPassword === authPassword) {
        if (isFormSubmission) {
            window.location.href = 'table.html';
        } else {
            window.location.href = 'table.html';
        }
    } else {
        alert('Nom ou mot de passe incorrect.');
    }
}

// Hide auth form if clicking outside of it
document.addEventListener('click', function(event) {
    const authForm = document.querySelector('.auth-form');
    if (!authForm.contains(event.target) && !event.target.closest('button')) {
        hideAuthForm();
    }
});

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
