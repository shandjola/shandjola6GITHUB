// Variables d'authentification
const authNom = "admin";
const authPassword = "password123";

// Associer les boutons à leurs fonctions
document.getElementById('submitButton').addEventListener('click', submitForm);
document.getElementById('showAuthFormButton').addEventListener('click', showAuthForm);

// Fonction pour soumettre le formulaire
function submitForm(event) {
    event.preventDefault();  // Empêche le comportement par défaut du formulaire
    const nom = document.getElementById('nom').value;
    const postnom = document.getElementById('postnom').value;
    const prenom = document.getElementById('prenom').value;
    const annee = document.getElementById('annee').value;
    const sexe = document.getElementById('sexe').value;
    const classe = document.getElementById('classe').value;

    if (nom && postnom && prenom && annee && sexe && classe) {
        addRowToTable({ nom, postnom, prenom, annee, sexe, classe });
        document.getElementById('registrationForm').reset();
        alert('Enregistrement réussi !');
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Fonction pour ajouter une ligne au tableau
function addRowToTable(row) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    Object.values(row).forEach(value => {
        const cell = newRow.insertCell();
        cell.textContent = value;
    });
}

// Fonction pour afficher le formulaire d'authentification
function showAuthForm() {
    document.getElementById('authFormContainer').style.display = 'flex';
    document.getElementById('registrationForm').classList.add('blur');
}

// Fonction pour masquer le formulaire d'authentification
function hideAuthForm() {
    document.getElementById('authFormContainer').style.display = 'none';
    document.getElementById('registrationForm').classList.remove('blur');
}

// Fonction d'authentification
function authenticate(event) {
    event.preventDefault();  // Empêche le comportement par défaut du formulaire
    const enteredNom = document.getElementById('authNom').value;
    const enteredPassword = document.getElementById('authPassword').value;

    if (enteredNom === authNom && enteredPassword === authPassword) {
        window.location.href = 'table.html';
    } else {
        alert('Nom ou mot de passe incorrect.');
    }
}

// Masquer le formulaire d'authentification si on clique en dehors de celui-ci
document.addEventListener('click', function(event) {
    const authForm = document.querySelector('.auth-form');
    if (!authForm.contains(event.target) && !event.target.closest('#showAuthFormButton')) {
        hideAuthForm();
    }
});

// Associer le bouton d'authentification à sa fonction
document.getElementById('authButton').addEventListener('click', authenticate);

// Charger les données du tableau lors du chargement de table.html
if (window.location.pathname.endsWith('table.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const rows = JSON.parse(sessionStorage.getItem('rows')) || [];
        rows.forEach(row => addRowToTable(row));
    });
}
